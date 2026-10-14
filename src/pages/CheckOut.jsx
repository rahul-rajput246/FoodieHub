import "./CheckOut.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CheckOutPage from "../components/CheckOutPage";
import { useEffect } from "react";
import { API_BASE_URL } from "../config";

function CheckOut({ addToCart, totalQty, setAddToCart, foodItems, plus_cart, minus_cart, add_cart, user, authLoading }) {
  const loginUrl = `${API_BASE_URL}/login?redirect=${encodeURIComponent(window.location.origin + "/checkout")}`;

  useEffect(() => {
    if (!authLoading && !user) {
      window.location.href = loginUrl;
    }
  }, [authLoading, user, loginUrl]);

  if (authLoading) {
    return (
      <div className="text-center py-5">
        <div className="spinner">
          <img src="/assets/favicon/favicon.png" alt="loading..." loading="lazy" />
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <>
        <Navbar user={user} totalQty={totalQty} />
        <div className="container py-5 text-center">
          <div className="card shadow-sm p-5 mx-auto" style={{ maxWidth: "520px", borderRadius: "16px" }}>
            <div className="mb-3" style={{ fontSize: "3rem" }}>🔒</div>
            <h3 className="mb-3 fw-bold">Login Required</h3>
            <p className="text-muted mb-4">
              Please log in to your FoodieHub account to proceed with checkout and complete your payment.
            </p>
            <a
              href={loginUrl}
              className="btn btn-warning btn-lg fw-bold text-white px-4 py-2"
              style={{ background: "#ff5e14", borderColor: "#ff5e14" }}
            >
              Log In to Continue
            </a>
            <div className="mt-3">
              <a
                href={`${API_BASE_URL}/register?redirect=${encodeURIComponent(window.location.origin + "/checkout")}`}
                className="text-decoration-none text-muted small"
              >
                Don't have an account? <span className="text-primary fw-semibold">Sign up</span>
              </a>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar user={user} totalQty={totalQty} />

      <div className="checkout_heading_section">
        <div className="container">
          <div className="checkout_heading_box">
            <h2>Checkout</h2>
            <p>Complete your order details</p>
          </div>
        </div>
      </div>

      <CheckOutPage
        addToCart={addToCart}
        plus_cart={plus_cart}
        minus_cart={minus_cart}
        add_cart={add_cart}
        totalQty={totalQty}
        setAddToCart={setAddToCart}
        foodItems={foodItems}
        user={user}
      />

      <Footer />
    </>
  );
}

export default CheckOut;