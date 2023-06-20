import React, { useState, useEffect, useContext } from "react";
import { Context, FavContext } from "../../context";
import { FaStar, FaStarHalf, FaCartPlus } from "react-icons/fa";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

import FilterPanel from "./FilterPanel";
// import { Products } from "../../assets/objects";

const ItemList = () => {
  const [items, setItems] = useState();
  const [showButton, setShowButton] = useState(undefined);
  const [types, setTypes] = useState();
  const [filter, setFilter] = useState((v) => {
    let storage = localStorage.getItem("cart");
    return storage
      ? JSON.parse(storage).filter
      : {
          type: [],
          price: { min: "", max: "" },
          popularity: "",
        };
  });

  // Context update
  const [favItems, setFavItems] = useContext(FavContext);
  const [cartItems, setCartItems] = useContext(Context);
  const updateCartItems = (v) => {
    if (cartItems.some((e) => e.id === v.id)) {
      return console.log("in cart");
    }
    return setCartItems((prev) => [...prev, v]);
  };

  const addFavItem = (value) => {
    if (favItems.some((e) => e.id === value.id)) {
      let newFav = favItems.filter((x) => x.id !== value.id);
      return setFavItems(newFav);
    }
    return setFavItems((prev) => [...prev, value]);
  };

  const filterItems = () => {
    let result = items;
    if (filter.type.length > 0) {
      result = result.filter((x) => filter.type.includes(x.category));
    }
    if (filter.price.min || filter.price.max) {
      result = result.filter(
        (x) => x.price <= filter.price.max && x.price >= filter.price.min
      );
    }
    if (filter.popularity !== "") {
      let sort = result.sort((a, b) => a.rating - b.rating);
      if (filter.popularity === true) {
        result = sort;
      } else {
        result = sort.reverse();
      }
    }
    return result;
  };

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((json) => {
        let itemTypes = [];
        for (let element of json.products) {
          let query = element.category;
          if (!itemTypes.includes(query)) {
            itemTypes.push(query);
          }

          setTypes(itemTypes);
        }

        return setItems(json.products);
      });
  }, []);

  useEffect(() => {
    let storage = JSON.parse(localStorage.getItem("cart"));
    const new_storage = { ...storage, filter: filter };
    if (Object.keys(new_storage).length > 1) {
      localStorage.setItem("cart", JSON.stringify(new_storage));
    }
  }, [filter]);

  return (
    <div className="h-full min-h-screen flex flex-col items-center justify-start w-full md:w-full xl:w-2/3 md:m-auto max-w-screen-2xl">
      {/* Filter tab */}
      <FilterPanel
        setFilter={setFilter}
        types={types}
        filter={filter}
        items={items}
      />
      <ul className="mt-6 grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 xl:gap-x-8 ">
        {items && filterItems().length > 0 ? (
          filterItems().map((item, index) => (
            <li
              key={index}
              className=" relative w-36 mx-4 h-60 md:w-60 md:h-96 flex flex-col items-start justify-start border-b hover:shadow-xl rounded-md p-2 transition ease-in-out delay-50 cursor-pointer"
              onMouseOver={() => setShowButton(item.id)}
              onMouseLeave={() => setShowButton(undefined)}
            >
              <div className="w-full h-2/3 md:h-3/4">
                <img
                  className="object-contain w-full h-full bg-white"
                  src={item.images[0]}
                  alt={item.title}
                />
              </div>
              <div className="w-full ">
                <div className="mb-1">
                  <p className="truncate ">{item.title}</p>

                  {/* Stars Rate */}
                  <div className="relative">
                    <div className="flex items-center relative">
                      {Array.from({ length: 5 }, (_, i) => (
                        <div key={i} className="text-gray-300">
                          <FaStar />
                        </div>
                      ))}
                      <p className="ml-1">({item.rating})</p>
                    </div>

                    <div className="flex items-center justify-start text-yellow-400 absolute top-1">
                      {Array.from({ length: item.rating }, (_, i) => (
                        <div key={i}>
                          <FaStar />
                        </div>
                      ))}
                      {Math.round(item.rating) > item.rating && <FaStarHalf />}
                    </div>
                  </div>
                </div>
                <p className="">{item.price}zł</p>

                <button
                  onClick={() => addFavItem(item)}
                  className={`absolute top-3 right-3 p-2 rounded-full text-xl flex bg-white hover:bg-gray-200`}
                >
                  {favItems.some((e) => e.id === item.id) ? (
                    <AiFillHeart className="text-red-500" />
                  ) : (
                    <AiOutlineHeart className="text-gray-700" />
                  )}
                </button>

                {showButton === item.id && (
                  <button
                    className="absolute bottom-3 right-3 border border-green-500 text-green-500 hover:text-white hover:bg-green-500 p-2 rounded-full text-xs md:text-xl flex items-center justify-center"
                    onClick={() => updateCartItems(item)}
                  >
                    <FaCartPlus />
                  </button>
                )}
              </div>
            </li>
          ))
        ) : (
          <div className="px-5 text-xl bg-gray-200 py-10 col-span-2 lg:col-span-3 2xl:col-span-4">
            No matching items...
          </div>
        )}
      </ul>
    </div>
  );
};

export default ItemList;
