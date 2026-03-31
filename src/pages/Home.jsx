import CategorySection from "../components/CategorySection";
import WhyToChooseUs from "../components/whytoChooseUs";
import MostLovedSection from "../components/MostLovedSection";
import SpecialOfferBanner from "../components/SpecialOfferBanner";
import TestomonialSection from "../components/TestomonialSection";
import HowItWorks from "../components/HowItWorks";
import FAQSection from "../components/FAQSection";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { categories, whyToChooseUs, mostLovedItems, Testomonial } from "../data/Homedata";
import { useState } from "react";

function Home() {

	{/* Category Section */}

	const[activeCategory,setActiveCategory] = useState(categories[0]);
	
	{/* Why To Choose Us Section */}
	
	const[activeWhyToChooseUs , setWhyToChooseUs] = useState(whyToChooseUs[0]);
	
  {/* Add to Cart*/}

	const [addToCart, setAddToCart] = useState([]);
  const totalQty = addToCart.reduce((total,item) => total + item.qty,0)

  {/* Most love items*/}

  const [order,setOrder] = useState([]);

  return (
    <>

    <Navbar totalQty={totalQty}/>

		{/* Banner Page */}
	
      <div className="banner_section">
        <div className="banner_overlay">
          <div className="container">
            <div className="banner_right_box">
              <div className="heading_box">
                <span className="banner_tag">Fastest Food Delivery</span>
                <h3>
                  Be The Quickest <br /> In Your Food <br /> Delivery
                </h3>
                <p>
                  From kitchen to your door — hot, fresh & lightning fast.
                  Order your favorite meals anytime with FoodieHub.
                </p>
              </div>

              <div className="button_box">
                <Link to="/Shop" className="shop_btn">
                  Shop Now
                </Link>
                <Link to="/Menu" className="menu_btn">
                  Explore Menu
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
	  
	  {/* Category Section */}

      <div className="category_section pb-5">
        <div className="container">
		
          <div className="category_row pt-5 py-3">
			
            {categories.map((category) => (
            
              <button 
                key={category.id}
                className={`category_heading ${activeCategory.id === category.id ? "active" : ""}`}
                onClick={() => setActiveCategory(category)}>
                  {category.title}
              </button>
            
            ))}
            
          </div>
		  
        <div className="category_card">
          <CategorySection items={activeCategory.items} addToCart={addToCart} setAddToCart={setAddToCart} />
        </div>
        
        </div>
      </div>
	  
	  
	  {/* Why to Choose Us Start */}
	  
	  <div className="why_to_choose_secton pb-5">
			<WhyToChooseUs items={activeWhyToChooseUs.items} title={activeWhyToChooseUs.title} subtitle={activeWhyToChooseUs.subtitle}/>
	  </div>
	  
	  {/* Most Loved Section */}
	  
		<MostLovedSection
			title="Most Loved Food Items"
			subtitle="Discover the dishes our customers order again and again, made fresh with love and packed with flavor."
			items={mostLovedItems}
      order={order} 
      setOrder={setOrder}
		/>

    {/* How It Works */}

      <HowItWorks />
	  
	   {/* Special Banner Section */}

	   <SpecialOfferBanner />

      {/* Special Banner Section */}

	    <TestomonialSection 
        title="Loved By Food Lovers"
        desc="See what our happy customers say about the taste, freshness, and fast delivery of FoodieHub."
        items={Testomonial}
      /> 

      {/* FAQ Section */}

      <FAQSection />
      
    </>
  );
}

export default Home;