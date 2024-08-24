"use client";

import Header from "@/components/layouts/Header";
import FilterPrompt from "@/components/prompts/FilterPrompt";
import PromptCard from "@/components/prompts/PromptCard";
import ShopBanner from "@/components/shop/ShopBanner";
import { Divider, Pagination } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const MarketPlaceClient = ({
  data,
  allProptsData,
  totalPrompts,
}: {
  data: any;
  allProptsData: any;
  totalPrompts: number;
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [initialPage, setInitialPage] = useState(1);
  const router = useRouter();

  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
    }
  }, [isMounted]);

  useEffect(() => {
    if (initialPage) {
      router.push(`/marketplace?page=${initialPage}`);
    }
  }, [initialPage, router]);

  if (!isMounted) {
    return null;
  }

  const paginationPages = Math.ceil(totalPrompts / 8);

  return (
    <>
      <div className="shop-banner ">
        <Header
          activeItem={2}
          user={data?.user}
          isSellerExist={data?.shop ? true : false}
        />
        <ShopBanner title="Our Shop" />
      </div>
      <div className="">
        <div className="w-[95%] md:w-[90%] xl:w-[85%] 2xl:w-[80%] m-auto">
          <div className="w-full ">
            <FilterPrompt />
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-12">
            {allProptsData &&
              allProptsData?.map((item: any) => (
                <PromptCard prompt={item} key={item.id} />
              ))}
          </div>
          <div className="w-full flex items-center justify-center mt-5">
            <Pagination
              loop
              showControls
              total={paginationPages}
              initialPage={initialPage}
              onChange={setInitialPage}
              //   classNames={{
              //     wrapper: "mx-2",
              //     item: "mx-2",
              //   }}
            />
          </div>
          <Divider className="bg-[#ffffff14] mt-5 " />
        </div>
      </div>
    </>
  );
};

export default MarketPlaceClient;
