import Navbar from "../components/Navbar";
import HomeBanner from "../components/HomeBanner";
import CategorySection from "../components/CategorySection";
import WhyToChooseUs from "../components/whytoChooseUs";
import MostLovedSection from "../components/MostLovedSection";
import SpecialOfferBanner from "../components/SpecialOfferBanner";
import TestomonialSection from "../components/TestomonialSection";
import HowItWorks from "../components/HowItWorks";
import FAQSection from "../components/FAQSection";
import Footer from "../components/Footer";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";

function Home({ user, addToCart, add_cart, plus_cart, minus_cart, addToWishlist, removeFromWishlist, wishList, foodItems }) {

  const [activeCategory, setActiveCategory] = useState("All");
  const [homeData, setHomeData] = useState(null);
  const foodData = foodItems || [];

  useEffect(() => {
    const fetchHome = async () => {
      try {
        const res = await axios.get("/api/home-data/home");
        setHomeData(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchHome();
  }, []);

  const allCategories = useMemo(() => {
    const uniqueCategories = [...new Set(foodData.map((item) => item.category_name).filter(Boolean))];

    return [
      { id: 0, title: "All" },
      ...uniqueCategories.map((cat, index) => ({
        id: index + 1,
        title: cat,
      })),
    ];
  }, [foodData]);

  const randomItem = useMemo(() => {
    return [...foodData].sort(() => Math.random() - 0.5).slice(0, 8);
  }, [foodData]);

  const filteredCategoryItems =
    activeCategory === "All"
      ? randomItem
      : foodData.filter((item) => item.category_name === activeCategory);

  const mostLovedItems = [...foodData].filter((item) => item.food_is_popular == 1)
    .sort((a, b) => b.id - a.id).slice(0, 4);

  // Admin Login credentials

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

  const totalQty = addToCart.reduce((total, item) => total + item.qty, 0);

 if (!homeData) {
  return (
    <div className="text-center bg-transparent py-5">
      <div className="spinner">
        <img src="/assets/favicon/favicon.png" alt="loading..."/>
      </div>
    </div>
  );
}

  return (
    <>
      <Navbar totalQty={totalQty} user={user} />

      <HomeBanner details={homeData || {}} bannerKey="home_banner" />

      <div className="category_section pb-5">
        <div className="container">
          <div className="category_row pt-5 py-3">
            {allCategories.map((category) => (
              <button
                key={category.id}
                className={`category_heading ${activeCategory === category.title ? "active" : ""}`}
                onClick={() => setActiveCategory(category.title)}
              >
                {category.title}
              </button>
            ))}
          </div>

          <div className="category_card">
            <CategorySection
              items={filteredCategoryItems}
              addToCart={addToCart}
              add_cart={add_cart}
              plus_cart={plus_cart}
              minus_cart={minus_cart}
              wishList={wishList}
              addToWishlist={addToWishlist}
              removeFromWishlist={removeFromWishlist}
            />
          </div>
        </div>
      </div>

      <WhyToChooseUs details={homeData} />

      <MostLovedSection
        foods={foodData}
        items={mostLovedItems}
        add_cart={add_cart}
        wishList={wishList}
        addToWishlist={addToWishlist}
        removeFromWishlist={removeFromWishlist}
      />

      <HowItWorks details={homeData} />
      <SpecialOfferBanner details={homeData} />
      <TestomonialSection details={homeData} />
      <FAQSection details={homeData} />
      <Footer />
    </>
  );
}

export default Home;