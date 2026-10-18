import "./Cart.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CartPage from "../components/CartPage";

import { useState, useEffect } from "react";
import { useRoutes } from "react-router-dom";

function Cart({ addToCart, plus_cart, minus_cart, remove_cart, add_cart, totalQty, foodItems, user }) {
  return (
    <>
      <Navbar user={user} totalQty={totalQty} />

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
        remove_cart={remove_cart}
        add_cart={add_cart}
        totalQty={totalQty}
        foodItems={foodItems}
        user={user}
      />

      <Footer />
    </>
  );
}

export default Cart;