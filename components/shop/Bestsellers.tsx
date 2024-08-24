import { styles } from "@/utils/styles";
import React from "react";
import SellerCard from "./SellerCard";

const Bestsellers = () => {
  return (
    <section className="my-10">
      <h1 className={`${styles.heading} p-2 font-Montserrat  my-10`}>
        Top Sellers
      </h1>
      <div className="flex flex-wrap">
        <SellerCard />
        <SellerCard />
        <SellerCard />
      </div>
    </section>
  );
};

export default Bestsellers;
