import { useState, useEffect, useCallback } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../config";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LiveOrderMap from "../components/LiveOrderMap";
import "./TrackOrder.css";

// Helper to render professional vector icons instead of emojis
function renderStepIcon(key) {
  const normKey = (key || "").toString().toLowerCase();
  
  if (normKey.includes("placed") || normKey === "order_placed" || normKey.includes("📝")) {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    );
  }
  if (normKey.includes("confirm") || normKey === "order_confirmed" || normKey.includes("✅")) {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    );
  }
  if (normKey.includes("prepar") || normKey.includes("kitchen") || normKey === "preparing" || normKey.includes("🍳")) {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
        <line x1="6" y1="1" x2="6" y2="4" />
        <line x1="10" y1="1" x2="10" y2="4" />
        <line x1="14" y1="1" x2="14" y2="4" />
      </svg>
    );
  }
  if (normKey.includes("delivery") || normKey.includes("rider") || normKey === "out_for_delivery" || normKey.includes("🛵")) {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="5.5" cy="17.5" r="3.5" />
        <circle cx="18.5" cy="17.5" r="3.5" />
        <path d="M15 6h4l2 5.5-2.5 1" />
        <path d="M9 17.5h6" />
        <path d="M12 9l-3 8.5" />
        <path d="M7 6h5" />
      </svg>
    );
  }
  if (normKey.includes("deliver") || normKey === "delivered" || normKey.includes("🎉")) {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    );
  }
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 14 14" />
    </svg>
  );
}

