import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Category from "./pages/Category";

function App() {

  const [addToCart, setAddToCart] = useState(() => {
      const savedItmes = localStorage.getItem("foodCart");
      return savedItmes ? JSON.parse(savedItmes) : [];  
  });

  const add_cart = (id) => {
    const cartItem = addToCart.find((item) => item.id === id);

    if (cartItem) {
      const newCart = addToCart.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      );
      setAddToCart(newCart);
    } else {
      setAddToCart([...addToCart, { id: id, qty: 1 }]);
    }
  };

  useEffect(() => {
    localStorage.setItem("foodCart" , JSON.stringify(addToCart));
  }, [addToCart])

  const plus_cart = (id) => {
    const newCart = addToCart.map((item) =>
      item.id === id ? { ...item, qty: item.qty + 1 } : item
    );
    setAddToCart(newCart);
  };

  const minus_cart = (id) => {
    const cartItem = addToCart.find((item) => item.id === id);

    if (!cartItem) return;

    if (cartItem.qty === 1) {
      const updatedCart = addToCart.filter((item) => item.id !== id);
      setAddToCart(updatedCart);
    } else {
      const updatedCart = addToCart.map((item) =>
        item.id === id ? { ...item, qty: item.qty - 1 } : item
      );
      setAddToCart(updatedCart);
    }
  };

  {/* whishList section */}

  const [wishList, setWishList] = useState(() => {
    const saveWishlist = localStorage.getItem("foodWishlist");
    return saveWishlist ? JSON.parse(saveWishlist) : [];
  });

  const wish = (id) => {
    if (wishList.includes(id)) {
      setWishList(wishList.filter((item) => item !== id));
    } else {
      setWishList([...wishList, id]);
    }
  };

  useEffect(() => {
      localStorage.setItem("foodWishlist" , JSON.stringify(wishList));
  },[wishList])

  const totalQty = addToCart.reduce((total, item) => total + item.qty, 0);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home
            addToCart={addToCart}
            add_cart={add_cart}
            plus_cart={plus_cart}
            minus_cart={minus_cart}
            wish={wish}
            wishList={wishList}
            totalQty={totalQty}
          />
        }
      />

      <Route
        path="/home"
        element={
          <Home
            addToCart={addToCart}
            add_cart={add_cart}
            plus_cart={plus_cart}
            minus_cart={minus_cart}
            wish={wish}
            wishList={wishList}
            totalQty={totalQty}
          />
        }
      />

      <Route
        path="/menu"
        element={
          <Menu
            addToCart={addToCart}
            add_cart={add_cart}
            plus_cart={plus_cart}
            minus_cart={minus_cart}
            wish={wish}
            wishList={wishList}
            totalQty={totalQty}
          />
        }
      />

      <Route 
        path="/category"
        element={<Category />}
      />

      <Route
        path="/cart"
        element={
          <Cart
            addToCart={addToCart}
            plus_cart={plus_cart}
            minus_cart={minus_cart}
            totalQty={totalQty}
          />
        }
      />
    </Routes>
  );
}

export default App;