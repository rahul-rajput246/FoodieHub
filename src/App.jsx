import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import Cart from "./pages/Cart";
import CheckOut from "./pages/CheckOut";
import ScrollToHash from "./components/ScrollToHash";
import OrderSuccess from "./pages/OrderSuccess";

import axios from "axios";
import { API_BASE_URL } from "./config";

axios.defaults.baseURL = API_BASE_URL;
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

function App() {

  const [user, setUser] = useState(null);
  
  const [wishList, setWishList] = useState([]);
const [wishlistItems, setWishlistItems] = useState([]);

useEffect(() => {
  const fetchUser = async () => {
    try {
      const res = await axios.get("/api/user");
      setUser(res.data);
    } catch {
      setUser(null);
    }
  };

  fetchUser();
}, []);

  const getCookieValue = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return decodeURIComponent(parts.pop().split(';').shift());
    }
  };

  useEffect(() => {
  axios.get("/sanctum/csrf-cookie");
}, []);

  const [foodItems, setFoodItems] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/food-data`, {
      headers: { Accept: "application/json" }
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((result) => {
        setFoodItems(result.data || []);
      })
      .catch((error) => {
        console.log("Error Fetching food-data API:", error);
      });
  }, []);


  const [cartItems, setCartItems] = useState(() => {
    const savedItems = localStorage.getItem("foodCart");
    return savedItems ? JSON.parse(savedItems) : [];
  });

 const add_cart = async (id) => {
  const product = foodItems.find((item) => item.id === id);
  if (!product) return;

  try {
    await axios.post("/api/cart/add", {
      food_item_id: product.id,
      quantity: 1,
    });

    fetchCart();
  } catch (error) {
    console.error(error);
  }
};


  useEffect(() => {
    localStorage.setItem("foodCart", JSON.stringify(cartItems));
  }, [cartItems])

  const plus_cart = (id) => {
    const newCart = cartItems.map((item) =>
      item.id === id ? { ...item, qty: item.qty + 1 } : item
    );
    setCartItems(newCart);
  };

  const minus_cart = (id) => {
    const cartItem = cartItems.find((item) => item.id === id);

    if (!cartItem) return;

    if (cartItem.qty === 1) {
      const updatedCart = cartItems.filter((item) => item.id !== id);
      setCartItems(updatedCart);
    } else {
      const updatedCart = cartItems.map((item) =>
        item.id === id ? { ...item, qty: item.qty - 1 } : item
      );
      setCartItems(updatedCart);
    }
  };

 const totalQty = cartItems.reduce((total, item) => total + item.qty, 0);


  // Add to wishlist

 const addToWishlist = async (foodId) => {
  try {
    await axios.post("/api/wishlist/add", {
      food_item_id: foodId,
    });
    fetchWishlist();
  } catch (error) {
    console.error(error);
  }
};

const fetchWishlist = async () => {
  try {
    const res = await axios.get("/api/wishlist");
    setWishlistItems(res.data.wishlistItems || []);
    setWishList((res.data.wishlistItems || []).map(i => i.food_item_id));
  } catch (error) {
    console.error(error);
  }
};

const removeFromWishlist = async (foodId) => {
  const item = wishlistItems.find(i => i.food_item_id === foodId);
  if (!item) return;

  try {
    await axios.delete(`/api/wishlist/remove/${item.id}`);
    fetchWishlist();
  } catch (error) {
    console.error(error);
  }
};

  const fetchCart = async () => {
    try {
      const res = await axios.get("/api/cart");
      const data = res.data;
      if (data.success) {
        const formattedCart = data.cartItems.map((item) => ({
          id: item.food_item_id,
          qty: item.quantity,
        }));
        setCartItems(formattedCart);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchWishlist();
      fetchCart();
    }
  }, [user]);


  return (
    <>
      <ScrollToHash />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              addToCart={cartItems}
              add_cart={add_cart}
              plus_cart={plus_cart}
              minus_cart={minus_cart}
              wishList={wishList}
              addToWishlist={addToWishlist}
              removeFromWishlist={removeFromWishlist}
              foodItems={foodItems}
              user={user} 
              totalQty={totalQty}
            />
          }
        />

        <Route
          path="/home"
          element={
            <Home
              addToCart={cartItems}
              add_cart={add_cart}
              plus_cart={plus_cart}
              minus_cart={minus_cart}
              wishList={wishList}
              addToWishlist={addToWishlist}
              removeFromWishlist={removeFromWishlist}
              foodItems={foodItems}
              user={user} 
              totalQty={totalQty}
            />
          }
        />

        <Route
          path="/menu"
          element={
            <Menu
              addToCart={cartItems}
              add_cart={add_cart}
              plus_cart={plus_cart}
              minus_cart={minus_cart}
              wishList={wishList}
              addToWishlist={addToWishlist}
              removeFromWishlist={removeFromWishlist}
              foodItems={foodItems}
              user={user} 
              totalQty={totalQty}
            />
          }
        />

        <Route path="/about"
          element={<About
            addToCart={cartItems}
            add_cart={add_cart}
            plus_cart={plus_cart}
            minus_cart={minus_cart}
            wishList={wishList}
            addToWishlist={addToWishlist}
            removeFromWishlist={removeFromWishlist}
            foodItems={foodItems}
            user={user} 
            totalQty={totalQty}
          />}>
        </Route>

        <Route path="/contact" element={<ContactUs
          addToCart={cartItems}
          add_cart={add_cart}
          plus_cart={plus_cart}
          minus_cart={minus_cart}
          wishList={wishList}
          addToWishlist={addToWishlist}
          removeFromWishlist={removeFromWishlist}
          foodItems={foodItems}
          totalQty={totalQty}
          user={user} 
        />}>
        </Route>

        <Route
          path="/cart"
          element={
            <Cart
              addToCart={cartItems}
              plus_cart={plus_cart}
              minus_cart={minus_cart}
              add_cart={add_cart}
              // totalQty={totalQty}
              foodItems={foodItems}
              user={user} 
            />
          }
        />

        <Route
          path="/checkout"
          element={
            <CheckOut
              addToCart={cartItems}
              //totalQty={totalQty}
              setAddToCart={setCartItems}
              foodItems={foodItems}
              plus_cart={plus_cart}
              minus_cart={minus_cart}
              add_cart={add_cart}
              user={user} 
            />

          }
        />

        <Route
          path="/order-success"
          element={
            <OrderSuccess user={user} />
          }
        />

      </Routes>
    </>
  );
}

export default App;