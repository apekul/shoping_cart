import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { AiOutlineCheckSquare } from "react-icons/ai";
import { FaStar, FaStarHalf } from "react-icons/fa";

const SingleItemPage = () => {
  const [imgIndex, setImgIndex] = useState(0);
  const location = useLocation();
  const { item } = location.state;

  return (
    <div className=" h-full min-h-screen flex flex-col items-center justify-start w-full md:w-full xl:w-2/3 md:m-auto max-w-screen-2xl select-none">
      <div className="flex flex-col md:flex-row justify-center md:justify-start w-full h-full items-start gap-5 my-5">
        {/* Image */}
        <div className=" flex flex-col">
          <img
            className={`object-contain w-96 h-96 bg-white `}
            // src={
            //   showButton === item.id ? item.images[imageIndex] : item.images[0]
            // }
            src={item.images[imgIndex]}
            alt={item.title}
          />
          <div className="w-full flex justify-start h-auto ">
            {item.images.slice(0, 6).map((img, i) => (
              <img
                className={`object-cover w-16 h-16 border border-white hover:border-black`}
                src={img}
                alt={i}
                key={i}
                onMouseOver={() => setImgIndex(i)}
                // onMouseLeave={() => setImgIndex(0)}
                // onClick={() => setImgIndex(i)}
              />
            ))}
          </div>
        </div>
        {/* Information */}
        <div>
          {/* Title */}
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            {item.title}
          </h1>
          <div>{item.brand}</div>
          <div>{item.category}</div>

          {/* Price */}
          <p className="text-lg text-gray-900 sm:text-xl">${item.price}</p>

          {/* Reviews */}
          <div className="relative text-2xl">
            <div className="flex items-center relative">
              {Array.from({ length: 5 }, (_, i) => (
                <div key={i} className="text-gray-300">
                  <FaStar />
                </div>
              ))}
            </div>
            <div className="flex items-center justify-start text-yellow-400 absolute top-0">
              {Array.from({ length: item.rating }, (_, i) => (
                <div key={i}>
                  <FaStar />
                </div>
              ))}
              {Math.round(item.rating) > item.rating && <FaStarHalf />}
            </div>
          </div>

          {/* description */}
          <div className="mt-4 space-y-6">
            <p className="text-base text-gray-500">{item.description}</p>
          </div>

          {/* stock */}
          <div className="flex items-center">
            <AiOutlineCheckSquare
              className="flex-shrink-0 w-5 h-5 text-green-500"
              aria-hidden="true"
            />
            <p className="ml-2 text-sm text-gray-500">
              {item.stock} In stock and ready to ship
            </p>
          </div>
        </div>
      </div>
      {/* Reviews */}
      {/* <div className="bg-red-200 w-full">Reviews</div> */}
    </div>
  );
};

export default SingleItemPage;
