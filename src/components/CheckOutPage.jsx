import { menuItems } from "../data/Menudata";
import { Link } from "react-router-dom";

function CheckOutPage({ addToCart = [], totalQty }) {
  const checkoutItems = menuItems.filter((product) =>
    addToCart.some((item) => item.id === product.id)
  );

  const getQty = (id) => {
    const cartItem = addToCart.find((item) => item.id === id);
    return cartItem ? cartItem.qty : 0;
  };

  const subtotal = checkoutItems.reduce((total, product) => {
    return total + product.price * getQty(product.id);
  }, 0);

  const deliveryFee = subtotal > 499 ? 0 : 40;
  const discount = subtotal > 999 ? 100 : 0;
  const totalAmount = subtotal + deliveryFee - discount;
  return (
    <section className="checkout_main_section">
      <div className="container">
        <div className="row g-4">
          
          <div className="col-lg-8">
            <div className="checkout_form_box">
              <h3>Delivery Information</h3>

              <div className="row g-3">
                <div className="col-md-6">
                  <input type="text" placeholder="Full Name" className="checkout_input" />
                </div>

                <div className="col-md-6">
                  <input type="text" placeholder="Phone Number" className="checkout_input" />
                </div>

                <div className="col-12">
                  <input type="email" placeholder="Email Address" className="checkout_input" />
                </div>

                <div className="col-12">
                  <input type="text" placeholder="Street Address" className="checkout_input" />
                </div>

                <div className="col-md-4">
                  <input type="text" placeholder="City" className="checkout_input" />
                </div>

                <div className="col-md-4">
                  <input type="text" placeholder="State" className="checkout_input" />
                </div>

                <div className="col-md-4">
                  <input type="text" placeholder="Pincode" className="checkout_input" />
                </div>
              </div>
            </div>

            <div className="payment_box">
              <h3>Payment Method</h3>

              <label className="payment_option">
                <input type="radio" name="payment" defaultChecked />
                <span>Cash on Delivery</span>
              </label>

              <label className="payment_option">
                <input type="radio" name="payment" />
                <span>UPI Payment</span>
              </label>

              <label className="payment_option">
                <input type="radio" name="payment" />
                <span>Credit / Debit Card</span>
              </label>
            </div>

            <div className="notes_box">
              <h3>Order Notes</h3>
              <textarea
                className="checkout_textarea"
                rows="5"
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

              <Link to="/" className="place_order_btn">Place Order</Link>
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