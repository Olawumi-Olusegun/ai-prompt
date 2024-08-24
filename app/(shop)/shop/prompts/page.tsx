import { getAllPromptsByShop } from "@/actions/shop/getAllPromptsByShop";
import AllPrompts from "@/components/prompts/AllPrompts";
import ShopSidebar from "@/components/shop/ShopSidebar";
import React from "react";

const Prompts = async () => {
  const promptsData = (await getAllPromptsByShop()) ?? [];

  return (
    <div className="flex w-full">
      <div className="h-screen sticky top-0 left-0 flex  z-20 p-2 bg-[#111c42] md:w-[20%] 2xl:w-[17%] ">
        <ShopSidebar active={1} />
      </div>
      <div className="md:w-[80%] 2xl:w-[83%]">
        <AllPrompts promptsData={promptsData} />
      </div>
    </div>
  );
};

export default Prompts;
