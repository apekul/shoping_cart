import React, { useContext } from "react";
import { AiFillHeart } from "react-icons/ai";
import { FaShopware, FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Context, FavContext } from "../../context";

const Navbar = () => {
  const cartItems = useContext(Context);
  const favItems = useContext(FavContext);
  const navigate = useNavigate();
  return (
    <div className="w-full text-2xl h-12 py-2 px-2 border-b">
      <div className="flex items-center justify-between w-full h-full md:w-5/6 xl:w-2/3 md:m-auto max-w-screen-2xl cursor-pointer">
        <div
          className="hover:text-gray-600 text-2xl p-1"
          onClick={() => navigate("/")}
        >
          <FaShopware />
        </div>
        <div className="flex gap-3">
          <div
            className="text-2xl p-1 relative hover:text-gray-600"
            onClick={() => navigate("/favourite")}
          >
            <AiFillHeart />
            {favItems[0].length !== 0 && (
              <div className=" bg-blue-500  rounded-full w-5 h-5 text-xs font-bold text-white flex items-center justify-center absolute top-0 -right-3">
                {favItems[0].length}
              </div>
            )}
          </div>

          <div
            className="text-2xl p-1 relative hover:text-gray-600"
            onClick={() => navigate("/cart")}
          >
            <FaShoppingCart />
            {cartItems[0].length !== 0 && (
              <div className=" bg-blue-500 rounded-full w-5 h-5 text-xs font-bold text-white flex items-center justify-center absolute top-0 -right-3">
                {cartItems[0].length}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
