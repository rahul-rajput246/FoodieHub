import { Link, useLocation } from "react-router-dom";
import "./OrderSuccess.css";
import { API_BASE_URL } from "../config";

function OrderSuccess() {
  const location = useLocation();

  // Get order id if passed via navigate
  const orderId = location.state?.orderId || "N/A";

  if (!location) {
    return <h2>Loading...</h2>;
  }

  return (
    <section className="order_success_section">
      <div className="container">
        <div className="order_success_box">

          {/* Success Icon */}
          <div className="success_icon">
            ✔
          </div>

          {/* Title */}
          <h2>Order Placed Successfully </h2>

          <p className="success_msg">
            Your delicious food is being prepared  <br />
            Sit back and relax, we’ll deliver it soon!
          </p>

          {/* Order Info */}
          <div className="order_info">
            <p><strong>Order ID:</strong> #{orderId}</p>
            <p><strong>Estimated Delivery:</strong> 25–30 mins</p>
          </div>

          {/* Buttons */}
          <div className="success_actions">
            <a href={`${API_BASE_URL}/orders`} className="btn_primary">
              View My Orders
            </a>

            <Link to="/menu" className="btn_outline">
              Order More Food
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}

export default OrderSuccess;