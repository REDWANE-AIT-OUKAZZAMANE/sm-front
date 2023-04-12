import React from "react";

import { AiOutlineInstagram } from "react-icons/ai";
import { BsYoutube } from "react-icons/bs";

import logo from "../../../assets/logo.png";

const Header = () => {
  return (
    <div className="flex items-center justify-between mb-20">
      <img className="h-[7vh]" src={logo} alt="logo" />

      <div className="text-dynamicL">
        <span>#DevoxxMa, </span>
        <span>@DevoxxMa</span>

        <div className="flex items-center space-x-4">
          <span className="">
            <BsYoutube />
          </span>
          <span>
            <AiOutlineInstagram />
          </span>
          <p>Join us live</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
