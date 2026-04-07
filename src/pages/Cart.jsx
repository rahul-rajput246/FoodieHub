import "./Cart.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CartPage from "../components/CartPage";
function Cart({ addToCart, plus_cart, minus_cart, add_cart, totalQty }) {
  return(
    <>
      
      <Navbar />

      <div className="Banner_heading_box">
          <div className="sub_banner_heading_box">
            <h2>Your Cart</h2>
            <h5>Review your selected items before checkout</h5>
          </div>
      </div>

      <CartPage
        addToCart={addToCart}
        plus_cart={plus_cart}
        minus_cart={minus_cart}
        add_cart={add_cart}
        totalQty={totalQty}
      />

      <Footer />

    </>
  );
}

export default Cart;