// Default page data fallbacks to eliminate visual flashes and loading spinners during page transitions

export const DEFAULT_HOME_DATA = {
  content: {
    home_banner: {
      subtitle: "Fastest Food Delivery Items",
      title1: "Be The Quickest",
      title2: "In Your Food",
      color_title: "Delivery",
      desc: "From kitchen to your door — hot, fresh & lightning fast. Order your favorite meals anytime with FoodieHub.",
      btn_text1: "Shop Now",
      btn_url1: "/cart",
      btn_text2: "Explore Menu",
      btn_url2: "/menu",
      image: "uploads/mPr2uVt3rUQYGNir95aDX01hfEqsm6SnsidUmci4.png",
    },
    home_wcu: {
      home_wcu_title: "Experience the Best Food Service",
      home_wcu_subtitle: "We deliver more than just food — we deliver experience",
      items: [
        { title: "Fast Delivery", desc: "Get your food delivered quickly and always fresh. We make sure your cravings are satisfied without delay.", icon: "Delivery" },
        { title: "Fresh Ingredients", desc: "We use only high-quality and fresh ingredients. Every dish is prepared with care and hygiene.", icon: "Fresh" },
        { title: "Easy Payment", desc: "Enjoy a smooth and secure checkout process. Multiple payment options for your convenience.", icon: "Payment" },
        { title: "Expert Chefs", desc: "Every dish is crafted by experienced chefs with passion, hygiene, and authentic recipes.", icon: "ExpertChefs" }
      ]
    },
    home_hiw: {
      home_hiw_subtitle: "Simple Process",
      home_hiw_title: "How It Works",
      home_hiw_desc: "From selecting your favorite dishes to fast doorstep delivery, FoodieHub makes ordering food simple, quick, and satisfying.",
      home_hiw_btn_text: "Explore Menu",
      home_hiw_btn_url: "/menu",
      items: [
        { title: "Choose Your Food", desc: "Explore our delicious menu and pick your favorite meals, snacks, and drinks in just a few clicks.", icon: "Choose", step: "01" },
        { title: "We Prepare It Fresh", desc: "Once you place your order, our kitchen starts preparing your food fresh with quality ingredients and care.", icon: "Fresh", step: "02" },
        { title: "Fast Delivery", desc: "Our delivery team brings your order hot and fresh right to your doorstep in the shortest time possible.", icon: "fastDelivery", step: "03" }
      ]
    },
    home_specialOffer: {
      home_offer_subtitle: "Limited Time Offer",
      home_offer_title: "Get 30% Off On Your First Order",
      home_offer_desc: "Enjoy your favorite meals at a discounted price. Fresh, delicious, and delivered right to your doorstep.",
      home_offer_btn_text: "Order Now",
      home_offer_btn_url: "/cart",
      image: "uploads/yqwA3RyUMhPmQTGt8WGJEOFQWYGtsByDofqUMnyR.jpg"
    },
    home_testom: {
      home_testi_subtitle: "Testimonials",
      home_testi_title: "Loved By Food Lovers",
      items: [
        { desc: "Absolutely loved the burger and fries. Delivery was super quick and food arrived hot.", rating: 5, name: "Rahul Rajput", emotion: "This is Great..!!", image: "uploads/VjxXGGXRFkpmVXiFAhvJICYG9ZX6pIBi8SyMpnZj.jpg" },
        { desc: "The pizza was cheesy, fresh, and full of flavor. One of the best online food experiences.", rating: 4, name: "Mohit Sharma", emotion: "Dishes is literally Awsome..!!", image: "uploads/rCOvjeaUsP0K8O5CdywoksY6xsvnyoTlXI0fR5nt.jpg" },
        { desc: "FoodieHub made my dinner so easy. Great taste, great service, and smooth ordering process", rating: 5, name: "Himanshu Singh", emotion: "Great taste ever i tasted..!!", image: "uploads/uX4P9fwrFZfSGTsUfXFaLgl8Hdc4wCAbX8Zfk5MP.jpg" }
      ]
    },
    home_faq: {
      home_faq_subtitle: "Help & Support",
      home_faq_title: "Frequently Asked Questions",
      home_faq_desc: "Got questions about delivery, payments, or food quality? We've answered the most common things here to make your ordering experience smooth and easy.",
      home_faq_btn_text: "Contact Us",
      home_faq_btn_link: "/contact",
      items: [
        { question: "How long does delivery take?", answer: "We usually deliver your order within 25 to 35 minutes depending on your location, traffic, and order size." },
        { question: "Do you offer cash on delivery?", answer: "Yes, we offer cash on delivery as well as secure online payment options for your convenience." },
        { question: "Can I track my order in real time?", answer: "Yes, once your order is confirmed, you can track its delivery progress in real time." },
        { question: "Are your ingredients fresh?", answer: "Absolutely. We use fresh and quality ingredients to prepare every order with care and great taste." },
        { question: "Do you offer discounts or special deals?", answer: "Yes, we regularly offer combo deals, discounts, and limited-time food offers on selected menu items." }
      ]
    }
  }
};

