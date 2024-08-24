"use client";
import { styles } from "@/utils/styles";
import { Avatar, Divider, Tab, Tabs } from "@nextui-org/react";
import React from "react";
import ReviewCard from "./ReviewCard";

const tabs = [
  { title: "Description" },
  { title: "Reviews" },
  { title: "Author" },
];

const PromptInformation = ({ promptData }: { promptData: any }) => {
  return (
    <div>
      <div className="flex w-full flex-col bg-slate-900 p-3 rounded-md">
        <Tabs items={tabs} color="primary" variant="light">
          {(item) => (
            <Tab key={item.title} title={item.title} className="text-[18px]">
              <Divider className="bg-[#ffffff18]" />
              <div className="py-2">
                {item.title === "Description" && (
                  <p
                    className={`${styles.paragraph} whitespace-pre-line w-full overflow-hidden`}
                  >
                    {promptData?.description}
                  </p>
                )}
                {item.title === "Author" && (
                  <div className="flex flex-col my-5 gap-3">
                    <div className="flex items-center gap-3">
                      <Avatar src={promptData?.shop?.avatar} size="lg" />
                      <span className={`${styles.label} !text-xl text-white`}>
                        @{promptData?.shop?.name}
                      </span>
                    </div>
                    <div className={`${styles.label} `}>
                      Prompts: {promptData?.shop?.allProducts}
                    </div>
                    <div className={`${styles.label} `}>
                      Reviews: {promptData?.shop?.rating}/5
                    </div>
                  </div>
                )}

                {item.title === "Reviews" && (
                  <div className="w-full flex flex-col gap-10 p-2">
                    <ReviewCard />
                    <ReviewCard />
                    <ReviewCard />
                    <ReviewCard />
                  </div>
                )}
              </div>
            </Tab>
          )}
        </Tabs>
      </div>
    </div>
  );
};

export default PromptInformation;
