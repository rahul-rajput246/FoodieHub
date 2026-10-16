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
          text: `🎉 Code '${code}' applied! You saved ₹${response.data.discount_amount}.`,
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
        <h4>
          <span>🎟️</span> Coupons & Offers
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
            <div className="applied_icon">✓</div>
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
          >
            ✕ Remove
          </button>
        </div>
      ) : (
        /* Coupon Input Form */
        <div className="coupon_input_group">
          <div className="coupon_input_wrapper">
            <span className="coupon_input_icon">🏷️</span>
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
          <span>{message.type === "success" ? "✓" : "⚠️"}</span>
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
            <span>{showOffers ? "Hide Available Offers ▲" : "View Available Offers ▼"}</span>
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
                        <button type="button" className="offer_action_btn applied" disabled>
                          Applied ✓
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
