import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL, normalizeImageUrl } from "../config";
import CouponSection from "./CouponSection";
import VegBadge from "./VegBadge";

function Cart({ addToCart = [], plus_cart, minus_cart, foodItems = [], user }) {

  const detailedCartItems = addToCart.map((cartItem) => {
    const product = foodItems.find((p) => p.id === cartItem.id) || {};
    const itemKey = cartItem.cart_key || `item_${cartItem.id}`;
    const unitPrice =
      cartItem.item_price !== undefined
        ? Number(cartItem.item_price)
        : Number(product.food_price || 0);

    return {
      ...product,
      ...cartItem,
      cart_key: itemKey,
      unitPrice,
      lineTotal: unitPrice * cartItem.qty,
    };
  });

  const subtotal = detailedCartItems.reduce((total, item) => total + item.lineTotal, 0);

  const [appliedCoupon, setAppliedCoupon] = useState(() => {
    try {
      const saved = localStorage.getItem("appliedCoupon");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const handleApplyCoupon = (couponData) => {
    setAppliedCoupon(couponData);
    localStorage.setItem("appliedCoupon", JSON.stringify(couponData));
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    localStorage.removeItem("appliedCoupon");
  };

  // Dynamic discount calculation
  let discount = 0;
  let couponWarning = null;

  if (appliedCoupon) {
    const minReq = Number(appliedCoupon.min_order_amount || 0);
    if (subtotal < minReq) {
      couponWarning = `Add ₹${Math.ceil(minReq - subtotal)} more to activate ${appliedCoupon.code}`;
      discount = 0;
    } else {
      if (appliedCoupon.discount_type === "percentage") {
        let calc = (subtotal * Number(appliedCoupon.discount_value)) / 100;
        if (appliedCoupon.max_discount_amount) {
          calc = Math.min(calc, Number(appliedCoupon.max_discount_amount));
        }
        discount = Math.min(subtotal, calc);
      } else {
        discount = Math.min(subtotal, Number(appliedCoupon.discount_value));
      }
    }
  }

  const deliveryFee = subtotal > 499 ? 0 : (subtotal > 0 ? 40 : 0);
  const totalAmount = Math.max(0, subtotal + deliveryFee - discount);

  // login state check
  const navigate = useNavigate();
  
  const handleCheckout = async () => {
    const checkoutUrl = window.location.origin + "/checkout";
    const loginWithRedirect = `${API_BASE_URL}/login?redirect=${encodeURIComponent(checkoutUrl)}`;

    if (user) {
      navigate("/checkout");
      return;
    }

    try {
      await fetch(`${API_BASE_URL}/sanctum/csrf-cookie`, {
        credentials: "include",
      });

      const res = await fetch(`${API_BASE_URL}/api/user`, {
        credentials: "include",
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        navigate("/checkout");
      } else {
        window.location.href = loginWithRedirect;
      }
    } catch (error) {
      window.location.href = loginWithRedirect;
    }
  };

  return (

      <section className="cart_main_section">
        <div className="container">
          {detailedCartItems.length > 0 ? (
            <div className="row g-4">
              
              {/* Left Side - Cart Items */}
              <div className="col-lg-8">
                <div className="cart_items_box">
                  <h3 className="cart_section_title">Cart Items ({detailedCartItems.length})</h3>

                  {detailedCartItems.map((item) => (
                    <div className="cart_item_card" key={item.cart_key || item.id}>
                      <div className="cart_item_img">
                        <img
                          src={normalizeImageUrl(item.image_url)}
                          alt={item.food_name}
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = "/assets/images/burger.png";
                          }}
                        />
                      </div>

                      <div className="cart_item_info">
                        <div className="d-flex align-items-center gap-2 mb-1">
                          <VegBadge isVeg={item.is_veg} dietaryType={item.dietary_type} size="sm" />
                          <h4 className="mb-0">{item.food_name}</h4>
                        </div>

                        {item.food_subtitle && <p className="mb-1">{item.food_subtitle}</p>}

                        {/* Variation Tag */}
                        {item.selected_variation && (
                          <div className="mb-1">
                            <span className="badge bg-light text-dark border">
                              {item.selected_variation.name}
                              {Number(item.selected_variation.price || 0) > 0 &&
                                ` (+₹${item.selected_variation.price})`}
                            </span>
                          </div>
                        )}

                        {/* Add-ons List */}
                        {Array.isArray(item.selected_addons) && item.selected_addons.length > 0 && (
                          <div className="text-muted small mb-1">
                            <span className="fw-semibold text-secondary">Add-ons: </span>
                            {item.selected_addons.map((addon, aIdx) => (
                              <span key={addon.id || aIdx} className="me-2 d-inline-flex align-items-center gap-1">
                                <VegBadge isVeg={addon.is_veg !== false} size="sm" />
                                <span>{addon.name} (+₹{addon.price})</span>
                                {aIdx < item.selected_addons.length - 1 && <span>,</span>}
                              </span>
                            ))}
                          </div>
                        )}

                        <span className="cart_item_price">₹{item.unitPrice}</span>
                      </div>

                      <div className="cart_item_actions">
                        <div className="qty_box">
                          <button onClick={() => minus_cart(item.cart_key || item.id)}>-</button>
                          <span>{item.qty}</span>
                          <button onClick={() => plus_cart(item.cart_key || item.id)}>+</button>
                        </div>

                        <h5>₹{item.lineTotal}</h5>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Side - Summary & Coupon */}
              <div className="col-lg-4">
                <CouponSection
                  subtotal={subtotal}
                  appliedCoupon={appliedCoupon}
                  onApplyCoupon={handleApplyCoupon}
                  onRemoveCoupon={handleRemoveCoupon}
                />

                <div className="cart_summary_box">
                  <h3>Order Summary</h3>

                  <div className="summary_row">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toFixed(0)}</span>
                  </div>

                  <div className="summary_row">
                    <span>Delivery Fee</span>
                    <span>{deliveryFee === 0 ? "Free" : `₹${deliveryFee}`}</span>
                  </div>

                  {discount > 0 ? (
                    <div className="summary_row" style={{ color: "#059669", fontWeight: "600" }}>
                      <span>Coupon Discount ({appliedCoupon?.code})</span>
                      <span style={{ color: "#059669" }}>- ₹{Math.round(discount)}</span>
                    </div>
                  ) : couponWarning ? (
                    <div style={{ fontSize: "12px", color: "#d97706", background: "#fef3c7", padding: "6px 10px", borderRadius: "8px", marginBottom: "12px", display: "flex", alignItems: "center", gap: "6px" }}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                      </svg>
                      <span>{couponWarning}</span>
                    </div>
                  ) : null}

                  <div className="summary_total">
                    <span>Total</span>
                    <span>₹{Math.round(totalAmount)}</span>
                  </div>

                  <button onClick={handleCheckout} className="checkout_btn">
                    Proceed To Checkout
                  </button>
                  <Link to="/menu" className="continue_btn">
                    Continue Shopping
                  </Link>

                  <p className="delivery_note">
                    Free delivery on orders above ₹499
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="empty_cart_box">
              <h3>Your cart is empty</h3>
              <p>Add some delicious food to continue your order.</p>
              <Link to="/menu" className="browse_btn">Browse Menu</Link>
            </div>
          )}
        </div>
      </section>
  );
}

export default Cart;