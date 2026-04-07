import "./CheckOut.css"
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CheckOutPage from "../components/CheckOutPage";
function CheckOut({addToCart, plus_cart, minus_cart, add_cart, totalQty}){
    return(
       <>
            <Navbar />

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
         />

            <Footer />
       </>
    )
}
export default CheckOut;