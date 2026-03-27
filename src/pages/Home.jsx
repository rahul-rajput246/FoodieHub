import { Link } from "react-router-dom";
import CategorySection from "../components/CategorySection";
import { useState } from "react";

function Home() {
	
	const categories = [
		
		{
			id : 1,
			title: "Fast Food",
			items: [
			  {
				id: 1,
				name: "Burger",
				price: 80,
				rating: 4.8,
				description: "Juicy grilled burger with cheese and crispy veggies",
				image: "assets/images/burger_img.jfif"
			  },
			  {
				id: 2,
				name: "Pizza",
				price: 299,
				rating: 4.7,
				description: "Loaded pizza with melted cheese and fresh toppings",
				image: "assets/images/pizza_img.jfif"
			  },
			  {
				id: 3,
				name: "Fries",
				price: 99,
				rating: 4.5,
				description: "Crispy golden fries with spicy seasoning",
				image: "assets/images/frize_img.jfif"
			  },
			  {
				id: 4,
				name: "Sandwich",
				price: 149,
				rating: 4.4,
				description: "Fresh sandwich stuffed with cheesy fillings",
				image: "assets/images/sandwitch_img.jfif"
			  },
			  {
				id: 5,
				name: "Hot Dog",
				price: 129,
				rating: 4.6,
				description: "Soft bun with sausage and delicious sauces",
				image: "assets/images/hot_dog_img.webp"
			  },
			  {
				id: 6,
				name: "Wrap",
				price: 179,
				rating: 4.5,
				description: "Spicy wrap filled with grilled chicken and veggies",
				image: "assets/images/fried_chicken_img.jfif"
			  },
			  {
				id: 7,
				name: "Nuggets",
				price: 159,
				rating: 4.7,
				description: "Crunchy chicken nuggets with dip on the side",
				image: "assets/images/grildChicken.jfif"
			  },
			  {
				id: 8,
				name: "Chicken Wings",
				price: 249,
				rating: 4.9,
				description: "Hot and crispy wings tossed in spicy sauce",
				image: "assets/images/chicken_wings_img.jfif"
			  }
			]
		},
		{
		  id: 2,
		  title: "Desi Tadka",
		  items: [
			{
			  id: 1,
			  name: "Paneer Butter Masala",
			  price: 249,
			  rating: 4.8,
			  description: "Creamy paneer curry cooked in rich buttery tomato gravy",
			  image: "assets/images/paneer_img.jfif"
			},
			{
			  id: 2,
			  name: "Dal Tadka",
			  price: 199,
			  rating: 4.6,
			  description: "Yellow dal tempered with garlic, cumin and desi spices",
			  image: "assets/images/dal_tadka_img.jfif"
			},
			{
			  id: 3,
			  name: "Chole Masala",
			  price: 99,
			  rating: 4.7,
			  description: "Spicy chickpea curry cooked in traditional Punjabi style",
			  image: "assets/images/chole_img.jpg"
			},
			{
			  id: 4,
			  name: "Rajma Chawal",
			  price: 149,
			  rating: 4.7,
			  description: "Kidney beans curry served with steamed rice",
			  image: "assets/images/rajma_rice_img.jpg"
			},
			{
			  id: 5,
			  name: "Jeera Rice",
			  price: 129,
			  rating: 4.5,
			  description: "Aromatic basmati rice flavored with cumin seeds",
			  image: "assets/images/jeera_rice_img.jfif"
			},
			{
			  id: 6,
			  name: "Soya Chunks Curry",
			  price: 179,
			  rating: 4.4,
			  description: "Protein-rich soya chunks cooked in spicy gravy",
			  image: "assets/images/soya_curry_img.webp"
			},
			{
			  id: 7,
			  name: "Bhindi Masala",
			  price: 159,
			  rating: 4.3,
			  description: "Stir-fried okra with onions and traditional spices",
			  image: "assets/images/ladyfinger_img.jpg"
			},
			{
			  id: 8,
			  name: "Dal Makhni",
			  price: 249,
			  rating: 4.9,
			  description: "Slow-cooked black lentils with butter and cream",
			  image: "assets/images/dal_makhni_img.jfif"
			}
		  ]
		},
		{
		  id: 3,
		  title: "Chill Drinks",
		  items: [
			{
			  id: 1,
			  name: "Cold Coffee",
			  price: 99,
			  rating: 4.7,
			  description: "Chilled creamy coffee blended with ice and rich flavor",
			  image: "assets/images/cold_coffee.jfif"
			},
			{
			  id: 2,
			  name: "Chocolate Shake",
			  price: 149,
			  rating: 4.8,
			  description: "Thick chocolate milkshake topped with whipped cream",
			  image: "assets/images/chockolate_shake.jfif"
			},
			{
			  id: 3,
			  name: "Caramel Cold Coffee",
			  price: 129,
			  rating: 4.6,
			  description: "Smooth iced coffee with sweet caramel drizzle",
			  image: "assets/images/caramel_cold_coffee.jfif"
			},
			{
			  id: 4,
			  name: "Brownie Shake",
			  price: 139,
			  rating: 4.9,
			  description: "Rich brownie blended shake with chocolate chunks",
			  image: "assets/images/brownie_shake.jfif"
			},
			{
			  id: 5,
			  name: "Mint Mojito",
			  price: 169,
			  rating: 4.5,
			  description: "Refreshing mint drink with lime and soda fizz",
			  image: "assets/images/mojito.jfif"
			},
			{
			  id: 6,
			  name: "Pineapple Juice",
			  price: 179,
			  rating: 4.4,
			  description: "Fresh tropical pineapple juice full of natural sweetness",
			  image: "assets/images/pineapple_juice.jfif"
			},
			{
			  id: 7,
			  name: "Watermelon Juice",
			  price: 159,
			  rating: 4.6,
			  description: "Cool and hydrating watermelon juice for summer refreshment",
			  image: "assets/images/watermelon_juice.webp"
			},
			{
			  id: 8,
			  name: "Masala Soda",
			  price: 249,
			  rating: 4.3,
			  description: "Tangy Indian soda with spices, lemon and fizzy taste",
			  image: "assets/images/masala_soda.jfif"
			}
		  ]
		},
		{
		  id: 4,
		  title: "Sweet Cravings",
		  items: [
			{
			  id: 1,
			  name: "Black Forest Cake",
			  price: 149,
			  rating: 4.8,
			  description: "Soft chocolate sponge layered with cream and cherries",
			  image: "assets/images/blackForest_cake.webp"
			},
			{
			  id: 2,
			  name: "Pineapple Pastry",
			  price: 299,
			  rating: 4.6,
			  description: "Light and fluffy pastry topped with fresh pineapple cream",
			  image: "assets/images/pineapple_pastry.webp"
			},
			{
			  id: 3,
			  name: "Butterscotch Ice Cream",
			  price: 79,
			  rating: 4.5,
			  description: "Creamy ice cream with rich butterscotch flavor and crunch",
			  image: "assets/images/butterScotch_iceCream.jfif"
			},
			{
			  id: 4,
			  name: "Ice Cream Brownie",
			  price: 119,
			  rating: 4.9,
			  description: "Warm chocolate brownie served with cold vanilla ice cream",
			  image: "assets/images/ice_brownie.jpg"
			},
			{
			  id: 5,
			  name: "Donut Cake",
			  price: 139,
			  rating: 4.4,
			  description: "Soft glazed donut topped with chocolate and sprinkles",
			  image: "assets/images/donat_cake.jfif"
			},
			{
			  id: 6,
			  name: "Cupcake",
			  price: 159,
			  rating: 4.5,
			  description: "Delicious cupcake with creamy frosting and toppings",
			  image: "assets/images/cupcake.jpg"
			},
			{
			  id: 7,
			  name: "Rasmalai",
			  price: 140,
			  rating: 4.7,
			  description: "Soft paneer balls soaked in sweet creamy milk syrup",
			  image: "assets/images/rasmalai.avif"
			},
			{
			  id: 8,
			  name: "Gulab Jamun",
			  price: 199,
			  rating: 4.8,
			  description: "Deep fried sweet balls soaked in sugar syrup",
			  image: "assets/images/gulab_jamun.jpg"
			}
		  ]
		}
	
	];
	
	const[activeCategory,setActiveCategory] = useState(categories[0]);
	
  return (
    <>
		
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

      <div className="category_section">
        <div className="container">
		
          <div className="category_row pt-5 py-3">
			
			{categories.map((category) => (
			
				<button 
					className={`category_heading ${activeCategory.id === category.id ? "active" : ""}`}
					onClick={() => setActiveCategory(category)}>
						{category.title}
				</button>
			
			))}
			
		  </div>
		  
		  <div className="category_card">
			<div className="container">
				
					<CategorySection items={activeCategory.items} />
				
			</div>
		  </div>
		  
        </div>
      </div>
	  
	  
    </>
  );
}

export default Home;