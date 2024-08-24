"use client";
import { styles } from "@/utils/styles";
import { Button } from "@nextui-org/react";
import React, { useState } from "react";

const categories = ["All", "Chatgpt", "Midjourney", "Bard", "Dalle"];
const FilterPrompt = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <div className="w-full flex items-center gap-2 rounded my-10">
      {categories.map((category, index) => (
        <Button
          key={`category-${index}`}
          onClick={() => setSelectedCategory(category)}
          className={`px-3 py-2 rounded-full flex items-center gap-2 ${
            selectedCategory === category ? "bg-[#3ab05b]" : "bg-[#2251ac]"
          } `}
        >
          <span className={`${styles.paragraph} text-white`}>{category}</span>
        </Button>
      ))}
    </div>
  );
};

export default FilterPrompt;
