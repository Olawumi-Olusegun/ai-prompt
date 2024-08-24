import React from "react";
import { Avatar, Card } from "@nextui-org/react";
import { styles } from "@/utils/styles";
import Ratings from "../Ratings";

const SellerCard = () => {
  return (
    <Card className="py-4 bg-[#1400d21] m-3 w-full md:w-[31%] 2xl:w-[33%] flex flex-col items-center text-white border border-[#ffffff22] ">
      <Avatar
        src={`https://pixner.net/aikeu/assets/images/blog-details/a-one.png`}
        className="w-[80px] h-[80px] pointer-events-none"
      />
      <span className={`${styles.label} py-2 text-xl`}>@dara</span>
      <div className="flex items-center gap-1.5">
        <span className={`${styles.label}`}>4.5/5</span>
        <Ratings rating={4.5} />
      </div>
      <span className={`${styles.label} py-2`}>Total Sales: 212</span>
    </Card>
  );
};

export default SellerCard;
