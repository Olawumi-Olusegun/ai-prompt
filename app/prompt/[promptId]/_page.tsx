"use client";

import { stripePaymentIntent } from "@/actions/prompts/payment/paymentAction";
import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";
import PromptDetailsComponent from "@/components/prompts/PromptDetailsComponent";
import ShopBanner from "@/components/shop/ShopBanner";
import { Divider } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { loadStripe, Stripe } from "@stripe/stripe-js";

const PromptDetailsPage = ({
  data,
  promptData,
  relatedPrompt,
  publishableKey,
}: {
  data: any;
  promptData: any;
  relatedPrompt: any;
  publishableKey: string;
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [stripePromise, setStripePromise] =
    useState<Promise<Stripe | null> | null>(null);
  const [clientSecret, setClientSecret] = useState<any>(null);

  const newPaymentIntent = async (amount: number) => {
    const paymentIntent = await stripePaymentIntent(amount);
    setClientSecret(paymentIntent?.client_secret);
  };

  useEffect(() => {
    if (publishableKey && promptData && promptData?.price) {
      const amount = Math.round(promptData?.price * 100);
      newPaymentIntent(amount);
      setStripePromise(loadStripe(publishableKey));
    }
  }, [publishableKey, promptData]);

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
      <div className="shop-banner">
        <Header
          activeItem={2}
          user={data?.user}
          isSellerExist={data.shop ? true : false}
        />
        <ShopBanner title="Animal Prompt" />
      </div>
      <div className="">
        <div className="w-[90%] md:w-[80%] xl:[85%] 2xl:w-[80%] m-auto">
          <PromptDetailsComponent
            promptData={promptData}
            relatedPrompt={relatedPrompt}
            stripePromise={stripePromise}
            clientSecret={clientSecret}
          />
          <Divider className="bg-[#ffffff14] mt-5" />
          <Footer />
        </div>
      </div>
    </>
  );
};

export default PromptDetailsPage;
