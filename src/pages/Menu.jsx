import Navbar from "../components/Navbar";
import HomeBanner from "../components/HomeBanner";
import MenuFilter from "../components/MenuFilter";
import Footer from "../components/Footer";
import { useState, useEffect, useMemo } from "react";
import { API_BASE_URL } from "../config";


function Menu({ user, addToCart, add_cart, plus_cart, totalQty, minus_cart, wishList, addToWishlist, removeFromWishlist, foodItems, openCustomise, add_customized_cart }) {


  const [menuData, setmenuData] = useState(null);

  useEffect(() => {

    fetch(`${API_BASE_URL}/api/home-data/menu`)
      .then((res) => res.json())
      .then((result) => {
        console.log("Api Data:", result);
        setmenuData(result.data);
      })
      .catch((error) => {
        console.log("Error Fatching API:", error);
      });

  }, []);

   if (!menuData) {
  return (
    <div className="text-center py-5">
      <div className="spinner">
        <img src="/assets/favicon/favicon.png" alt="loading..." loading="lazy"/>
      </div>
    </div>
  );
}

  return (
    <>
      <Navbar totalQty={totalQty} user={user} />

      <HomeBanner details={menuData} bannerKey="menu_banner" />

      <MenuFilter
        foods={foodItems}
        addToCart={addToCart}
        add_cart={add_cart}
        plus_cart={plus_cart}
        wishList={wishList}
        addToWishlist={addToWishlist}
        removeFromWishlist={removeFromWishlist}
        minus_cart={minus_cart}
        openCustomise={openCustomise}
      />

      <Footer />
    </>
  );
}

export default Menu;