export const DEFAULT_ABOUT_DATA = {
  content: {
    about_banner: {
      subtitle: "Know More About Us",
      title1: "We Deliver More",
      title2: "Than Just",
      color_title: "Food",
      desc: "At FoodieHub, we bring people together through great food. Fresh ingredients, fast delivery, and flavors you'll love — every time.",
      btn_text1: "Order Now",
      btn_url1: "/cart",
      btn_text2: "Contact Us",
      btn_url2: "/contact",
      image: "uploads/SDiAfHcJ0AeUhHQhalD3dDQ6qMX0DgubGbTDhimS.jpg",
    },
    about_our_story: {
      subtitle: "Our Story",
      title: "Bringing Delicious Food To Your Doorstep",
      desc1: "FoodieHub started with a simple idea — to make delicious, restaurant-quality food accessible to everyone. We believe food is not just about taste, it's about experience.",
      desc2: "From fresh ingredients to fast delivery, our mission is to serve happiness in every bite. Whether it's fast food or traditional flavors, we've got something for everyone.",
      btn_text: "Explore Menu",
      btn_url: "/menu",
      image: "uploads/2u9QJM6ipssmf5BaqKzx7uxnwWStIkHuXwD4flK6.jpg",
    },
    about_special: {
      subtitle: "What We Serve",
      title: "Our Specialities",
      desc: "From spicy desi meals to sweet desserts, FoodieHub brings all your favorite flavors together in one place.",
      items: [
        { box_title: "Fast Food", box_desc: "Crispy, cheesy, and loaded with flavor — perfect for your quick cravings.", image: "uploads/ILaUjLQUVtelUamTSNn9uxtZsWRL92iOHeDjCXLs.jpg" },
        { box_title: "Desi Tadka", box_desc: "Authentic Indian flavors made with rich spices and homely love.", image: "uploads/PCjk28QXlX2Usx5OnjS84NVOvuy15I8wC9rqFVXc.jpg" },
        { box_title: "Chill Drinks", box_desc: "Refreshing beverages and cool sips to complete every meal.", image: "uploads/GHS4odt6WOnMggFGSp6FBhNB7RNLOOVXGVcoTXmO.jpg" },
        { box_title: "Sweet Cravings", box_desc: "Delightful desserts and sweets that make every ending perfect.", image: "uploads/rZU6Arx8Qiw7HzRG0DRe0oC7jiTzP1GP2mGlov1u.jpg" }
      ]
    },
    aboutOffer: {
      subtitle: "Ready To Order?",
      title: "Ready To Order?",
      desc: "Fresh flavors, quick delivery, and your favorite dishes are waiting for you. Order now and enjoy the FoodieHub experience.",
      btn_text1: "Order Now",
      btn_url1: "/cart",
      btn_text2: "Explore Menu",
      btn_url2: "/menu"
    }
  }
};

export const DEFAULT_MENU_DATA = {
  content: {
    menu_banner: {
      subtitle: "Fresh, hot & made with love",
      title1: "Be The Quickest",
      title2: "In Your Food",
      color_title: "Delivery",
      desc: "From cheesy pizzas to juicy burgers and refreshing drinks, discover a wide variety of Tasty dishes crafted just for you.",
      btn_text1: "Shop Now",
      btn_url1: "/cart",
      btn_text2: "Explore Menu",
      btn_url2: "/menu",
      image: "uploads/XFo7KKJ2Vc9GdySQrBAXXAu0uKUDsK1XFTuxyMGr.jpg",
    }
  }
};

export const DEFAULT_CONTACT_DATA = {
  content: {
    contact_banner: {
      subtitle: "Get In Touch",
      title1: "We'd Love To Hear",
      title2: "From You",
      color_title: "FoodieHub Support",
      desc: "Have questions about your order, menu, or delivery? Our team is here to help you anytime.",
      btn_text1: "Explore Menu",
      btn_url1: "/menu",
      btn_text2: "Call Now",
      btn_url2: "/contact#contact-form",
      image: "uploads/7iFzYubLCuNzW1d4zlRbDb9bceSUzbFATeL8xB49.jpg",
    },
    contact_info: {
      items: [
        { title: "Our Location", subtitle: "Phase 7 Mohali, Chandigarh", icon: "location" },
        { title: "Call Us", subtitle: "+91 6284229435", icon: "contact" },
        { title: "Email Us", subtitle: "support@foodiehub.com", icon: "email" },
        { title: "Opening Hours", subtitle: "10:00 AM - 11:00 PM", icon: "timing" }
      ]
    },
    contact_form: {
      subtitle: "Contact Us",
      title: "Let's Start a",
      color_title: "Conversation",
      desc: "Got a question, food request, or feedback? We're always ready to hear from you and help you out.",
      point1: "Quick response from our team",
      point2: "Easy support for orders & queries",
      point3: "Friendly service with FoodieHub style",
      btn_text: "Send Message",
      btn_url: "#"
    },
    contact_visit: {
      subtitle: "Visit Us",
      title: "Come & Enjoy Food With Us",
      desc: "Stop by our place for fresh flavors, quick service, and a warm FoodieHub experience.",
      locationTitle: "Location",
      locationSubtitle: "Phase 7 Mohali , Chandigarh",
      timingTitle: "Opening Hours",
      timingSubtitle: "10:00 AM - 11:00 PM",
      contactTitle: "Contact",
      contactSubtitle: "+91 6284229435",
      btn_text: "Get Directions",
      btn_url: "#"
    }
  }
};
