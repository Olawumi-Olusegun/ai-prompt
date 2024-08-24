"use client";

import { styles } from "@/utils/styles";
import { useUser } from "@clerk/nextjs";
import { Button, Input, Textarea } from "@nextui-org/react";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const shopItems = {
  name: "",
  description: "",
  shopProductType: "",
  avatar: "",
};

const CreateShop = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [shopData, setShopData] = useState(shopItems);

  const { user } = useUser();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!user) return;

    try {
      setIsLoading(true);
      const data = {
        name: shopData.name,
        description: shopData.description,
        shopProductType: shopData.shopProductType,
        avatar: user?.imageUrl || "",
        userId: user?.id,
      };

      const shop = await axios.post("/api/create-shop", data);
      toast.success("Shop created successfully");
      setShopData(shopItems);
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setShopData({ ...shopData, [name]: value });
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center p-5">
      <div className="">
        <h1 className={`${styles.heading} text-center font-Montserrat`}>
          Start selling with us
        </h1>
        <form
          onSubmit={handleSubmit}
          className="2xl:w-[40%] xl:w-[50%] md:w-[70%] m-auto "
        >
          <div className="w-full my-5">
            <label htmlFor="name" className={`${styles.label} mb-2 block`}>
              Shop Name
            </label>
            <Input
              required
              type="text"
              value={shopData.name}
              name="name"
              id="name"
              placeholder="Enter product name"
              size="lg"
              radius="sm"
              variant="bordered"
              onChange={handleOnChange}
            />
          </div>
          <div className="w-full my-5">
            <label
              htmlFor="description"
              className={`${styles.label} mb-2 block`}
            >
              Shop Description
            </label>
            <Input
              required
              type="text"
              value={shopData.description}
              name="description"
              id="description"
              placeholder="Enter product description"
              size="lg"
              radius="sm"
              variant="bordered"
              onChange={handleOnChange}
              maxLength={120}
            />
          </div>

          <div className="w-full my-5">
            <label
              htmlFor="shopProductType"
              className={`${styles.label} mb-2 block`}
            >
              What do you want to sell?
            </label>
            <Textarea
              required
              type="text"
              value={shopData.shopProductType}
              name="shopProductType"
              id="shopProductType"
              placeholder="Chatgpt, Midjourney, Prompts..."
              size="lg"
              radius="sm"
              variant="bordered"
              onChange={handleOnChange}
              className="col-span-12 md:col-span-6 md:mb-0"
            />
          </div>
          <Button
            type="submit"
            disabled={isLoading}
            disableAnimation
            className="mb-3 w-full bg-transparent h-[45px] border border-[#16c252] text-[#16c252] hover:bg-[#16c252] hover:text-black duration-300 transition-opacity font-Inter font-[600]"
          >
            Create Shop
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateShop;
