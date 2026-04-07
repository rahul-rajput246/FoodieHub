import { Link } from "react-router-dom";
import { menuItems } from "../data/Menudata";

function Cart({ addToCart, plus_cart, minus_cart, add_cart, totalQty }) {
  const cartItems = menuItems.filter((product) =>
    addToCart.some((item) => item.id === product.id)
  );

  const getQty = (id) => {
    const cartItem = addToCart.find((item) => item.id === id);
    return cartItem ? cartItem.qty : 0;
  };

  const subtotal = cartItems.reduce((total, product) => {
    return total + product.price * getQty(product.id);
  }, 0);

  const deliveryFee = subtotal > 499 ? 0 : 40;
  const discount = subtotal > 999 ? 100 : 0;
  const totalAmount = subtotal + deliveryFee - discount;

  return (

      <section className="cart_main_section">
        <div className="container">
          {cartItems.length > 0 ? (
            <div className="row g-4">
              
              {/* Left Side - Cart Items */}
              <div className="col-lg-8">
                <div className="cart_items_box">
                  <h3 className="cart_section_title">Cart Items</h3>

                  {cartItems.map((product) => (
                    <div className="cart_item_card" key={product.id}>
                      <div className="cart_item_img">
                        <img src={product.image} alt={product.name} />
                      </div>

                      <div className="cart_item_info">
                        <h4>{product.name}</h4>
                        <p>{product.description}</p>
                        <span className="cart_item_price">₹{product.price}</span>
                      </div>

                      <div className="cart_item_actions">
                        <div className="qty_box">
                          <button onClick={() => minus_cart(product.id)}>-</button>
                          <span>{getQty(product.id)}</span>
                          <button onClick={() => plus_cart(product.id)}>+</button>
                        </div>

                        <h5>₹{product.price * getQty(product.id)}</h5>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Side - Summary */}
              <div className="col-lg-4">
                <div className="cart_summary_box">
                  <h3>Order Summary</h3>

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

                  <button className="checkout_btn">Proceed To Checkout</button>
                  <Link to="/menu" className="continue_btn">Continue Shopping</Link>

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