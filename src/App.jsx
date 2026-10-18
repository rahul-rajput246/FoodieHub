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
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import CustomiseItemModal from "./components/CustomiseItemModal";

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

  const _getCookieValue = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return decodeURIComponent(parts.pop().split(';').shift());
    }
  };

  useEffect(() => {
    if (!document.cookie.includes("XSRF-TOKEN")) {
      axios.get("/sanctum/csrf-cookie").catch(() => {});
    }
  }, []);

  const [foodItems, setFoodItems] = useState(() => {
    try {
      const cached = localStorage.getItem("foodItemsCache");
      return cached ? JSON.parse(cached) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/food-data`, {
      headers: { Accept: "application/json" }
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((result) => {
        const items = result.data || [];
        setFoodItems(items);
        try {
          localStorage.setItem("foodItemsCache", JSON.stringify(items));
        } catch (e) {
          console.warn("Could not cache food items:", e);
        }
      })
      .catch((error) => {
        console.log("Error Fetching food-data API:", error);
      });
  }, []);

  // Background prefetch for secondary pages (About, Menu, Contact) to make page navigation instant
  useEffect(() => {
    const prefetchTimer = setTimeout(() => {
      const prefetchPages = ["about", "menu", "contact"];
      prefetchPages.forEach((page) => {
        const cacheKey = `${page}DataCache`;
        if (!localStorage.getItem(cacheKey)) {
          fetch(`${API_BASE_URL}/api/home-data/${page}`)
            .then((r) => r.json())
            .then((d) => {
              if (d.data) {
                localStorage.setItem(cacheKey, JSON.stringify(d.data));
              }
            })
            .catch(() => {});
        }
      });
    }, 1500);

    return () => clearTimeout(prefetchTimer);
  }, []);


  const [customiseItem, setCustomiseItem] = useState(null);

  const [cartItems, setCartItems] = useState(() => {
    const savedItems = localStorage.getItem("foodCart");
    return savedItems ? JSON.parse(savedItems) : [];
  });

  const openCustomise = (product) => {
    setCustomiseItem(product);
  };

  const add_customized_cart = async (customized) => {
    const { id, cart_key, qty, selected_variation, selected_addons, item_price, food_item } = customized;
    const product =
      foodItems.find((item) => String(item.id) === String(id)) || food_item;
    if (!product) return;

    const unitPrice = item_price !== undefined ? Number(item_price) : Number(product.food_price);
    const key = cart_key || `item_${product.id}`;
    const addQuantity = qty || 1;

    if (user) {
      try {
        await axios.post("/api/cart/add", {
          food_item_id: product.id,
          quantity: addQuantity,
          cart_key: key,
          selected_variation: selected_variation || null,
          selected_addons: selected_addons || null,
          item_price: unitPrice,
        });
        await fetchCart();
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    } else {
      const existingIndex = cartItems.findIndex(
        (item) => (item.cart_key ? item.cart_key === key : String(item.id) === String(id))
      );

      if (existingIndex > -1) {
        setCartItems(
          cartItems.map((item, idx) =>
            idx === existingIndex
              ? { ...item, qty: item.qty + addQuantity }
              : item
          )
        );
      } else {
        setCartItems([
          ...cartItems,
          {
            id: product.id,
            cart_key: key,
            qty: addQuantity,
            selected_variation: selected_variation || null,
            selected_addons: selected_addons || null,
            item_price: unitPrice,
            food_item: product,
          },
        ]);
      }
    }
  };

  const add_cart = async (idOrProduct) => {
    const product =
      typeof idOrProduct === "object"
        ? idOrProduct
        : foodItems.find((item) => item.id === idOrProduct);

    if (!product) return;

    // If item has customizations, open modal instead of adding directly
    if (
      product.has_customizations ||
      (Array.isArray(product.variations) && product.variations.length > 0) ||
      (Array.isArray(product.addons) && product.addons.length > 0)
    ) {
      setCustomiseItem(product);
      return;
    }

    await add_customized_cart({
      id: product.id,
      cart_key: `item_${product.id}`,
      qty: 1,
      selected_variation: null,
      selected_addons: null,
      item_price: Number(product.food_price),
      food_item: product,
    });
  };

  useEffect(() => {
    localStorage.setItem("foodCart", JSON.stringify(cartItems));
  }, [cartItems]);

  const plus_cart = async (keyOrId) => {
    const cartItem = cartItems.find(
      (item) => (item.cart_key && item.cart_key === keyOrId) || item.id === keyOrId
    );
    if (!cartItem) return;

    const targetKey = cartItem.cart_key || cartItem.id;
    const newQty = cartItem.qty + 1;

    setCartItems((prev) =>
      prev.map((item) =>
        (item.cart_key && item.cart_key === targetKey) ||
        (!item.cart_key && item.id === targetKey)
          ? { ...item, qty: newQty }
          : item
      )
    );

    if (user) {
      try {
        await axios.post(`/api/cart/update/${targetKey}`, { quantity: newQty });
      } catch (error) {
        console.error("Error updating cart:", error);
        fetchCart();
      }
    }
  };

  const minus_cart = async (keyOrId) => {
    const cartItem = cartItems.find(
      (item) => (item.cart_key && item.cart_key === keyOrId) || item.id === keyOrId
    );
    if (!cartItem) return;

    const targetKey = cartItem.cart_key || cartItem.id;

    if (cartItem.qty === 1) {
      setCartItems((prev) =>
        prev.filter((item) =>
          item.cart_key ? item.cart_key !== targetKey : item.id !== targetKey
        )
      );

      if (user) {
        try {
          await axios.delete(`/api/cart/remove/${targetKey}`);
        } catch (error) {
          console.error("Error removing from cart:", error);
          fetchCart();
        }
      }
    } else {
      const newQty = cartItem.qty - 1;
      setCartItems((prev) =>
        prev.map((item) =>
          (item.cart_key && item.cart_key === targetKey) ||
          (!item.cart_key && item.id === targetKey)
            ? { ...item, qty: newQty }
            : item
        )
      );

      if (user) {
        try {
          await axios.post(`/api/cart/update/${targetKey}`, { quantity: newQty });
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
          cart_key: item.cart_key || `item_${item.food_item_id}`,
          selected_variation: item.selected_variation,
          selected_addons: item.selected_addons,
          item_price:
            item.item_price !== null && item.item_price !== undefined
              ? Number(item.item_price)
              : item.food
              ? Number(item.food.food_price)
              : 0,
          cart_item_id: item.id,
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
              openCustomise={openCustomise}
              add_customized_cart={add_customized_cart}
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
              openCustomise={openCustomise}
              add_customized_cart={add_customized_cart}
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
              openCustomise={openCustomise}
              add_customized_cart={add_customized_cart}
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

        <Route
          path="/privacy-policy"
          element={
            <PrivacyPolicy user={user} totalQty={totalQty} />
          }
        />

        <Route
          path="/terms"
          element={
            <TermsAndConditions user={user} totalQty={totalQty} />
          }
        />

        <Route
          path="/terms-and-conditions"
          element={
            <TermsAndConditions user={user} totalQty={totalQty} />
          }
        />

      </Routes>

      {customiseItem && (
        <CustomiseItemModal
          key={customiseItem.id}
          isOpen={!!customiseItem}
          item={customiseItem}
          onClose={() => {
            setCustomiseItem(null);
            document.body.style.removeProperty("overflow");
          }}
          onAddToCart={add_customized_cart}
        />
      )}
    </>
  );
}

export default App;