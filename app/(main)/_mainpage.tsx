"use client";

import About from "@/components/About";
import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";
import PromptCard from "@/components/prompts/PromptCard";
import Future from "@/components/route/Future";
import Hero from "@/components/route/Hero";
import Partners from "@/components/route/Partners";
import Bestsellers from "@/components/shop/Bestsellers";
import SellerBanner from "@/components/shop/SellerBanner";
import { styles } from "@/utils/styles";
import { User } from "@clerk/nextjs/server";
import { Divider } from "@nextui-org/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type Props = {
  user: User | null;
  isSellerExist: boolean;
  promptsData: any;
};

function Mainpage({ user, isSellerExist, promptsData }: Props) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
    }
  }, [isMounted]);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <div className="w-full">
        <div className="banner relative">
          <Header activeItem={0} user={user} isSellerExist={isSellerExist} />
          <Hero />
          <Image
            src={"https://pixner.net/aikeu/assets/images/footer/shape-two.png"}
            width={120}
            height={120}
            alt="star-image"
            className="absolute right-[-30px] bottom-0 pointer-events-none"
          />
          <br />
        </div>
        <div className="w-[95%] xl:w-[80%] 2xl:w-[75%] m-auto py-8">
          <About />
          <div className="">
            <h1 className={`${styles.heading} p-2 font-Montserrat my-10`}>
              Latest Prompts
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {promptsData &&
                promptsData.length > 0 &&
                promptsData?.map((prompt: any) => (
                  <PromptCard key={prompt.id} prompt={prompt} />
                ))}
            </div>
          </div>
          <Bestsellers />
          <Future />
          <Partners />
          <SellerBanner />
          <br />
          <Divider className="bg-[#ffffff23]" />
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Mainpage;
