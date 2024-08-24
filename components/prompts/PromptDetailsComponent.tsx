import React from "react";
import PromptDetailsCard from "./PromptDetailsCard";
import { styles } from "@/utils/styles";
import SellerBanner from "../shop/SellerBanner";
import PromptInformation from "./PromptInformation";
import PromptCard from "./PromptCard";

const PromptDetailsComponent = ({
  promptData,
  relatedPrompt,
  clientSecret,
  stripePromise,
}: {
  promptData: any;
  relatedPrompt: any;
  clientSecret: any;
  stripePromise: any;
}) => {
  return (
    <div className="flex flex-col gap-4">
      <PromptDetailsCard
        promptData={promptData}
        clientSecret={clientSecret}
        stripePromise={stripePromise}
      />
      <PromptInformation promptData={promptData} />
      <h1 className={`${styles.heading} px-2 pb-2 my-10 `}>Related Prompts</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 ">
        {relatedPrompt &&
          relatedPrompt.map((prompt: any, index: number) => (
            <PromptCard prompt={prompt} key={`prompt-${index}`} />
          ))}
      </div>
      {relatedPrompt?.length === 0 && (
        <div className="">
          <p className={`${styles.paragraph} text-center`}>
            No Prompt found with in category
          </p>
        </div>
      )}
      <SellerBanner />
    </div>
  );
};

export default PromptDetailsComponent;
