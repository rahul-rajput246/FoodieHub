import "./CheckOut.css"
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CheckOutPage from "../components/CheckOutPage";

import { useState, useEffect } from "react";    

function CheckOut({ addToCart, totalQty, setAddToCart, foodItems, plus_cart, minus_cart, add_cart, user }) {

    // const [user, setUser] = useState(null);

    // useEffect(() => {
    //   const fetchUser = async () => {
    //     try {
    //       await fetch("http://localhost:8000/sanctum/csrf-cookie", {
    //         credentials: "include",
    //       });
    
    //       const res = await fetch("http://localhost:8000/api/user", {
    //         credentials: "include",
    //       });
    
    //       if (!res.ok) throw new Error("Not logged in");
    
    //       const data = await res.json();
    //       setUser(data);
    //     } catch (err) {
    //       setUser(null);
    //     }
    //   };
    
    //   fetchUser();
    // }, []);

  //   if (!user) {
  //   return <h2>Loading...</h2>;
  // }

   if (!user) {
      return (
        <div className="text-center py-5">
          <div className="spinner">
            <img src="public/assets/favicon/favicon.png" alt="loading..." loading="lazy"/>
          </div>
        </div>
      );
    }

    return(
       <>
            <Navbar user={user} />

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
         />

            <Footer />
       </>
    )
}
export default CheckOut;