"use client";
import Header from "@/components/layouts/Header";
import ShopBanner from "@/components/shop/ShopBanner";
import React from "react";

const PolicyComp = ({ data }: { data: any }) => {
  return (
    <>
      <div className="shop-banner ">
        <Header
          activeItem={4}
          user={data?.user}
          isSellerExist={data?.shop ? true : false}
        />
        <ShopBanner title="Our Policy" />
      </div>
      <div className="">
        <div className="w-[95%] md:w-[90%] xl:w-[85%] 2xl:w-[80%] m-auto"></div>
      </div>
    </>
  );
};

export default PolicyComp;
