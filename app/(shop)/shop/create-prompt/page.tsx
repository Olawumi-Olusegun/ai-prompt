"use client";
import React from "react";
import ShopSidebar from "../../../../components/shop/ShopSidebar";
import UploadPrompt from "../../../../components/shop/UploadPrompt";

const CreatePrompt = () => {
  return (
    <div className="flex w-full">
      <div className="h-screen sticky top-0 left-0 flex  z-20 p-2 bg-[#111c42] md:w-[20%] 2xl:w-[17%] ">
        <ShopSidebar active={1} />
      </div>
      <div className="md:w-[80%] 2xl:w-[83%] ">
        <UploadPrompt />
      </div>
    </div>
  );
};

export default CreatePrompt;
