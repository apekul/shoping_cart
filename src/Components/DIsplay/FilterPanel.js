import React, { useState, useRef, useEffect } from "react";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { BsCheckLg, BsSortUp, BsSortDown } from "react-icons/bs";
import MultiRangeSlider from "./MultiRangeSlider";

const FilterPanel = ({ types, setFilter, filter, items }) => {
  const [show, setShow] = useState(undefined);
  const [priceRange, setPriceRange] = useState();

  const ref = useRef();

  const updateShow = (e) => {
    const { id } = e.currentTarget;
    if (show === id) {
      return setShow(undefined);
    }
    setShow(id);
  };

  const updateFilter = (value, key) => {
    if (key === "type") {
      let change = filter.type;
      if (filter.type.includes(value)) {
        let remove = change.filter((x) => x !== value);
        return setFilter((prev) => ({ ...prev, [key]: remove }));
      } else {
        change.push(value);
        setFilter((prev) => ({ ...prev, [key]: change }));
      }
    }

    if (key === "price") {
      setFilter((prev) => ({ ...prev, [key]: value }));
      setShow(undefined);
    }

    if (key === "popularity") {
      let sort = filter.popularity;
      setFilter((prev) => ({ ...prev, [key]: sort === true ? false : true }));
      updateShow(value);
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setShow(undefined);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return (
    <div className="flex rounded-md mt-10 mb-2 select-none gap-2" ref={ref}>
      {/* Type */}
      <button
        className="relative cursor-pointer"
        id="Type"
        onClick={(e) => updateShow(e)}
      >
        {show === "Type" && (
          <>
            <ul
              className={`absolute top-10 left-0 bg-white w-40 h-auto z-10 flex flex-col items-start border border-black`}
            >
              {types.map((v, i) => (
                <li
                  key={i}
                  className="hover:bg-gray-200 p-2 w-full text-start flex items-center justify-between"
                  onClick={() => updateFilter(v, "type")}
                >
                  {v}
                  <span>
                    {filter.type.includes(v) && (
                      <BsCheckLg className="text-black" />
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </>
        )}
        <div
          className={`flex items-center justif-center w-full p-2 bg-white border border-black relative`}
        >
          <span>
            Type{" "}
            {filter.type.length > 0 && filter.type !== undefined && (
              <span className="bg-black text-white px-0.5 mr-1">
                {filter.type.length}
              </span>
            )}
          </span>
          {show === "Type" ? (
            <>
              <AiFillCaretUp />
              <div className="bg-white w-full h-1 z-20 absolute top-9 left-0"></div>
            </>
          ) : (
            <AiFillCaretDown />
          )}
        </div>
      </button>

      {/* Price */}
      <div className="relative cursor-pointer">
        <button
          className=" flex items-center justif-center w-full p-2 bg-white border border-black relative"
          id="Price"
          onClick={(e) => updateShow(e)}
        >
          <span>
            Price
            {filter.price.max > 0 || filter.price.min > 0 ? (
              <span className="bg-black text-white px-0.5 mr-1 ml-2">1</span>
            ) : (
              ""
            )}
          </span>
          {show === "Price" ? (
            <>
              <AiFillCaretUp />

              <div className="bg-white w-full h-1 z-20 absolute top-9 left-0"></div>
            </>
          ) : (
            <AiFillCaretDown />
          )}
        </button>
        {show === "Price" && (
          <>
            <ul
              className={`absolute top-10 left-0 bg-white w-52 h-40 z-10 flex flex-col items-start border border-black px-3`}
            >
              <MultiRangeSlider
                min={items.sort((a, b) => a.price - b.price)[0].price}
                max={items.sort((a, b) => a.price - b.price).reverse()[0].price}
                setPriceRange={setPriceRange}
                filter={filter}
              />
              <div className="bg-red-200 flex w-full mt-6">
                <button
                  onClick={() => updateFilter({ min: "", max: "" }, "price")}
                  className="bg-gray-200 p-2 w-full border border-black hover:bg-gray-300"
                >
                  Reset
                </button>
                <button
                  onClick={() => updateFilter(priceRange, "price")}
                  className="bg-gray-200 p-2 w-full border border-black hover:bg-gray-300"
                >
                  Save
                </button>
              </div>
            </ul>
          </>
        )}
      </div>

      {/* Popularity */}
      <button
        className="relative cursor-pointer"
        id="Popularity"
        onClick={(e) => updateFilter(e, "popularity")}
      >
        <div className=" flex items-center justif-center w-full p-2 bg-white border border-black relative">
          <span className="pr-1">Popularity</span>
          {show === "Popularity" ? (
            <>
              <BsSortUp />
              <div className="bg-white w-full h-1 z-20 absolute top-9 left-0"></div>
            </>
          ) : (
            <BsSortDown />
          )}
        </div>
      </button>
    </div>
  );
};

export default FilterPanel;