function TrackOrder({ user, totalQty }) {
  const { orderId: paramOrderId } = useParams();
  const [searchParams] = useSearchParams();
  const queryOrderId = searchParams.get("orderId");

  const rawStored = localStorage.getItem("lastFoodieOrderId") || "";
  const validStored = /^\d+$/.test(rawStored) ? "" : rawStored;
  const initialOrderId = paramOrderId || queryOrderId || validStored || "";

  const [orderIdInput, setOrderIdInput] = useState(initialOrderId);
  const [activeOrderId, setActiveOrderId] = useState(initialOrderId);
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [autoRefreshEnabled, setAutoRefreshEnabled] = useState(true);

  // Fetch tracking information
  const fetchTracking = useCallback(async (id, isSilent = false) => {
    if (!id) return;
    const cleanId = id.toString().trim().replace(/^#/, "");
    if (!cleanId) return;

    // Security check: Block numeric IDs to prevent user enumeration
    if (/^\d+$/.test(cleanId)) {
      if (!isSilent) {
        setError("For security and privacy reasons, tracking by numeric ID (1, 2, 3...) is disabled. Please enter your unique Order Number (e.g., ORD-2026-XXXXX) from your receipt or confirmation email.");
        setOrderData(null);
        setLoading(false);
      }
      return;
    }

    if (!isSilent) setLoading(true);
    setError(null);

    try {
      let res;
      try {
        res = await axios.get(`${API_BASE_URL}/api/orders/${cleanId}/tracking`);
      } catch (firstErr) {
        res = await axios.get(`${API_BASE_URL}/orders/${cleanId}/tracking`);
      }

      if (res?.data?.success && res.data.order) {
        setOrderData(res.data.order);
        setLastUpdated(new Date().toLocaleTimeString());
        localStorage.setItem("lastFoodieOrderId", res.data.order.order_number);
        setError(null);
      } else {
        throw new Error(res?.data?.message || "Order not found");
      }
    } catch (err) {
      console.error("Tracking fetch error:", err);
      if (!isSilent) {
        setError(err.response?.data?.message || `Could not find order "${cleanId}". Please check your receipt or confirmation email.`);
        setOrderData(null);
      }
    } finally {
      if (!isSilent) setLoading(false);
    }
  }, []);

  // Keep activeOrderId synced when URL route param or query changes
  useEffect(() => {
    const nextId = paramOrderId || queryOrderId;
    if (nextId) {
      setOrderIdInput(nextId);
      setActiveOrderId(nextId);
    }
  }, [paramOrderId, queryOrderId]);

  // On active order ID change
  useEffect(() => {
    if (activeOrderId) {
      fetchTracking(activeOrderId);
    }
  }, [activeOrderId, fetchTracking]);

  // Polling every 6 seconds if order is active
  useEffect(() => {
    if (!activeOrderId || !autoRefreshEnabled) return;
    if (orderData?.status === "delivered" || orderData?.status === "cancelled") return;

    const interval = setInterval(() => {
      fetchTracking(activeOrderId, true);
    }, 6000);

    return () => clearInterval(interval);
  }, [activeOrderId, autoRefreshEnabled, orderData?.status, fetchTracking]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const cleanId = orderIdInput.trim().replace(/^#/, "");
    if (!cleanId) return;

    if (/^\d+$/.test(cleanId)) {
      setError("For security and privacy reasons, tracking by numeric ID (1, 2, 3...) is disabled. Please enter your unique Order Number (e.g., ORD-2026-XXXXX) from your receipt or confirmation email.");
      setOrderData(null);
      return;
    }

    setActiveOrderId(cleanId);
  };

  const handleManualRefresh = () => {
    if (activeOrderId) {
      fetchTracking(activeOrderId);
    }
  };

  // Download PDF Invoice helper
  const handleDownloadInvoice = () => {
    if (!orderData?.id && !orderData?.order_number) return;
    const invId = orderData.order_number || orderData.id;
    window.open(`${API_BASE_URL}/orders/${invId}/invoice`, "_blank");
  };

  return (
    <>
      <Navbar totalQty={totalQty} user={user} />

      {/* Breadcrumb & Hero Banner Section */}
      <section className="track_breadcrumb_hero">
        <div className="container">
          <div className="breadcrumb_nav">
            <Link to="/" className="breadcrumb_link">Home</Link>
            <span className="breadcrumb_sep">›</span>
            <a href={`${API_BASE_URL}/orders`} className="breadcrumb_link">My Orders</a>
            <span className="breadcrumb_sep">›</span>
            <span className="breadcrumb_current">Live Order Tracking</span>
          </div>

          <div className="breadcrumb_title_box">
            <span className="breadcrumb_tag">REAL-TIME ORDER TRACKER</span>
            <h1>Live Order Tracking</h1>
            <p>Follow your meal step-by-step in real time from our kitchen to your doorstep</p>
          </div>
        </div>
      </section>

      <main className="track_order_page">
        {/* Glow ambient backgrounds */}
        <div className="track_glow glow_top_left"></div>
        <div className="track_glow glow_bottom_right"></div>

        <div className="container track_container">
          
          {/* Order Search & Lookup Box */}
          <div className="track_search_container">
            <form onSubmit={handleSearchSubmit} className="track_search_form">
              <div className="track_search_input_wrap">
                <span className="search_prefix_icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="Enter Unique Order Number (e.g. ORD-2026-69F350D5D3BF9)"
                  value={orderIdInput}
                  onChange={(e) => setOrderIdInput(e.target.value)}
                  className="track_search_input"
                  required
                />
              </div>
              <button type="submit" className="track_search_btn" disabled={loading}>
                {loading ? "Searching..." : "Track Order"}
              </button>
            </form>

            <div className="track_quick_tips">
              <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                Privacy Protected:
              </span> To protect customer and delivery rider privacy, tracking requires your unique <strong>Order Number</strong> (e.g. <strong>ORD-2026-69F350D5D3BF9</strong>) found on your receipt or email. Numeric IDs (1, 2, 3...) cannot be tracked.
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="track_alert_error">
              <span className="error_icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </span>
              <div className="error_text_wrap">
                <strong>Order Not Found</strong>
                <p>{error}</p>
              </div>
            </div>
          )}

          {/* Loading Skeleton */}
          {loading && !orderData && (
            <div className="track_loading_skeleton">
              <div className="skeleton_pulse_spinner"></div>
              <p>Locating order #{orderIdInput} in real time...</p>
            </div>
          )}

          {/* Active Order Details Content */}
          {orderData && (
            <div className="track_content_grid">
              
              {/* Left/Main Column: Stepper & Status Banner */}
              <div className="track_main_col">
                
                {/* Real Map GPS Tracking (Zomato Style) */}
                <LiveOrderMap orderData={orderData} />

                {/* Vertical Live Stepper */}
                <div className="track_stepper_card">
                  <h3 className="section_box_title">Order Delivery Journey</h3>

                  <div className="timeline_stepper">
                    {orderData.steps.map((st) => (
                      <div 
                        key={st.step} 
                        className={`timeline_step_item ${st.completed ? "is_completed" : ""} ${st.current ? "is_current" : ""}`}
                      >
                        {/* Step Marker */}
                        <div className="timeline_marker">
                          <div className="marker_circle">
                            {st.completed ? (
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            ) : (
                              st.step
                            )}
                          </div>
                          {st.step < orderData.steps.length && <div className="marker_line"></div>}
                        </div>

                        {/* Step Content */}
                        <div className="timeline_info">
                          <div className="timeline_header">
                            <span className="step_title_icon">{renderStepIcon(st.icon || st.key || st.title)}</span>
                            <h4 className="step_title_text">{st.title}</h4>
                            <span className="step_time_badge">{st.time}</span>
                            {st.current && (
                              <span className="active_step_chip">In Progress</span>
                            )}
                          </div>
                          <p className="step_description">{st.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Delivery Partner / Restaurant Support Profile Card */}
                {orderData.delivery_partner && (
                  <div className="delivery_partner_card">
                    <div className="partner_avatar">
                      {orderData.delivery_partner.is_assigned ? (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="5.5" cy="17.5" r="3.5" />
                          <circle cx="18.5" cy="17.5" r="3.5" />
                          <path d="M15 6h4l2 5.5-2.5 1" />
                          <path d="M9 17.5h6" />
                          <path d="M12 9l-3 8.5" />
                          <path d="M7 6h5" />
                        </svg>
                      ) : (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
                          <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
                          <line x1="6" y1="1" x2="6" y2="4" />
                          <line x1="10" y1="1" x2="10" y2="4" />
                          <line x1="14" y1="1" x2="14" y2="4" />
                        </svg>
                      )}
                    </div>
                    <div className="partner_details">
                      <div className="partner_top">
                        <h4 className="partner_name">{orderData.delivery_partner.name}</h4>
                        <span className="partner_rating">{orderData.delivery_partner.rating}</span>
                      </div>
                      <p className="partner_vehicle" style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                        {orderData.delivery_partner.is_assigned ? (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="5.5" cy="17.5" r="3.5" />
                            <circle cx="18.5" cy="17.5" r="3.5" />
                            <path d="M15 6h4l2 5.5-2.5 1" />
                            <path d="M9 17.5h6" />
                            <path d="M12 9l-3 8.5" />
                            <path d="M7 6h5" />
                          </svg>
                        ) : (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                          </svg>
                        )}
                        {orderData.delivery_partner.vehicle}
                      </p>
                      <span className="partner_deliveries">{orderData.delivery_partner.deliveries}</span>
                    </div>
                    <div className="partner_actions">
                      <a href={`tel:${orderData.delivery_partner.phone}`} className="partner_call_btn" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                        {orderData.delivery_partner.is_assigned ? "Call Partner" : "Call Support"}
                      </a>
                    </div>
                  </div>
                )}

              </div>

              {/* Right Column: Order Details & Address Summary */}
              <div className="track_side_col">
                
                {/* Delivery Address Card */}
                <div className="track_side_card">
                  <h3 className="side_card_title" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    Delivery Address
                  </h3>
                  {orderData.address ? (
                    <div className="address_preview_box">
                      <strong>{orderData.address.full_name}</strong>
                      <p className="address_mobile" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                        {orderData.address.mobile}
                      </p>
                      <p className="address_street">{orderData.address.address_line}</p>
                      <p className="address_city">
                        {orderData.address.city}, {orderData.address.state} - {orderData.address.pincode}
                      </p>
                      {orderData.address.landmark && (
                        <p className="address_landmark"><small>Landmark: {orderData.address.landmark}</small></p>
                      )}
                    </div>
                  ) : (
                    <p className="text_muted">Address information not available.</p>
                  )}
                </div>

                {/* Order Summary & Items Card */}
                <div className="track_side_card">
                  <h3 className="side_card_title" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 2v20" />
                      <path d="M22 2v6a4 4 0 0 1-4 4v10" />
                      <path d="M6 2v7a3 3 0 0 1-3 3v8h6v-8a3 3 0 0 1-3-3V2" />
                    </svg>
                    Items in this Order
                  </h3>
                  
                  {orderData.items && orderData.items.length > 0 ? (
                    <div className="order_items_list">
                      {orderData.items.map((item) => (
                        <div key={item.id} className="order_item_row">
                          <div className="item_left">
                            <span className="item_qty_badge">{item.quantity}x</span>
                            <span className="item_name_text">{item.food_name}</span>
                          </div>
                          <span className="item_price_text">₹{item.subtotal.toFixed(2)}</span>
                        </div>
                      ))}

                      <div className="order_total_divider"></div>

                      <div className="order_bill_row">
                        <span>Payment Method:</span>
                        <strong>{orderData.payment_method}</strong>
                      </div>
                      <div className="order_bill_row">
                        <span>Payment Status:</span>
                        <strong className={`pay_status_${orderData.payment_status.toLowerCase()}`}>
                          {orderData.payment_status}
                        </strong>
                      </div>
                      <div className="order_bill_row grand_total">
                        <span>Total Paid:</span>
                        <span className="total_price_highlight">₹{orderData.total_amount.toFixed(2)}</span>
                      </div>
                    </div>
                  ) : (
                    <p className="text_muted">Order items not loaded.</p>
                  )}

                  {/* Actions inside side card */}
                  <div className="side_card_actions">
                    <button 
                      type="button" 
                      onClick={handleDownloadInvoice} 
                      className="side_action_btn invoice_btn"
                      style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "7px" }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="12" y1="18" x2="12" y2="12" />
                        <polyline points="9 15 12 18 15 15" />
                      </svg>
                      Download PDF Invoice
                    </button>
                    
                    <Link 
                      to="/contact" 
                      className="side_action_btn support_btn"
                      style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "7px" }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      </svg>
                      Need Help? Contact Us
                    </Link>
                  </div>
                </div>

              </div>

            </div>
          )}

        </div>
      </main>

      <Footer />
    </>
  );
}

export default TrackOrder;
