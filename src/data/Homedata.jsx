import { FaTruck } from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import { GiChefToque } from "react-icons/gi";
import { FaLeaf } from "react-icons/fa";

{/* Category Section */}
	
	export const categories = [
		
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
			  id: 9,
			  name: "Paneer Butter Masala",
			  price: 249,
			  rating: 4.8,
			  description: "Creamy paneer curry cooked in rich buttery tomato gravy",
			  image: "assets/images/paneer_img.jfif"
			},
			{
			  id: 10,
			  name: "Dal Tadka",
			  price: 199,
			  rating: 4.6,
			  description: "Yellow dal tempered with garlic, cumin and desi spices",
			  image: "assets/images/dal_tadka_img.jfif"
			},
			{
			  id: 11,
			  name: "Chole Masala",
			  price: 99,
			  rating: 4.7,
			  description: "Spicy chickpea curry cooked in traditional Punjabi style",
			  image: "assets/images/chole_img.jpg"
			},
			{
			  id: 12,
			  name: "Rajma Chawal",
			  price: 149,
			  rating: 4.7,
			  description: "Kidney beans curry served with steamed rice",
			  image: "assets/images/rajma_rice_img.jpg"
			},
			{
			  id: 13,
			  name: "Jeera Rice",
			  price: 129,
			  rating: 4.5,
			  description: "Aromatic basmati rice flavored with cumin seeds",
			  image: "assets/images/jeera_rice_img.jfif"
			},
			{
			  id: 14,
			  name: "Soya Chunks Curry",
			  price: 179,
			  rating: 4.4,
			  description: "Protein-rich soya chunks cooked in spicy gravy",
			  image: "assets/images/soya_curry_img.webp"
			},
			{
			  id: 15,
			  name: "Bhindi Masala",
			  price: 159,
			  rating: 4.3,
			  description: "Stir-fried okra with onions and traditional spices",
			  image: "assets/images/ladyfinger_img.jpg"
			},
			{
			  id: 16,
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
			  id: 17,
			  name: "Cold Coffee",
			  price: 99,
			  rating: 4.7,
			  description: "Chilled creamy coffee blended with ice and rich flavor",
			  image: "assets/images/cold_coffee.jfif"
			},
			{
			  id: 18,
			  name: "Chocolate Shake",
			  price: 149,
			  rating: 4.8,
			  description: "Thick chocolate milkshake topped with whipped cream",
			  image: "assets/images/chockolate_shake.jfif"
			},
			{
			  id: 19,
			  name: "Caramel Cold Coffee",
			  price: 129,
			  rating: 4.6,
			  description: "Smooth iced coffee with sweet caramel drizzle",
			  image: "assets/images/caramel_cold_coffee.jfif"
			},
			{
			  id: 20,
			  name: "Brownie Shake",
			  price: 139,
			  rating: 4.9,
			  description: "Rich brownie blended shake with chocolate chunks",
			  image: "assets/images/brownie_shake.jfif"
			},
			{
			  id: 21,
			  name: "Mint Mojito",
			  price: 169,
			  rating: 4.5,
			  description: "Refreshing mint drink with lime and soda fizz",
			  image: "assets/images/mojito.jfif"
			},
			{
			  id: 22,
			  name: "Pineapple Juice",
			  price: 179,
			  rating: 4.4,
			  description: "Fresh tropical pineapple juice full of natural sweetness",
			  image: "assets/images/pineapple_juice.jfif"
			},
			{
			  id: 23,
			  name: "Watermelon Juice",
			  price: 159,
			  rating: 4.6,
			  description: "Cool and hydrating watermelon juice for summer refreshment",
			  image: "assets/images/watermelon_juice.webp"
			},
			{
			  id: 24,
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
			  id: 25,
			  name: "Black Forest Cake",
			  price: 149,
			  rating: 4.8,
			  description: "Soft chocolate sponge layered with cream and cherries",
			  image: "assets/images/blackForest_cake.webp"
			},
			{
			  id: 26,
			  name: "Pineapple Pastry",
			  price: 299,
			  rating: 4.6,
			  description: "Light and fluffy pastry topped with fresh pineapple cream",
			  image: "assets/images/pineapple_pastry.webp"
			},
			{
			  id: 27,
			  name: "Butterscotch Ice Cream",
			  price: 79,
			  rating: 4.5,
			  description: "Creamy ice cream with rich butterscotch flavor and crunch",
			  image: "assets/images/butterScotch_iceCream.jfif"
			},
			{
			  id: 28,
			  name: "Ice Cream Brownie",
			  price: 119,
			  rating: 4.9,
			  description: "Warm chocolate brownie served with cold vanilla ice cream",
			  image: "assets/images/ice_brownie.jpg"
			},
			{
			  id: 29,
			  name: "Donut Cake",
			  price: 139,
			  rating: 4.4,
			  description: "Soft glazed donut topped with chocolate and sprinkles",
			  image: "assets/images/donat_cake.jfif"
			},
			{
			  id: 30,
			  name: "Cupcake",
			  price: 159,
			  rating: 4.5,
			  description: "Delicious cupcake with creamy frosting and toppings",
			  image: "assets/images/cupcake.jpg"
			},
			{
			  id: 31,
			  name: "Rasmalai",
			  price: 140,
			  rating: 4.7,
			  description: "Soft paneer balls soaked in sweet creamy milk syrup",
			  image: "assets/images/rasmalai.avif"
			},
			{
			  id: 32,
			  name: "Gulab Jamun",
			  price: 199,
			  rating: 4.8,
			  description: "Deep fried sweet balls soaked in sugar syrup",
			  image: "assets/images/gulab_jamun.jpg"
			}
		  ]
		}
	
	];
	
	{/* Why To Choose Us Section */}
		
		export const whyToChooseUs = [
			{
				id:1,
				title:"Experience the Best Food Service",
				subtitle:"We deliver more than just food — we deliver experience",
				items:[
					
					{
						id:1,
						icon:<FaTruck />,
						heading:"Fast Delivery",
						desc:"Get your food delivered quickly and always fresh. We make sure your cravings are satisfied without delay.",
					},
					{
						id:2,
						icon:<FaLeaf />,
						heading:"Fresh Ingredients",
						desc:"We use only high-quality and fresh ingredients. Every dish is prepared with care and hygiene.",
					},
					{
						id:3,
						icon:<MdPayment />,
						heading:"Easy Payment",
						desc:"Enjoy a smooth and secure checkout process. Multiple payment options for your convenience.",
					},
					{
						id:4,
						icon:<GiChefToque />,
						heading:"Expert Chefs",
						desc:"Our chefs bring rich flavors and expertise to every meal. Taste restaurant-quality food at home.",
					}
				]
			}
		];
	

	{/* Most Loved Section */}
	
	export const mostLovedItems = [
	  {
		id: 1,
		name: "Cheese Burger",
		price: 149,
		rating: 4.8,
		description: "Loaded with cheese, fresh veggies and grilled patty.",
		image: "assets/images/burger_img.jfif"
	  },
	  {
		id: 2,
		name: "Paneer Butter Masala",
		price: 249,
		rating: 4.9,
		description: "Rich buttery gravy with soft paneer cubes and spices.",
		image: "assets/images/paneer_img.jfif"
	  },
	  {
		id: 3,
		name: "Cold Coffee",
		price: 99,
		rating: 4.7,
		description: "Creamy chilled coffee blended perfectly for refreshment.",
		image: "assets/images/cold_coffee.jfif"
	  },
	  {
		id: 4,
		name: "Black Forest Cake",
		price: 179,
		rating: 4.8,
		description: "Soft chocolate cake layered with cream and cherries.",
		image: "assets/images/blackForest_cake.webp"
	  },
	  {
		id: 5,
		name: "Chicken Wings",
		price: 249,
		rating: 4.9,
		description: "Crispy spicy wings tossed in delicious hot sauce.",
		image: "assets/images/chicken_wings_img.jfif"
	  },
	  {
		id: 6,
		name: "Dal Makhni",
		price: 229,
		rating: 4.8,
		description: "Slow-cooked dal with butter and creamy rich flavor.",
		image: "assets/images/dal_makhni_img.jfif"
	  },
	  {
		id: 7,
		name: "Brownie Shake",
		price: 139,
		rating: 4.7,
		description: "Chocolate brownie shake with rich creamy texture.",
		image: "assets/images/brownie_shake.jfif"
	  },
	  {
		id: 8,
		name: "Gulab Jamun",
		price: 129,
		rating: 4.8,
		description: "Soft sweet dumplings soaked in sugar syrup.",
		image: "assets/images/gulab_jamun.jpg"
	  }
	];

	export const Testomonial = [
				{
					id:1,
					icon:"",
					testimonialName:"Rahul Rajput",
					image:"assets/images/our_team_img1.png",
					review:"Absolutely loved the burger and fries. Delivery was super quick and food arrived hot.",
					rating:4,
				},
				{
					id:2,
					icon:"",
					testimonialName:"Mohit Gautam",
					image:"assets/images/our_team_img2.png",
					review:"The pizza was cheesy, fresh, and full of flavor. One of the best online food experiences.",
					rating:5,
				},
				{
					id:3,
					icon:"",
					testimonialName:"Himanshu Singh",
					image:"assets/images/our_team_img3.png",
					review:"FoodieHub made my dinner so easy. Great taste, great service, and smooth ordering process",
					rating:4,
				},
			];