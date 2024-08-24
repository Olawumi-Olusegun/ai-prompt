"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import { styles } from "@/utils/styles";
import { Button, Chip } from "@nextui-org/react";
import Ratings from "../Ratings";
import { IoCloseOutline } from "react-icons/io5";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const PromptDetailsCard = ({
  promptData,
  clientSecret,
  stripePromise,
}: {
  promptData: any;
  clientSecret: any;
  stripePromise: any;
}) => {
  const { user } = useUser();

  const router = useRouter();

  const [activeImage, setActiveImage] = useState(promptData?.images[0]?.url);
  const [open, setOpen] = useState(false);

  const tagsArray = promptData?.tags
    .split(",")
    .map((tag: string) => tag.trim());

  if (!user || !user.id) {
    useEffect(() => {
      router.push("/sign-in");
    }, []);

    return null;
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (open) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open, user]);

  return (
    <>
      <div className="bg-[#12111023] p-2 w-full min-h-[50vh] shadow rounded-xl mt-8 ">
        <div className="w-full flex flex-wrap">
          <div className="md:w-[48%] w-full p-2 space-y-10 ">
            <div className="">
              <Image
                src={activeImage}
                width={500}
                height={500}
                alt="prompt-image"
                className="rounded-xl w-full object-contain pointer-events-none"
              />
            </div>
            <div className="w-full space-x-4">
              <Marquee className="">
                {promptData.images.map((image: any, index: number) => (
                  <div
                    onClick={() => setActiveImage(image?.url)}
                    className="m-2 cursor-pointer"
                    key={`promptImage-${index}`}
                  >
                    <Image
                      src={image?.url}
                      width={250}
                      height={250}
                      alt={`prompt-image-${index}`}
                      className="rounded-xl w-full cursor-pointer object-contain pointer-events-none"
                    />
                  </div>
                ))}
              </Marquee>
            </div>
          </div>
          <div className="md:w-[48%] w-full p-2 flex flex-col gap-5">
            <h1 className={`${styles.label} !text-3xl font-Montserrat`}>
              {promptData?.name}
            </h1>
            <div className="space-x-3">
              <Chip className="bg-[#1f2d2b] rounded-md ">
                <span
                  className={`${styles.label} !text-2xl  p-3 !text-[#64ff4b] font-Montserrat`}
                >
                  10%
                </span>
              </Chip>
              <span
                className={`${styles.label} !text-xl text-white font-Montserrat`}
              >
                Off
              </span>
            </div>
            <div className="w-full flex items-center my-2 justify-between">
              <div className="flex items-center gap-x-3">
                <span
                  className={`${styles.label} inline-block pt-4 !text-xl line-through`}
                >
                  ${promptData?.estimatedPrice}
                </span>
                <span
                  className={`${styles.label} inline-block pt-4 !text-xl text-white`}
                >
                  ${promptData?.price}
                </span>
              </div>
            </div>
            <Ratings rating={promptData?.rating} />
            <p className={`${styles.paragraph}`}>
              {promptData?.shortDescription}
            </p>
            <div className="w-full flex items-center flex-wrap gap-3">
              {tagsArray.map((item: string, index: number) => (
                <span
                  key={`tag-${index}`}
                  className={`${styles.label} !text-base text-white font-Montserrat rounded-md p-2 px-3 capitalize bg-gray-700 `}
                >
                  {item.trim()}
                </span>
              ))}
            </div>
            <Button
              onClick={() => setOpen(true)}
              radius="full"
              className={`${styles.button} mt-10 font-[400] w-max !bg-[#64ff4b] text-indigo-900`}
            >
              Buy now ${promptData?.price}
            </Button>
          </div>
        </div>
      </div>

      {open && (
        <div className="fixed bg-black bg-opacity-45 backdrop-blur-md  p-2 inset-0 h-screen w-full flex items-center justify-center z-[9999999999999]">
          <div className="relative group w-full md:w-[40%] mx-auto min-h-[500px]  bg-white rounded-md  p-5">
            <button
              type="button"
              className="text-black cursor-pointer absolute p-1.5 top-3 right-4 bg-gray-100 hover:bg-gray-300 duration-300 rounded-full "
            >
              <IoCloseOutline
                onClick={() => setOpen(false)}
                size={24}
                className="text-gray-700 group-hover:text-gray-900"
              />
            </button>

            <div className="w-full mt-10">
              {stripePromise && clientSecret && (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                  <CheckoutForm
                    open={open}
                    setOpen={setOpen}
                    promptData={promptData}
                    userId={user?.id}
                  />
                </Elements>
              )}
            </div>
          </div>

          {/* <Modal>
          </Modal> */}
        </div>
      )}
    </>
  );
};

export default PromptDetailsCard;
