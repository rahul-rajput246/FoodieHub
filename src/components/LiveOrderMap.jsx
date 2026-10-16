import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./LiveOrderMap.css";

// Fix Leaflet's default icon path issue with bundlers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function LiveOrderMap({ orderData }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const riderMarkerRef = useRef(null);
  const completedPolylineRef = useRef(null);
  const remainingPolylineRef = useRef(null);

  const [simulatedProgress, setSimulatedProgress] = useState(() => {
    if (orderData?.status === "delivered") return 1.0;
    if (orderData?.status === "out_for_delivery") return 0.55;
    if (orderData?.status === "preparing") return 0.12;
    return 0.05;
  });

  const [liveSpeed, setLiveSpeed] = useState(34);
  const [distanceRemaining, setDistanceRemaining] = useState("calculating...");
  const [minutesRemaining, setMinutesRemaining] = useState(8);
  const [isRoadRouted, setIsRoadRouted] = useState(false);

  // Extract or default GPS points
  const resCoords = useMemo(() => {
    return [
      parseFloat(orderData?.gps?.restaurant?.lat) || 30.7333,
      parseFloat(orderData?.gps?.restaurant?.lng) || 76.8000,
    ];
  }, [orderData?.gps?.restaurant]);

  const custCoords = useMemo(() => {
    return [
      parseFloat(orderData?.gps?.destination?.lat) || 30.7510,
      parseFloat(orderData?.gps?.destination?.lng) || 76.7620,
    ];
  }, [orderData?.gps?.destination]);

  // Dynamic road route waypoints (fetched from OSRM road network)
  const [routeWaypoints, setRouteWaypoints] = useState(() => [resCoords, custCoords]);
  const [totalRoadDistance, setTotalRoadDistance] = useState(6400); // meters
  const [totalRoadDuration, setTotalRoadDuration] = useState(480);  // seconds

  // Fetch real road geometry from Open Source Routing Machine (OSRM)
  useEffect(() => {
    let isCancelled = false;

    const fetchRoadRoute = async () => {
      try {
        const [rLat, rLng] = resCoords;
        const [cLat, cLng] = custCoords;

        // OSRM coordinates order is {longitude},{latitude}
        const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${rLng},${rLat};${cLng},${cLat}?overview=full&geometries=geojson`;
        const res = await fetch(osrmUrl);
        const data = await res.json();

        if (data.code === "Ok" && data.routes && data.routes.length > 0) {
          const route = data.routes[0];
          // OSRM returns coordinates as [lng, lat], Leaflet expects [lat, lng]
          const roadPoints = route.geometry.coordinates.map(([lng, lat]) => [lat, lng]);

          if (!isCancelled && roadPoints.length > 1) {
            setRouteWaypoints(roadPoints);
            const dist = route.distance || 6400;
            const dur = route.duration || 480;
            setTotalRoadDistance(dist);
            setTotalRoadDuration(dur);
            setIsRoadRouted(true);

            // Update remaining distance and ETA based on current progress
            const remMeters = Math.max(0, (1 - simulatedProgress) * dist);
            setDistanceRemaining(
              remMeters < 1000 ? `${Math.round(remMeters)} m` : `${(remMeters / 1000).toFixed(1)} km`
            );
            setMinutesRemaining(Math.max(1, Math.round(((1 - simulatedProgress) * dur) / 60)));
          }
        }
      } catch (err) {
        console.warn("OSRM road route fetch fallback to direct route:", err);
      }
    };

    fetchRoadRoute();

    return () => {
      isCancelled = true;
    };
  }, [resCoords, custCoords]);

  // Compute cumulative road distances along waypoints for constant-speed physical interpolation
  const roadDistanceInfo = useMemo(() => {
    if (!routeWaypoints || routeWaypoints.length < 2) return { cumulative: [0], total: 0 };
    const cumulative = [0];
    let total = 0;
    for (let i = 1; i < routeWaypoints.length; i++) {
      const [lat1, lng1] = routeWaypoints[i - 1];
      const [lat2, lng2] = routeWaypoints[i];
      const dx = (lng2 - lng1) * Math.cos(((lat1 + lat2) * Math.PI) / 360);
      const dy = lat2 - lat1;
      const d = Math.sqrt(dx * dx + dy * dy);
      total += d;
      cumulative.push(total);
    }
    return { cumulative, total };
  }, [routeWaypoints]);

  // Calculate current rider position and split into completed and remaining road segments
  const getPositionAndSplits = useCallback(
    (progress, waypoints, distInfo) => {
      if (!waypoints || waypoints.length === 0) {
        return { position: resCoords, completed: [], remaining: [] };
      }
      if (waypoints.length === 1) {
        return { position: waypoints[0], completed: waypoints, remaining: waypoints };
      }

      const clamped = Math.max(0, Math.min(1, progress));
      const targetDist = clamped * distInfo.total;
      const { cumulative } = distInfo;

      let index = 1;
      while (index < cumulative.length && cumulative[index] < targetDist) {
        index++;
      }
      if (index >= cumulative.length) index = cumulative.length - 1;

      const segStartDist = cumulative[index - 1];
      const segEndDist = cumulative[index];
      const segLen = segEndDist - segStartDist;
      const ratio = segLen > 0 ? (targetDist - segStartDist) / segLen : 0;

      const p1 = waypoints[index - 1];
      const p2 = waypoints[index];

      const currentPos = [
        p1[0] + (p2[0] - p1[0]) * ratio,
        p1[1] + (p2[1] - p1[1]) * ratio,
      ];

      const completed = [...waypoints.slice(0, index), currentPos];
      const remaining = [currentPos, ...waypoints.slice(index)];

      return { position: currentPos, completed, remaining };
    },
    [resCoords]
  );

  // Set initial status progress & telemetry
  useEffect(() => {
    if (orderData?.status === "delivered") {
      setSimulatedProgress(1.0);
      setDistanceRemaining("0 m");
      setMinutesRemaining(0);
    } else if (orderData?.status === "out_for_delivery") {
      setSimulatedProgress((prev) => (prev < 0.4 ? 0.55 : prev));
    }
  }, [orderData?.status]);

  // Live GPS movement simulation (updates smoothly every 2.5 seconds along the road)
  useEffect(() => {
    if (orderData?.status !== "out_for_delivery") return;

    const interval = setInterval(() => {
      setSimulatedProgress((prev) => {
        if (prev >= 0.98) return 0.98;
        const next = Math.min(0.98, prev + 0.012); // Smooth continuous movement along road

        const remMeters = Math.max(0, (1 - next) * totalRoadDistance);
        setDistanceRemaining(
          remMeters < 1000 ? `${Math.round(remMeters)} m` : `${(remMeters / 1000).toFixed(1)} km`
        );
        setMinutesRemaining(Math.max(1, Math.round(((1 - next) * totalRoadDuration) / 60)));
        setLiveSpeed(Math.floor(30 + Math.random() * 8));

        return next;
      });
    }, 2500);

    return () => clearInterval(interval);
  }, [orderData?.status, totalRoadDistance, totalRoadDuration]);

  // Initialize Leaflet Map instance
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    // Initialize Map centered around restaurant
    const map = L.map(mapContainerRef.current, {
      zoomControl: false,
      attributionControl: false,
    }).setView(resCoords, 14);

    // Free OpenStreetMap Tiles (No API key, clean map)
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      subdomains: ["a", "b", "c"],
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    L.control.zoom({ position: "bottomright" }).addTo(map);

    // Custom Icon Badges (Professional SVG Icons)
    const restaurantIcon = L.divIcon({
      className: "custom_leaflet_marker",
      html: `
        <div class="map_pin_badge pin_restaurant">
          <span class="pin_icon">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:middle;">
              <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2M7 2v20M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>
            </svg>
          </span>
          <span class="pin_label">FoodieHub Kitchen</span>
        </div>
        <div class="pin_anchor_dot"></div>
      `,
      iconSize: [140, 48],
      iconAnchor: [70, 48],
    });

    const destinationIcon = L.divIcon({
      className: "custom_leaflet_marker",
      html: `
        <div class="map_pin_badge pin_destination">
          <span class="pin_icon">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:middle;">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
          </span>
          <span class="pin_label">Delivery Address</span>
        </div>
        <div class="pin_anchor_dot dot_dest"></div>
      `,
      iconSize: [140, 48],
      iconAnchor: [70, 48],
    });

    const riderIcon = L.divIcon({
      className: "custom_leaflet_marker rider_marker_smooth",
      html: `
        <div class="map_rider_beacon">
          <div class="beacon_radar_ring"></div>
          <div class="beacon_radar_ring delay"></div>
          <div class="rider_bubble_scooter">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ea580c" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="display:block; margin:auto;">
              <circle cx="18.5" cy="17.5" r="3.5"/>
              <circle cx="5.5" cy="17.5" r="3.5"/>
              <circle cx="15" cy="5" r="1"/>
              <path d="M12 17.5V14l-3-3 4-3 2 3h2"/>
            </svg>
          </div>
        </div>
      `,
      iconSize: [50, 50],
      iconAnchor: [25, 25],
    });

    // Add Restaurant & Customer Markers
    L.marker(resCoords, { icon: restaurantIcon })
      .addTo(map)
      .bindPopup("<strong>FoodieHub Central Kitchen</strong><br>Sector 26 • Order Picked Up");

    L.marker(custCoords, { icon: destinationIcon })
      .addTo(map)
      .bindPopup(`<strong>Delivery Address</strong><br>${orderData?.address?.address_line || "Customer Location"}`);

    // Initial rider position along road
    const { position: initialRiderPos } = getPositionAndSplits(
      simulatedProgress,
      routeWaypoints,
      roadDistanceInfo
    );
    const riderMarker = L.marker(initialRiderPos, { icon: riderIcon, zIndexOffset: 1000 }).addTo(map);
    riderMarkerRef.current = riderMarker;

    // Completed Route Polyline (Green road line)
    const completedPoly = L.polyline([], {
      color: "#10b981",
      weight: 6,
      opacity: 0.95,
      lineCap: "round",
      lineJoin: "round",
    }).addTo(map);

    // Remaining Route Polyline (Orange dashed road line)
    const remainingPoly = L.polyline(routeWaypoints, {
      color: "#ff7e00",
      weight: 5,
      opacity: 0.85,
      dashArray: "8, 10",
      lineCap: "round",
      lineJoin: "round",
    }).addTo(map);

    completedPolylineRef.current = completedPoly;
    remainingPolylineRef.current = remainingPoly;

    // Fit map bounds to encompass the entire route
    const bounds = L.latLngBounds(routeWaypoints.length > 1 ? routeWaypoints : [resCoords, custCoords]);
    map.fitBounds(bounds, { padding: [60, 60] });

    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [resCoords, custCoords]);

  // Update polylines and fit bounds when road route is loaded from OSRM
  useEffect(() => {
    if (!mapInstanceRef.current || routeWaypoints.length < 2) return;

    const { position, completed, remaining } = getPositionAndSplits(
      simulatedProgress,
      routeWaypoints,
      roadDistanceInfo
    );

    if (riderMarkerRef.current) {
      riderMarkerRef.current.setLatLng(position);
    }
    if (completedPolylineRef.current) {
      completedPolylineRef.current.setLatLngs(completed);
    }
    if (remainingPolylineRef.current) {
      remainingPolylineRef.current.setLatLngs(remaining);
    }

    const bounds = L.latLngBounds(routeWaypoints);
    mapInstanceRef.current.fitBounds(bounds, { padding: [55, 55] });
  }, [routeWaypoints, roadDistanceInfo]);

  // Update Rider Marker position and polyline splits as progress advances
  useEffect(() => {
    if (!riderMarkerRef.current || routeWaypoints.length < 2) return;

    const { position, completed, remaining } = getPositionAndSplits(
      simulatedProgress,
      routeWaypoints,
      roadDistanceInfo
    );

    riderMarkerRef.current.setLatLng(position);

    if (completedPolylineRef.current) {
      completedPolylineRef.current.setLatLngs(completed);
    }
    if (remainingPolylineRef.current) {
      remainingPolylineRef.current.setLatLngs(remaining);
    }
  }, [simulatedProgress, routeWaypoints, roadDistanceInfo, getPositionAndSplits]);

  // Recenter map on rider
  const handleRecenterRider = () => {
    if (!mapInstanceRef.current) return;
    const { position } = getPositionAndSplits(
      simulatedProgress,
      routeWaypoints,
      roadDistanceInfo
    );
    mapInstanceRef.current.flyTo(position, 16, { duration: 1.2 });
  };

  // Fit bounds to entire route
  const handleFitRoute = () => {
    if (!mapInstanceRef.current || routeWaypoints.length < 2) return;
    const bounds = L.latLngBounds(routeWaypoints);
    mapInstanceRef.current.flyToBounds(bounds, { padding: [50, 50], duration: 1.2 });
  };

  return (
    <div className="live_gps_map_card">
      {/* Map Top Floating Header */}
      <div className="map_floating_top_bar">
        <div className="gps_signal_pill">
          <span className="gps_live_dot"></span>
          <span>{isRoadRouted ? "LIVE ROAD GPS TRACKING" : "LIVE GPS TRACKING"}</span>
        </div>

        <div className="map_quick_controls">
          <button type="button" onClick={handleRecenterRider} className="map_control_btn" title="Focus Rider" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="22" y1="12" x2="18" y2="12"/>
              <line x1="6" y1="12" x2="2" y2="12"/>
              <line x1="12" y1="6" x2="12" y2="2"/>
              <line x1="12" y1="22" x2="12" y2="18"/>
            </svg>
            Recenter Rider
          </button>
          <button type="button" onClick={handleFitRoute} className="map_control_btn" title="Show Full Route" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/>
              <line x1="9" y1="3" x2="9" y2="18"/>
              <line x1="15" y1="6" x2="15" y2="21"/>
            </svg>
            Entire Route
          </button>
        </div>
      </div>

      {/* Leaflet Map Canvas */}
      <div ref={mapContainerRef} className="leaflet_map_viewport"></div>

      {/* Map Bottom Floating Driver & ETA Card */}
      <div className="map_floating_bottom_card">
        <div className="rider_avatar_box">
          <div className="avatar_img_wrap" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="18.5" cy="17.5" r="3.5"/>
              <circle cx="5.5" cy="17.5" r="3.5"/>
              <circle cx="15" cy="5" r="1"/>
              <path d="M12 17.5V14l-3-3 4-3 2 3h2"/>
            </svg>
          </div>
          <span className="online_dot_indicator"></span>
        </div>

        <div className="rider_status_info">
          <div className="rider_header_row">
            <h4 className="rider_name_text">
              {orderData?.delivery_partner?.name || "FoodieHub Restaurant Support"}
            </h4>
            <span className="rider_star_badge" style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="1">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
              <span>{orderData?.delivery_partner?.rating ? orderData.delivery_partner.rating.replace('★', '').trim() : "4.9"}</span>
            </span>
          </div>
          <p className="rider_sub_text">
            {orderData?.status === "out_for_delivery"
              ? "On the way with your delicious order"
              : orderData?.status === "delivered"
              ? "Order Delivered at your door!"
              : "Preparing order in FoodieHub Kitchen"}
          </p>

          <div className="live_telemetry_row">
            <span className="telemetry_chip" style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
              </svg>
              <strong>{liveSpeed} km/h</strong> speed
            </span>
            <span className="telemetry_chip" style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <strong>{distanceRemaining}</strong> away
            </span>
            <span className="telemetry_chip eta_highlight" style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
              Arriving in <strong>{minutesRemaining} mins</strong>
            </span>
          </div>
        </div>

        <div className="rider_call_action">
          <a
            href={`tel:${orderData?.delivery_partner?.phone || "+916284229435"}`}
            className="map_call_rider_btn"
            style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            Call
          </a>
        </div>
      </div>
    </div>
  );
}

export default LiveOrderMap;
