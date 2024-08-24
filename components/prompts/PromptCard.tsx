import { styles } from "@/utils/styles";
import { Avatar, Button, Card, Divider } from "@nextui-org/react";
import Image from "next/image";
import React from "react";
import Ratings from "../Ratings";
import Link from "next/link";

const PromptCard = ({ prompt }: { prompt: any }) => {
  console.log(prompt);
  return (
    <Card radius="lg" className="w-full p-4 bg-[#130f23]">
      <div className="relative">
        <Image
          src={prompt?.images[0]?.url}
          alt="card-image"
          width={300}
          height={300}
          className="w-full h-[250px] rounded-md object-cover pointer-events-none"
        />
        <div className="absolute bottom-2 left-2">
          <div className="w-max bg-black hover:bg-[#162521] duration-300 transition-opacity hover:text-black text-white p-[10px] items-center flex gap-x-2 rounded-xl">
            <Image
              src={`https://pixner.net/aikeu/assets/images/category/chat.png`}
              alt=""
              width={25}
              height={25}
            />
            <span className={`${styles.label} text-white`}>
              {prompt?.category}
            </span>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-between py-3 items-center">
        <h3 className={`${styles.label} text-[18px] text-white`}>
          {prompt?.name}
        </h3>
        <p className={`${styles.paragraph}`}>${prompt?.price}</p>
      </div>
      <Divider className="bg-[#ffffff18] my-3" />
      <div className="w-full flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-x-2">
          <Avatar src={prompt?.shop?.avatar} />
          {/* <span className={`${styles.label}`}>@{prompt?.shop?.name}</span> */}
        </div>
        <Ratings rating={prompt?.rating} />
      </div>
      <br />
      <Link href={`/prompt/${prompt?.id}`} className="w-full">
        <Button
          className={`w-full text-white bg-transparent border border-[#16c252] hover:bg-[#16c252] hover:text-black duration-300 transition-opacity font-Inter font-[600]`}
        >
          Get Prompts
        </Button>
      </Link>
    </Card>
  );
};

export default PromptCard;
