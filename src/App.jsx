import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";

function App() {
  const [addToCart, setAddToCart] = useState([]);

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
            totalQty={totalQty}
          />
        }
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