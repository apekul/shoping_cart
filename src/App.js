import React, { useEffect, useState } from "react";
import { Context, FavContext } from "./context";
import ItemList from "./Components/DIsplay/ItemList";
import Navbar from "./Components/Nav/Navbar";
import Footer from "./Components/Footer/Footer";
import Cart from "./Components/Cart/Cart";
import Fav from "./Components/Favourite/Fav";
import SingleItemPage from "./Components/DIsplay/SingleItemPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [cartItems, setCartItems] = useState((v) => {
    let storage = localStorage.getItem("cart");
    return storage ? JSON.parse(storage).cartItems : [];
  });
  const [favItems, setFavItems] = useState((v) => {
    let storage = localStorage.getItem("cart");
    return storage ? JSON.parse(storage).favItems : [];
  });

  useEffect(() => {
    let storage = localStorage.getItem("cart");
    if (!storage) {
      localStorage.setItem(
        "cart",
        JSON.stringify({
          filter: {
            type: [],
            price: { min: "", max: "" },
            popularity: "",
          },
          cartItems,
          favItems,
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let storage = JSON.parse(localStorage.getItem("cart"));
    const new_storage = { ...storage, cartItems };
    localStorage.setItem("cart", JSON.stringify(new_storage));
  }, [cartItems]);

  useEffect(() => {
    let storage = JSON.parse(localStorage.getItem("cart"));
    const new_storage = { ...storage, favItems };
    localStorage.setItem("cart", JSON.stringify(new_storage));
  }, [favItems]);

  return (
    <Router>
      <Context.Provider value={[cartItems, setCartItems]}>
        <FavContext.Provider value={[favItems, setFavItems]}>
          <div className="flex flex-col items-center justify-between">
            <Navbar />
            <Routes>
              <Route path="/" element={<ItemList />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/favourite" element={<Fav />} />
              <Route path="/item/:id" element={<SingleItemPage />} />
            </Routes>
            <Footer />
          </div>
        </FavContext.Provider>
      </Context.Provider>
    </Router>
  );
}

export default App;
