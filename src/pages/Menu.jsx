import Navbar from "../components/Navbar";
import HomeBanner from "../components/HomeBanner";
import MenuFilter from "../components/MenuFilter";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import { API_BASE_URL } from "../config";

function Menu({ user, addToCart, add_cart, plus_cart, totalQty, minus_cart, wishList, addToWishlist, removeFromWishlist, foodItems, openCustomise, add_customized_cart }) {

  const [menuData, setmenuData] = useState(() => {
    try {
      const cached = localStorage.getItem("menuDataCache");
      return cached ? JSON.parse(cached) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/home-data/menu`)
      .then((res) => res.json())
      .then((result) => {
        if (result.data) {
          setmenuData(result.data);
          try {
            localStorage.setItem("menuDataCache", JSON.stringify(result.data));
          } catch (e) {
            console.warn("Could not cache menu data:", e);
          }
        }
      })
      .catch((error) => {
        console.log("Error Fetching Menu API:", error);
      });
  }, []);

  if (!menuData) {
    return (
      <>
        <Navbar totalQty={totalQty} user={user} />
        <div className="text-center py-5 d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "60vh" }}>
          <div className="spinner-border text-warning" role="status" style={{ width: "3rem", height: "3rem" }}>
            <span className="visually-hidden">Loading Menu...</span>
          </div>
          <p className="mt-3 text-secondary">Loading delicious menu...</p>
        </div>
        <Footer />
      </>
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