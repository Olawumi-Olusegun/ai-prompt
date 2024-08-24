import React from "react";
import { styles } from "@/utils/styles";
import Image from "next/image";

const ShopBanner = ({ title }: { title: string }) => {
  return (
    <div className="w-full h-full flex items-center justify-center relative">
      <Image
        src={"https://pixner.net/aikeu/assets/images/banner/cmn-thumb-left.png"}
        alt="shop-banner"
        width={180}
        height={180}
        className="absolute top-1 left-3 md:left-10 pointer-events-none w-20 h-20 md:h-auto md:w-auto"
      />
      <h4
        className={`${styles.heading} font-Montserrat xl:text-6xl 2xl:text-7xl`}
      >
        {title}
      </h4>
      <div className="">
        <Image
          src={
            "https://pixner.net/aikeu/assets/images/banner/cmn-thumb-right.png"
          }
          alt="shop-banner"
          width={180}
          height={180}
          className="absolute top-1 right-3 md:right-10 pointer-events-none w-20 h-20 md:h-auto md:w-auto"
        />
      </div>
    </div>
  );
};

export default ShopBanner;
