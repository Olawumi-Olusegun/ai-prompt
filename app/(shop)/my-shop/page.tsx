"use client";

import React from "react";
import ShopSidebar from "../../../components/shop/ShopSidebar";

const MyShop = () => {
  return (
    <div className="flex w-full">
      <div className="h-screen flex p-2 bg-[#111c42] md:w-[20%] 2xl:w-[17%] ">
        <ShopSidebar active={0} />
      </div>
      <div className="md:w-[80%] 2xl:w-[83%] "></div>
    </div>
  );
};

export default MyShop;
