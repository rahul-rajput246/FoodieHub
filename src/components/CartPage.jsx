import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";
import CouponSection from "./CouponSection";

function Cart({ addToCart, plus_cart, minus_cart, foodItems = [], user }) {

  const cartItems = foodItems.filter((product) =>
    addToCart.some((item) => item.id === product.id)
  );

  const getQty = (id) => {
    const cartItem = addToCart.find((item) => item.id === id);
    return cartItem ? cartItem.qty : 0;
  };

  const subtotal = cartItems.reduce((total, product) => {
    return total + Number(product.food_price) * getQty(product.id);
  }, 0);

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
          {cartItems.length > 0 ? (
            <div className="row g-4">
              
              {/* Left Side - Cart Items */}
              <div className="col-lg-8">
                <div className="cart_items_box">
                  <h3 className="cart_section_title">Cart Items ({cartItems.length})</h3>

                  {cartItems.map((product) => (
                    <div className="cart_item_card" key={product.id}>
                      <div className="cart_item_img">
                        <img src={product.image_url} alt={product.food_name} loading="lazy" />
                      </div>

                      <div className="cart_item_info">
                        <h4>{product.food_name}</h4>
                        <p>{product.food_subtitle}</p>
                        <span className="cart_item_price">₹{product.food_price}</span>
                      </div>

                      <div className="cart_item_actions">
                        <div className="qty_box">
                          <button onClick={() => minus_cart(product.id)}>-</button>
                          <span>{getQty(product.id)}</span>
                          <button onClick={() => plus_cart(product.id)}>+</button>
                        </div>

                        <h5>₹{Number(product.food_price) * getQty(product.id)}</h5>
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
                    <div style={{ fontSize: "12px", color: "#d97706", background: "#fef3c7", padding: "6px 10px", borderRadius: "8px", marginBottom: "12px" }}>
                      ⚠️ {couponWarning}
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