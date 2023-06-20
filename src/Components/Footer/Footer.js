import React from "react";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillTwitterCircle,
} from "react-icons/ai";
const Footer = () => {
  return (
    <div className="w-full text-2xl px-2 bg-gray-800 mt-10 text-white py-10">
      <div className="flex items-center justify-start w-full h-full md:w-5/6 xl:w-2/3 md:m-auto max-w-screen-2xl cursor-pointer">
        <div className="flex flex-col">
          <p>Footer</p>
          <ul className="flex gap-2 text-xl">
            <li>
              <AiFillFacebook />
            </li>
            <li>
              <AiFillInstagram />
            </li>
            <li>
              <AiFillTwitterCircle />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
