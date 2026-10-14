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

    // Custom Icon Badges
    const restaurantIcon = L.divIcon({
      className: "custom_leaflet_marker",
      html: `
        <div class="map_pin_badge pin_restaurant">
          <span class="pin_icon">🍽️</span>
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
          <span class="pin_icon">🏠</span>
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
          <div class="rider_bubble_scooter">🛵</div>
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
          <button type="button" onClick={handleRecenterRider} className="map_control_btn" title="Focus Rider">
            🎯 Recenter Rider
          </button>
          <button type="button" onClick={handleFitRoute} className="map_control_btn" title="Show Full Route">
            🗺️ Entire Route
          </button>
        </div>
      </div>

      {/* Leaflet Map Canvas */}
      <div ref={mapContainerRef} className="leaflet_map_viewport"></div>

      {/* Map Bottom Floating Driver & ETA Card */}
      <div className="map_floating_bottom_card">
        <div className="rider_avatar_box">
          <div className="avatar_img_wrap">🛵</div>
          <span className="online_dot_indicator"></span>
        </div>

        <div className="rider_status_info">
          <div className="rider_header_row">
            <h4 className="rider_name_text">
              {orderData?.delivery_partner?.name || "FoodieHub Restaurant Support"}
            </h4>
            <span className="rider_star_badge">
              {orderData?.delivery_partner?.rating || "4.9 ★"}
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
            <span className="telemetry_chip">
              ⚡ <strong>{liveSpeed} km/h</strong> speed
            </span>
            <span className="telemetry_chip">
              📍 <strong>{distanceRemaining}</strong> away
            </span>
            <span className="telemetry_chip eta_highlight">
              ⏱️ Arriving in <strong>{minutesRemaining} mins</strong>
            </span>
          </div>
        </div>

        <div className="rider_call_action">
          <a
            href={`tel:${orderData?.delivery_partner?.phone || "+916284229435"}`}
            className="map_call_rider_btn"
          >
            📞 Call
          </a>
        </div>
      </div>
    </div>
  );
}

export default LiveOrderMap;
