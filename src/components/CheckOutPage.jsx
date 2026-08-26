import { useEffect, useState } from "react";
// import { menuItems } from "../data/Menudata";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

{/* <script src="https://checkout.razorpay.com/v1/checkout.js"></script> */ }


function CheckOutPage({ addToCart = [], totalQty, setAddToCart, foodItems }) {

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [notes, setNotes] = useState("");

  const BACKEND_URL = "http://localhost:8000";


  const cartPayload = addToCart.map(item => ({
    id: item.id,
    qty: item.qty
  }));

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return decodeURIComponent(parts.pop().split(";").shift());
    }
    return null;
  }

  const checkoutItems = foodItems.filter((product) =>
    addToCart.some((item) => item.id === product.id)
  );

  const getQty = (id) => {
    const cartItem = addToCart.find((item) => item.id === id);
    return cartItem ? cartItem.qty : 0;
  };

  const subtotal = checkoutItems.reduce((total, product) => {
    return total + Number(product.food_price) * getQty(product.id);
  }, 0);

  const deliveryFee = subtotal > 499 ? 0 : 40;
  const discount = subtotal > 999 ? 100 : 0;
  const totalAmount = subtotal + deliveryFee - discount;

  const navigate = useNavigate();

  const handleCheckout = () => {
    const token = localStorage.getItem("token"); // or your auth storage

    if (!token) {
      navigate("/login"); // redirect if not logged in
    } else {
      navigate("/checkout");
    }
  };

  // Address selection state

  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  useEffect(() => {
    const loadAddresses = async () => {
      try {
        await getCsrfCookie();

        const res = await api.get("/api/user-addresses");
        const data = res.data;

        setAddresses(data);

        if (data.length > 0) {
          setSelectedAddressId(data[0].id);
        }
      } catch (error) {
        console.error("ADDRESS LOAD ERROR:", error);
      }
    };

    loadAddresses();
  }, []);



  // Handle Place Order

  const handlePlaceOrder = async () => {
    if (!selectedAddressId) {
      alert("Please select address");
      return;
    }

    if (!cartPayload.length) {
      alert("Your cart is empty");
      return;
    }

    if (paymentMethod === "cod") {
      await handleCashOnDelivery();
    } else if (paymentMethod === "upi" || paymentMethod === "card") {
      await handleRazorpayPayment();
    } else {
      alert("Please select a valid payment method");
    }
  };



  // Razorpay Helper Function

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const existingScript = document.getElementById("razorpay-script");

      if (existingScript) {
        resolve(true);
        return;
      }

      const script = document.createElement("script");
      script.id = "razorpay-script";
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);

      document.body.appendChild(script);
    });
  };

  const getCookieValue = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return decodeURIComponent(parts.pop().split(";").shift());
    }
    return "";
  };

  const api = axios.create({
    baseURL: BACKEND_URL,
    withCredentials: true,
    withXSRFToken: true,
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },
  });

  const getCsrfCookie = async () => {
    await api.get("/sanctum/csrf-cookie");

    const token = getCookieValue("XSRF-TOKEN");

    if (token) {
      api.defaults.headers.common["X-XSRF-TOKEN"] = token;
    }

    console.log("XSRF TOKEN:", token);
  };

  const handleCashOnDelivery = async () => {
    try {
      await getCsrfCookie();

      const response = await api.post("/api/place-order", {
        address_id: selectedAddressId,
        payment_method: "cod",
        cart: cartPayload,
        notes,
      });

      if (response.data.success) {
        localStorage.removeItem("foodCart");
        setAddToCart([]);

        navigate("/order-success", {
          state: { orderId: response.data.order_id },
        });
      } else {
        alert(response.data.message || "COD order failed");
      }
    } catch (error) {
      console.error("COD ERROR:", error);
      console.error("COD RESPONSE:", error.response);
      alert(error.response?.data?.message || "COD order failed");
    }
  };

  const testSession = async () => {
    try {
      await getCsrfCookie();
      const res = await api.get("/api/user");
      console.log("USER OK:", res.data);
      alert("Session is working");
    } catch (error) {
      console.error("SESSION TEST ERROR:", error);
      alert("Session test failed");
    }
  };

  const handleRazorpayPayment = async () => {
    const scriptLoaded = await loadRazorpayScript();

    if (!scriptLoaded) {
      alert("Razorpay SDK failed to load");
      return;
    }

    try {
      await getCsrfCookie();

      const response = await api.post("/api/create-razorpay-order", {
        address_id: selectedAddressId,
        payment_method: "razorpay",
        cart: cartPayload,
        notes,
      });

      const data = response.data;

      if (!data.success) {
        alert(data.message || "Unable to create Razorpay order");
        return;
      }

      const options = {
        key: data.key,
        amount: data.amount,
        currency: data.currency,
        name: "FoodieHub",
        description: "Food Order Payment",
        order_id: data.razorpay_order_id,
        prefill: {
          name: data.customer_name,
          email: data.customer_email,
          contact: data.customer_contact,
        },
        handler: async function (paymentResponse) {
          try {
            await getCsrfCookie();

            const verifyResponse = await api.post("/api/verify-razorpay-payment", {
              local_order_id: data.local_order_id,
              razorpay_order_id: paymentResponse.razorpay_order_id,
              razorpay_payment_id: paymentResponse.razorpay_payment_id,
              razorpay_signature: paymentResponse.razorpay_signature,
            });

            if (verifyResponse.data.success) {
              localStorage.removeItem("foodCart");
              setAddToCart([]);

              navigate("/order-success", {
                state: { orderId: verifyResponse.data.order_id },
              });
            } else {
              alert(verifyResponse.data.message || "Payment verification failed");
            }
          } catch (error) {
            console.error("VERIFY ERROR:", error);
            console.error("VERIFY RESPONSE:", error.response);
            alert(error.response?.data?.message || "Verification failed");
          }
        },
        modal: {
          ondismiss: function () {
            console.log("Payment popup closed");
          },
        },
        theme: {
          color: "#f97316",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("RAZORPAY CREATE ERROR:", error);
      console.error("RAZORPAY CREATE RESPONSE:", error.response);
      alert(error.response?.data?.message || "Failed to start payment");
    }
  };



  return (
    <section className="checkout_main_section">
      <div className="container">
        <div className="row g-4">

          <div className="col-lg-8">
            <div className="checkout_form_box">
              <h3>Delivery Information</h3>

              <div className="address_list">
                {addresses.length > 0 ? (
                  addresses.map((addr) => (
                    <label
                      key={addr.id}
                      className={`address_card ${selectedAddressId === addr.id ? "active" : ""}`}
                    >
                      <input
                        type="radio"
                        name="address"
                        value={addr.id}
                        checked={selectedAddressId === addr.id}
                        onChange={() => setSelectedAddressId(addr.id)}
                      />

                      <div className="address_card_content">
                        <div className="address_card_top">
                          <h4>{addr.full_name}</h4>
                          <span>{addr.phone ?? "No phone"}</span>
                        </div>

                        <p>{addr.address_line}</p>
                        <p>
                          {addr.city}
                          {addr.state ? `, ${addr.state}` : ""}
                          {addr.pincode ? ` - ${addr.pincode}` : ""}
                        </p>
                      </div>
                    </label>
                  ))
                ) : (
                  <p className="empty_address_text">No saved address found.</p>
                )}
              </div>


            </div>

            <div className="payment_box">
              <h3>Payment Method</h3>

              <label className={`payment_option ${paymentMethod === "cod" ? "active" : ""}`}>
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span>Cash on Delivery</span>
              </label>

              <label className={`payment_option ${paymentMethod === "upi" ? "active" : ""}`}>
                <input
                  type="radio"
                  name="payment"
                  value="upi"
                  checked={paymentMethod === "upi"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span>UPI Payment</span>
              </label>

              <label className={`payment_option ${paymentMethod === "card" ? "active" : ""}`}>
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span>Credit / Debit Card</span>
              </label>
            </div>


            <div className="notes_box">
              <h3>Order Notes</h3>
              <textarea
                className="checkout_textarea"
                rows="5"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add delivery instructions, less spicy, call before delivery, etc."
              ></textarea>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="checkout_summary_box">
              <h3>Order Summary</h3>

              <div className="summary_row">
                <span>Items</span>
                <span>{addToCart.length}</span>
              </div>

              <div className="summary_row">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>

              <div className="summary_row">
                <span>Delivery Fee</span>
                <span>{deliveryFee === 0 ? "Free" : `₹${deliveryFee}`}</span>
              </div>

              <div className="summary_row">
                <span>Discount</span>
                <span>- ₹{discount}</span>
              </div>

              <div className="summary_total">
                <span>Total</span>
                <span>₹{totalAmount}</span>
              </div>

              <button
                type="button"
                className="place_order_btn"
                onClick={handlePlaceOrder}
              >
                Place Order
              </button>

              <Link to="/cart" className="back_cart_btn">Back To Cart</Link>

              <p className="checkout_note">
                Estimated delivery: 25-30 mins
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default CheckOutPage;

