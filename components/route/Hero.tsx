import Image from "next/image";
import React from "react";
import Marquee from "react-fast-marquee";
import line from "@/public/Assets/line.png";

const rowOneImages = [
  {
    id: 0,
    url: "https://pixner.net/aikeu/assets/images/banner/large-slider/one.png",
  },
  {
    id: 1,
    url: "https://pixner.net/aikeu/assets/images/banner/large-slider/two.png",
  },
  {
    id: 2,
    url: "https://pixner.net/aikeu/assets/images/banner/large-slider/three.png",
  },
  {
    id: 3,
    url: "https://pixner.net/aikeu/assets/images/banner/large-slider/four.png",
  },
  {
    id: 4,
    url: "https://pixner.net/aikeu/assets/images/banner/large-slider/five.png",
  },
];

const rowTwoImages = [
  {
    id: 0,
    url: "https://pixner.net/aikeu/assets/images/banner/small-slider/one.png",
  },
  {
    id: 1,
    url: "https://pixner.net/aikeu/assets/images/banner/small-slider/two.png",
  },
  {
    id: 2,
    url: "https://pixner.net/aikeu/assets/images/banner/small-slider/three.png",
  },
  {
    id: 3,
    url: "https://pixner.net/aikeu/assets/images/banner/small-slider/four.png",
  },
  {
    id: 4,
    url: "https://pixner.net/aikeu/assets/images/banner/small-slider/five.png",
  },
];

const Hero = () => {
  return (
    <div className="w-full md:min-h-screen flex items-center justify-center">
      <div className="">
        <h1 className="font-Montserrat text-4xl py-8 xl:text-7xl 2xl:text-8xl font-[700] text-center xl:leading-[80px] 2xl:leading-[100px] sm:mt-20">
          Make
          <span className="text-[#64ff4b]"> AI Prompts </span> <br />
          With Your <br /> Imagination
        </h1>
        <div className="md:mt-5">
          <Image
            src={line}
            alt="image"
            className="absolute hidden md:block"
            width={2000}
            height={2}
          />
        </div>
        <div className="w-[100vw] mb-5 md:mb-20 relative">
          <div className="rotate-[-4deg] mt-10 md:mt-[6.5rem] ">
            <Marquee>
              {rowOneImages.map((item) => (
                <Image
                  src={item.url}
                  key={item.id}
                  alt="marquee-image"
                  width={500}
                  height={300}
                  className="md:m-4 w-[200px] m-2 md:w-[500px] rounded-[20px] pointer-events-none "
                />
              ))}
            </Marquee>
            <Marquee>
              {rowTwoImages.map((item) => (
                <Image
                  src={item.url}
                  key={item.id}
                  alt="marquee-image"
                  width={500}
                  height={300}
                  className="md:m-4 w-[200px] m-2 md:w-[500px] rounded-[20px] pointer-events-none "
                />
              ))}
            </Marquee>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
