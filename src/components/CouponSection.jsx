import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";
import "./CouponSection.css";

export default function CouponSection({
  subtotal = 0,
  appliedCoupon = null,
  onApplyCoupon,
  onRemoveCoupon,
}) {
  const [couponInput, setCouponInput] = useState("");
  const [availableCoupons, setAvailableCoupons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null); // { type: 'success' | 'error', text: '' }
  const [showOffers, setShowOffers] = useState(false);

  // Fetch available promo codes on mount
  useEffect(() => {
    let isMounted = true;
    const fetchCoupons = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/coupons/available`, {
          withCredentials: true,
        });
        if (isMounted && res.data?.success) {
          setAvailableCoupons(res.data.coupons || []);
        }
      } catch (err) {
        console.error("Error fetching available coupons:", err);
      }
    };

    fetchCoupons();
    return () => {
      isMounted = false;
    };
  }, []);

  // Handle Apply Coupon by code
  const handleApply = async (codeToApply) => {
    const code = (codeToApply || couponInput).trim().toUpperCase();
    if (!code) {
      setMessage({ type: "error", text: "Please enter a promo code." });
      return;
    }

    if (subtotal <= 0) {
      setMessage({ type: "error", text: "Please add items to cart before applying coupon." });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/coupons/apply`,
        {
          code: code,
          subtotal: Number(subtotal),
        },
        {
          withCredentials: true,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data?.success) {
        const couponData = {
          id: response.data.coupon.id,
          code: response.data.coupon.code,
          description: response.data.coupon.description,
          discount_type: response.data.coupon.discount_type,
          discount_value: response.data.coupon.discount_value,
          discount_amount: response.data.discount_amount,
          min_order_amount: response.data.coupon.min_order_amount,
        };

        if (onApplyCoupon) {
          onApplyCoupon(couponData);
        }

        setMessage({
          type: "success",
          text: `Code '${code}' applied! You saved ₹${response.data.discount_amount}.`,
        });
        setCouponInput("");
      } else {
        setMessage({
          type: "error",
          text: response.data?.message || "Could not apply coupon.",
        });
      }
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "Invalid coupon code or minimum order not met.";
      setMessage({
        type: "error",
        text: errorMsg,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = () => {
    if (onRemoveCoupon) {
      onRemoveCoupon();
    }
    setMessage(null);
  };

  return (
    <div className="coupon_component_wrapper">
      <div className="coupon_section_header">
        <h4 style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "#ea580c" }}>
            <rect x="3" y="6" width="18" height="12" rx="2" />
            <circle cx="8" cy="12" r="2" />
            <path d="M14 9h4" />
            <path d="M14 15h4" />
          </svg>
          Coupons & Offers
        </h4>
        {availableCoupons.length > 0 && (
          <span className="coupon_header_badge">
            {availableCoupons.length} Active {availableCoupons.length === 1 ? "Offer" : "Offers"}
          </span>
        )}
      </div>

      {appliedCoupon ? (
        /* Applied Coupon Pill / Card */
        <div className="applied_coupon_card">
          <div className="applied_coupon_left">
            <div className="applied_icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <div className="applied_coupon_details">
              <h5>{appliedCoupon.code}</h5>
              <p>
                Saved ₹{Number(appliedCoupon.discount_amount || 0).toFixed(0)} with this offer!
              </p>
            </div>
          </div>
          <button
            type="button"
            className="remove_coupon_btn"
            onClick={handleRemove}
            title="Remove applied coupon"
            style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
            Remove
          </button>
        </div>
      ) : (
        /* Coupon Input Form */
        <div className="coupon_input_group">
          <div className="coupon_input_wrapper">
            <span className="coupon_input_icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                <line x1="7" y1="7" x2="7.01" y2="7" />
              </svg>
            </span>
            <input
              type="text"
              className="coupon_input_field"
              placeholder="Enter coupon code (e.g. WELCOME50)"
              value={couponInput}
              onChange={(e) => {
                setCouponInput(e.target.value.toUpperCase());
                if (message) setMessage(null);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleApply();
                }
              }}
            />
          </div>
          <button
            type="button"
            className="coupon_apply_btn"
            disabled={loading || !couponInput.trim()}
            onClick={() => handleApply()}
          >
            {loading ? "Checking..." : "Apply"}
          </button>
        </div>
      )}

      {/* Inline Feedback Message */}
      {message && (
        <div className={`coupon_message_box ${message.type}`}>
          <span style={{ display: "inline-flex", alignItems: "center" }}>
            {message.type === "success" ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            )}
          </span>
          <span>{message.text}</span>
        </div>
      )}

      {/* Available Offers Toggle */}
      {availableCoupons.length > 0 && (
        <>
          <button
            type="button"
            className="available_offers_toggle"
            onClick={() => setShowOffers((prev) => !prev)}
          >
            <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
              {showOffers ? "Hide Available Offers" : "View Available Offers"}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: showOffers ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </span>
            <span style={{ fontSize: "12px", opacity: 0.8 }}>
              {showOffers ? "Close" : `Tap to view ${availableCoupons.length} promo codes`}
            </span>
          </button>

          {showOffers && (
            <div className="available_coupons_list">
              {availableCoupons.map((coupon) => {
                const isApplied = appliedCoupon && appliedCoupon.code === coupon.code;
                const minReq = Number(coupon.min_order_amount || 0);
                const isEligible = subtotal >= minReq;
                const shortfall = Math.ceil(minReq - subtotal);

                return (
                  <div
                    key={coupon.id}
                    className={`coupon_offer_item ${isApplied ? "active_applied" : ""}`}
                  >
                    <div style={{ flex: 1, paddingRight: "10px" }}>
                      <div className="offer_badge_row">
                        <span className="offer_code_badge">{coupon.code}</span>
                        <span className="offer_discount_highlight">
                          {coupon.discount_type === "percentage"
                            ? `${coupon.discount_value}% OFF`
                            : `₹${coupon.discount_value} FLAT OFF`}
                        </span>
                      </div>
                      <p className="offer_desc">{coupon.description}</p>
                      <p className="offer_terms">
                        {minReq > 0 ? `Min order: ₹${minReq}` : "No min order"}
                        {coupon.max_discount_amount &&
                          ` | Max discount: ₹${coupon.max_discount_amount}`}
                        {coupon.expires_at && ` | Expires: ${coupon.expires_at}`}
                      </p>
                    </div>

                    <div>
                      {isApplied ? (
                        <button type="button" className="offer_action_btn applied" disabled style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                          Applied
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </button>
                      ) : coupon.is_used_up ? (
                        <button type="button" className="offer_action_btn" disabled>
                          Used Up
                        </button>
                      ) : isEligible ? (
                        <button
                          type="button"
                          className="offer_action_btn"
                          disabled={loading}
                          onClick={() => handleApply(coupon.code)}
                        >
                          APPLY
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="offer_action_btn"
                          disabled
                          title={`Add ₹${shortfall} more to cart to use this code`}
                        >
                          Add ₹{shortfall} more
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}
