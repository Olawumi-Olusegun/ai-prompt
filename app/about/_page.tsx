"use client";
import Header from "@/components/layouts/Header";
import ShopBanner from "@/components/shop/ShopBanner";
import React from "react";

const AboutComp = ({ data }: { data: any }) => {
  return (
    <>
      <div className="shop-banner ">
        <Header
          activeItem={1}
          user={data?.user}
          isSellerExist={data?.shop ? true : false}
        />
        <ShopBanner title="About Us" />
      </div>
      <div className="">
        <div className="w-[95%] md:w-[90%] xl:w-[85%] 2xl:w-[80%] m-auto"></div>
      </div>
    </>
  );
};

export default AboutComp;
