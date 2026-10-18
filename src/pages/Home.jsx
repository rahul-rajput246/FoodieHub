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
import { DEFAULT_HOME_DATA } from "../data/defaultPageData";

function Home({ user, addToCart, add_cart, plus_cart, minus_cart, addToWishlist, removeFromWishlist, wishList, foodItems, openCustomise, add_customized_cart }) {

  const [activeCategory, setActiveCategory] = useState("All");
  const [homeData, setHomeData] = useState(() => {
    try {
      const cached = localStorage.getItem("homeDataCache");
      return cached ? JSON.parse(cached) : DEFAULT_HOME_DATA;
    } catch {
      return DEFAULT_HOME_DATA;
    }
  });
  const foodData = foodItems || [];

  useEffect(() => {
    const fetchHome = async () => {
      try {
        const res = await axios.get("/api/home-data/home");
        if (res.data?.data) {
          setHomeData(res.data.data);
          try {
            localStorage.setItem("homeDataCache", JSON.stringify(res.data.data));
          } catch (e) {
            console.warn("Could not cache home data:", e);
          }
        }
      } catch (error) {
        console.log("Error fetching home data:", error);
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

  const totalQty = addToCart.reduce((total, item) => total + item.qty, 0);

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
              openCustomise={openCustomise}
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
        openCustomise={openCustomise}
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