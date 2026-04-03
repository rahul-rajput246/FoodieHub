import { MdPayment } from "react-icons/md";
import { GiChefToque } from "react-icons/gi";
import { FaTruck, FaLeaf } from "react-icons/fa";
import { FaUtensils, FaKitchenSet, FaMotorcycle } from "react-icons/fa6";

{/* Home Banner Data */}

	export const HomeBannerData = {
		image:"assets/images/home_banner.png",
		titleFirst: "Be The Quickest",
		titleSecond:"In Your Food",
		titleThird:"Delivery",
		subtitle: "Fastest Food Delivery",
		description:
		"From kitchen to your door — hot, fresh & lightning fast. Order your favorite meals anytime with FoodieHub.",
		btn1Text: "Shop Now",
		btn1Link: "/shop",
		btn2Text: "Explore Menu",
		btn2Link: "/menu",
	};


{/* Category Section */}
	
	export const categories = [	
		{
			id : 1,
			title: "Fast Food",
			
		},
		{
		  id: 2,
		  title: "Desi Tadka",
		 
		},
		{
		  id: 3,
		  title: "Chill Drinks",
		 
		},
		{
		  id: 4,
		  title: "Sweet Cravings",
		  
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
	
	export const mostLovedItems = {
	   title: "Most Loved Dishes",
  	   subtitle: "Discover the dishes our customers keep coming back for."
	};

	{/* How it Works */}

	export const steps = [
			{
			id: 1,
			step: "01",
			icon: <FaUtensils />,
			title: "Choose Your Food",
			desc: "Explore our delicious menu and pick your favorite meals, snacks, and drinks in just a few clicks.",
			},
			{
			id: 2,
			step: "02",
			icon: <FaKitchenSet />,
			title: "We Prepare It Fresh",
			desc: "Once you place your order, our kitchen starts preparing your food fresh with quality ingredients and care.",
			},
			{
			id: 3,
			step: "03",
			icon: <FaMotorcycle />,
			title: "Fast Delivery",
			desc: "Our delivery team brings your order hot and fresh right to your doorstep in the shortest time possible.",
			},
		];

	export const Testomonial = [
				{
					id:1,
					testimonialName:"Rahul Rajput",
					image:"assets/images/our_team_img1.png",
					review:"Absolutely loved the burger and fries. Delivery was super quick and food arrived hot.",
					rating:4,
				},
				{
					id:2,
					testimonialName:"Mohit Gautam",
					image:"assets/images/our_team_img2.png",
					review:"The pizza was cheesy, fresh, and full of flavor. One of the best online food experiences.",
					rating:5,
				},
				{
					id:3,
					testimonialName:"Himanshu Singh",
					image:"assets/images/our_team_img3.png",
					review:"FoodieHub made my dinner so easy. Great taste, great service, and smooth ordering process",
					rating:4,
				},
			];
		
	export const faqs = [
		{
		  id: 1,
		  question: "How long does delivery take?",
		  answer:"We usually deliver your order within 25 to 35 minutes depending on your location, traffic, and order size.",
		},
		{
		  id: 2,
		  question: "Do you offer cash on delivery?",
		  answer:"Yes, we offer cash on delivery as well as secure online payment options for your convenience.",
		},
		{
		  id: 3,
		  question: "Can I track my order in real time?",
		  answer:"Yes, once your order is confirmed, you can track its delivery progress in real time.",
		},
		{
		  id: 4,
		  question: "Are your ingredients fresh?",
		  answer:"Absolutely. We use fresh and quality ingredients to prepare every order with care and great taste.",
		},
		{
		  id: 5,
		  question: "Do you offer discounts or special deals?",
		  answer:"Yes, we regularly offer combo deals, discounts, and limited-time food offers on selected menu items.",
		},
	  ];