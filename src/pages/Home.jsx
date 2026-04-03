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
import {
  HomeBannerData,
  categories,
  whyToChooseUs,
  mostLovedItems as mostLovedContent,
  Testomonial,
  faqs
} from "../data/Homedata";
import { menuItems } from "../data/Menudata";
import { useState, useMemo } from "react";


function Home({ addToCart, add_cart, plus_cart, minus_cart, totalQty,wish,wishList   }) {
  
  const [activeWhyToChooseUs, setWhyToChooseUs] = useState(whyToChooseUs[0]);

  const allCategories = [{ id: 0, title: "All" }, ...categories];

  const [activeCategory, setActiveCategory] = useState("All");

  const randomItem = useMemo(() => {
    return [...menuItems].sort(() => Math.random() - 0.5).slice(0, 8);
  }, []);

  const filteredCategoryItems =
    activeCategory === "All"
      ? randomItem
      : menuItems.filter((item) => item.category === activeCategory);

  const mostLovedItems = menuItems.filter((item) => item.mostLoved);

  return (
    <>
      <Navbar totalQty={totalQty} />

      <HomeBanner details={HomeBannerData} />

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
              wish={wish}
              wishList={wishList}
              minus_cart={minus_cart}
            />
          </div>
        </div>
      </div>

      <div className="why_to_choose_secton pb-5">
        <WhyToChooseUs
          items={activeWhyToChooseUs.items}
          title={activeWhyToChooseUs.title}
          subtitle={activeWhyToChooseUs.subtitle}
        />
      </div>

      <MostLovedSection
        title={mostLovedContent.title}
        subtitle={mostLovedContent.subtitle}
        items={mostLovedItems}
        add_cart={add_cart}
      />

      <HowItWorks />
      <SpecialOfferBanner />
      <TestomonialSection
        title="Loved By Food Lovers"
        desc="See what our happy customers say about the taste, freshness, and fast delivery of FoodieHub."
        items={Testomonial}
      />
      <FAQSection items={faqs} />
      <Footer />
    </>
  );
}

export default Home;