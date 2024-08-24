import { styles } from "@/utils/styles";
import Image from "next/image";
import React from "react";
import Marquee from "react-fast-marquee";

const partners = [
  {
    id: 0,
    url: "https://pixner.net/aikeu/assets/images/partner/one.png",
  },
  {
    id: 1,
    url: "https://pixner.net/aikeu/assets/images/partner/two.png",
  },
  {
    id: 2,
    url: "https://pixner.net/aikeu/assets/images/partner/three.png",
  },
  {
    id: 3,
    url: "https://pixner.net/aikeu/assets/images/partner/four.png",
  },
  {
    id: 4,
    url: "https://pixner.net/aikeu/assets/images/partner/five.png",
  },
  {
    id: 5,
    url: "https://pixner.net/aikeu/assets/images/partner/one.png",
  },
  {
    id: 6,
    url: "https://pixner.net/aikeu/assets/images/partner/two.png",
  },
  {
    id: 7,
    url: "https://pixner.net/aikeu/assets/images/partner/three.png",
  },
  {
    id: 8,
    url: "https://pixner.net/aikeu/assets/images/partner/four.png",
  },
  {
    id: 9,
    url: "https://pixner.net/aikeu/assets/images/partner/five.png",
  },
];

const Partners = () => {
  return (
    <section className="py-16">
      <div className="w-full flex flex-col gap-5  items-center justify-center py-5 my-10">
        <h1 className={`${styles.heading} font-Montserrat text-center`}>
          Our Partners
        </h1>
        <div className="w-[50px] h-[2px] bg-[#64ff4b]" />
      </div>
      <Marquee>
        {partners.map((partner) => (
          <Image
            key={partner.id}
            src={partner.url}
            alt="partner-image"
            width={100}
            height={100}
            className="mx-14 grayscale-[100%] w-[120px] h-[120px] object-contain hover:grayscale-0 transition-opacity cursor-pointer"
          />
        ))}
      </Marquee>
    </section>
  );
};

export default Partners;
