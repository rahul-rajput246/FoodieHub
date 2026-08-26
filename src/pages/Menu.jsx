import Navbar from "../components/Navbar";
import HomeBanner from "../components/HomeBanner";
import MenuFilter from "../components/MenuFilter";
import Footer from "../components/Footer";
import { useState, useEffect, useMemo } from "react";


function Menu({ user, addToCart, add_cart, plus_cart, totalQty, minus_cart, wishList, addToWishlist, removeFromWishlist, foodItems }) {


  const [menuData, setmenuData] = useState(null);

  useEffect(() => {

    fetch('http://127.0.0.1:8000/api/home-data/menu')
      .then((res) => res.json())
      .then((result) => {
        console.log("Api Data:", result);
        setmenuData(result.data);
      })
      .catch((error) => {
        console.log("Error Fatching API:", error);
      });

  }, []);

  // useEffect(() => {
  // const fetchUser = async () => {
  //   try {
  //     await fetch("http://localhost:8000/sanctum/csrf-cookie", {
  //       credentials: "include",
  //     });

  //     const res = await fetch("http://localhost:8000/api/user", {
  //       credentials: "include",
  //     });

  //     if (!res.ok) throw new Error("Not logged in");

  //     const data = await res.json();
  //     setUser(data);
  //   } catch (err) {
  //     setUser(null);
  //   }
  // };

  // fetchUser();
  // }, []);

   if (!menuData) {
  return (
    <div className="text-center py-5">
      <div className="spinner">
        <img src="public/assets/favicon/favicon.png" alt="loading..." loading="lazy"/>
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
      />

      <Footer />
    </>
  );
}

export default Menu;