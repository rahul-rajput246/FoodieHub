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
import TrackOrder from "./pages/TrackOrder";

import axios from "axios";
import { API_BASE_URL } from "./config";

axios.defaults.baseURL = API_BASE_URL;
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

function App() {

  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  
  const [wishList, setWishList] = useState(() => {
    const savedWishlist = localStorage.getItem("foodWishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });
  const [wishlistItems, setWishlistItems] = useState([]);

useEffect(() => {
  const fetchUser = async () => {
    try {
      const res = await axios.get("/api/user");
      setUser(res.data);
    } catch {
      setUser(null);
    } finally {
      setAuthLoading(false);
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

    if (user) {
      try {
        await axios.post("/api/cart/add", {
          food_item_id: product.id,
          quantity: 1,
        });
        await fetchCart();
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    } else {
      const existing = cartItems.find((item) => item.id === id);
      if (existing) {
        setCartItems(
          cartItems.map((item) =>
            item.id === id ? { ...item, qty: item.qty + 1 } : item
          )
        );
      } else {
        setCartItems([...cartItems, { id: product.id, qty: 1 }]);
      }
    }
  };

  useEffect(() => {
    localStorage.setItem("foodCart", JSON.stringify(cartItems));
  }, [cartItems]);

  const plus_cart = async (id) => {
    const cartItem = cartItems.find((item) => item.id === id);
    const newQty = (cartItem ? cartItem.qty : 0) + 1;

    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, qty: newQty } : item))
    );

    if (user) {
      try {
        await axios.post(`/api/cart/update/${id}`, { quantity: newQty });
      } catch (error) {
        console.error("Error updating cart:", error);
        fetchCart();
      }
    }
  };

  const minus_cart = async (id) => {
    const cartItem = cartItems.find((item) => item.id === id);
    if (!cartItem) return;

    if (cartItem.qty === 1) {
      setCartItems((prev) => prev.filter((item) => item.id !== id));

      if (user) {
        try {
          await axios.delete(`/api/cart/remove/${id}`);
        } catch (error) {
          console.error("Error removing from cart:", error);
          fetchCart();
        }
      }
    } else {
      const newQty = cartItem.qty - 1;
      setCartItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, qty: newQty } : item))
      );

      if (user) {
        try {
          await axios.post(`/api/cart/update/${id}`, { quantity: newQty });
        } catch (error) {
          console.error("Error updating cart:", error);
          fetchCart();
        }
      }
    }
  };

 const totalQty = cartItems.reduce((total, item) => total + item.qty, 0);


  // Save guest wishlist to localStorage when not logged in
  useEffect(() => {
    if (!user) {
      localStorage.setItem("foodWishlist", JSON.stringify(wishList));
    }
  }, [wishList, user]);

  // Add to wishlist
  const addToWishlist = async (foodId) => {
    if (user) {
      try {
        await axios.post("/api/wishlist/add", {
          food_item_id: foodId,
        });
        fetchWishlist();
      } catch (error) {
        console.error("Error adding to wishlist:", error);
        if (error.response?.status === 401) {
          setUser(null);
          setWishList((prev) => (prev.includes(foodId) ? prev : [...prev, foodId]));
        }
      }
    } else {
      setWishList((prev) => {
        if (prev.includes(foodId)) return prev;
        const updated = [...prev, foodId];
        localStorage.setItem("foodWishlist", JSON.stringify(updated));
        return updated;
      });
    }
  };

  const fetchWishlist = async () => {
    try {
      const res = await axios.get("/api/wishlist");
      setWishlistItems(res.data.wishlistItems || []);
      setWishList((res.data.wishlistItems || []).map((i) => i.food_item_id));
    } catch (error) {
      if (error.response?.status === 401) {
        setUser(null);
      } else {
        console.error("Error fetching wishlist:", error);
      }
    }
  };

  const removeFromWishlist = async (foodId) => {
    if (user) {
      const item = wishlistItems.find((i) => i.food_item_id === foodId);
      const targetId = item ? item.id : foodId;

      try {
        await axios.delete(`/api/wishlist/remove/${targetId}`);
        fetchWishlist();
      } catch (error) {
        console.error("Error removing from wishlist:", error);
        if (error.response?.status === 401) {
          setUser(null);
          setWishList((prev) => prev.filter((id) => id !== foodId));
        }
      }
    } else {
      setWishList((prev) => {
        const updated = prev.filter((id) => id !== foodId);
        localStorage.setItem("foodWishlist", JSON.stringify(updated));
        return updated;
      });
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
      if (error.response?.status === 401) {
        setUser(null);
      } else {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    if (user) {
      const savedGuestWishlist = localStorage.getItem("foodWishlist");
      if (savedGuestWishlist) {
        try {
          const guestIds = JSON.parse(savedGuestWishlist);
          if (Array.isArray(guestIds) && guestIds.length > 0) {
            Promise.allSettled(
              guestIds.map((id) =>
                axios.post("/api/wishlist/add", { food_item_id: id })
              )
            ).finally(() => {
              localStorage.removeItem("foodWishlist");
              fetchWishlist();
            });
          }
        } catch {
          localStorage.removeItem("foodWishlist");
        }
      }
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
              totalQty={totalQty}
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
              totalQty={totalQty}
              setAddToCart={setCartItems}
              foodItems={foodItems}
              plus_cart={plus_cart}
              minus_cart={minus_cart}
              add_cart={add_cart}
              user={user}
              authLoading={authLoading}
            />

          }
        />

        <Route
          path="/order-success"
          element={
            <OrderSuccess user={user} />
          }
        />

        <Route
          path="/track-order"
          element={
            <TrackOrder user={user} totalQty={totalQty} />
          }
        />

        <Route
          path="/track-order/:orderId"
          element={
            <TrackOrder user={user} totalQty={totalQty} />
          }
        />

      </Routes>
    </>
  );
}

export default App;