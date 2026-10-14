import { useState, useEffect, useCallback } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../config";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LiveOrderMap from "../components/LiveOrderMap";
import "./TrackOrder.css";

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
                <span className="search_prefix_icon">🔍</span>
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
              <span>🔒 Privacy Protected:</span> To protect customer and delivery rider privacy, tracking requires your unique <strong>Order Number</strong> (e.g. <strong>ORD-2026-69F350D5D3BF9</strong>) found on your receipt or email. Numeric IDs (1, 2, 3...) cannot be tracked.
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="track_alert_error">
              <span className="error_icon">⚠️</span>
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
                            {st.completed ? "✓" : st.step}
                          </div>
                          {st.step < orderData.steps.length && <div className="marker_line"></div>}
                        </div>

                        {/* Step Content */}
                        <div className="timeline_info">
                          <div className="timeline_header">
                            <span className="step_title_icon">{st.icon}</span>
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
                      {orderData.delivery_partner.is_assigned ? "🛵" : "👨‍🍳"}
                    </div>
                    <div className="partner_details">
                      <div className="partner_top">
                        <h4 className="partner_name">{orderData.delivery_partner.name}</h4>
                        <span className="partner_rating">{orderData.delivery_partner.rating}</span>
                      </div>
                      <p className="partner_vehicle">
                        {orderData.delivery_partner.is_assigned ? "🛵 " : "📞 "}
                        {orderData.delivery_partner.vehicle}
                      </p>
                      <span className="partner_deliveries">{orderData.delivery_partner.deliveries}</span>
                    </div>
                    <div className="partner_actions">
                      <a href={`tel:${orderData.delivery_partner.phone}`} className="partner_call_btn">
                        📞 {orderData.delivery_partner.is_assigned ? "Call Partner" : "Call Support"}
                      </a>
                    </div>
                  </div>
                )}

              </div>

              {/* Right Column: Order Details & Address Summary */}
              <div className="track_side_col">
                
                {/* Delivery Address Card */}
                <div className="track_side_card">
                  <h3 className="side_card_title">📍 Delivery Address</h3>
                  {orderData.address ? (
                    <div className="address_preview_box">
                      <strong>{orderData.address.full_name}</strong>
                      <p className="address_mobile">📞 {orderData.address.mobile}</p>
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
                  <h3 className="side_card_title">🍽️ Items in this Order</h3>
                  
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
                    >
                      📄 Download PDF Invoice
                    </button>
                    
                    <Link to="/contact" className="side_action_btn support_btn">
                      💬 Need Help? Contact Us
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
