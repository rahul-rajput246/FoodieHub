import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./OrderSuccess.css";
import { API_BASE_URL } from "../config";

function OrderSuccess() {
  const location = useLocation();
  const orderId = location.state?.orderId || "N/A";

  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  // Fast asynchronous invoice download with live visual feedback
  const handleDownloadInvoice = async () => {
    if (!orderId || orderId === "N/A" || downloading) return;

    try {
      setDownloading(true);
      const response = await fetch(`${API_BASE_URL}/orders/${orderId}/invoice`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to download invoice");
      }

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = `FoodieHub-Invoice-#${orderId}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(downloadUrl);

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3500);
    } catch (err) {
      console.error("PDF download error:", err);
      // Fallback to opening direct URL
      window.open(`${API_BASE_URL}/orders/${orderId}/invoice`, "_blank");
    } finally {
      setDownloading(false);
    }
  };

  const handleCopyOrderId = () => {
    if (orderId && orderId !== "N/A") {
      navigator.clipboard.writeText(orderId.toString());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section className="order_success_section">
      {/* Background Glow Decorations */}
      <div className="bg_glow glow_1"></div>
      <div className="bg_glow glow_2"></div>

      <div className="container">
        <div className="order_success_card">

          {/* Animated Success Check Badge */}
          <div className="success_icon_wrapper">
            <div className="pulse_ring"></div>
            <div className="success_icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
          </div>

          {/* Heading and Subtitle */}
          <span className="success_pill">Order Confirmed</span>
          <h1 className="success_title">Order Placed Successfully!</h1>
          <p className="success_subtitle">
            Sit back and relax! Our chefs have started preparing your delicious food with fresh ingredients.
          </p>

          {/* Progress Order Stepper */}
          <div className="order_stepper">
            <div className="step_item completed">
              <div className="step_dot">✓</div>
              <span className="step_text">Placed</span>
            </div>
            <div className="step_line active"></div>
            <div className="step_item current">
              <div className="step_dot pulse_dot">2</div>
              <span className="step_text">Confirmed</span>
            </div>
            <div className="step_line"></div>
            <div className="step_item">
              <div className="step_dot">3</div>
              <span className="step_text">Preparing</span>
            </div>
            <div className="step_line"></div>
            <div className="step_item">
              <div className="step_dot">4</div>
              <span className="step_text">Delivered</span>
            </div>
          </div>

          {/* Key Order Info Cards */}
          <div className="order_details_grid_box">
            <div className="info_tile">
              <span className="tile_label">ORDER ID</span>
              <div className="order_id_copy_row">
                <span className="tile_value">#{orderId}</span>
                {orderId && orderId !== "N/A" && (
                  <button 
                    onClick={handleCopyOrderId} 
                    className="copy_badge_btn" 
                    title="Copy Order ID"
                  >
                    {copied ? "Copied!" : "Copy"}
                  </button>
                )}
              </div>
            </div>

            <div className="info_tile">
              <span className="tile_label">ESTIMATED DELIVERY</span>
              <span className="tile_value highlight_time">
                <span className="scooter_icon">🛵</span> 25–30 Mins
              </span>
            </div>
          </div>

          {/* Email Notification Banner */}
          <div className="email_notice_box">
            <span className="notice_icon">✉️</span>
            <div className="notice_text">
              <strong>Order Receipt & Invoice Sent</strong>
              <p>We've dispatched an order confirmation email with your PDF tax invoice.</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="success_actions_group">
            {orderId && orderId !== "N/A" && (
              <button
                type="button"
                onClick={handleDownloadInvoice}
                disabled={downloading}
                className={`action_btn btn_download ${downloading ? "loading" : ""} ${downloadSuccess ? "success" : ""}`}
              >
                {downloading ? (
                  <>
                    <span className="btn_spinner"></span>
                    <span>Preparing PDF...</span>
                  </>
                ) : downloadSuccess ? (
                  <>
                    <span>✓</span>
                    <span>Invoice Downloaded!</span>
                  </>
                ) : (
                  <>
                    <svg className="btn_svg_icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                    <span>Download Invoice (PDF)</span>
                  </>
                )}
              </button>
            )}

            <a href={`${API_BASE_URL}/orders`} className="action_btn btn_orders">
              <svg className="btn_svg_icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
              </svg>
              <span>View My Orders</span>
            </a>

            <Link to="/menu" className="action_btn btn_menu">
              <span>Order More Food</span>
              <span>→</span>
            </Link>
          </div>

          {/* Footer Note */}
          <div className="card_footer_note">
            <span>Need assistance with this order? </span>
            <Link to="/contact" className="support_link">Contact FoodieHub Support</Link>
          </div>

        </div>
      </div>
    </section>
  );
}

export default OrderSuccess;