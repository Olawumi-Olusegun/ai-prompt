"use client";
import React, { useState } from "react";
import { createOrder } from "@/actions/orders/createOrder";
import { styles } from "@/utils/styles";
import { Button } from "@nextui-org/react";
import {
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { PiSpinnerGapBold } from "react-icons/pi";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import toast from "react-hot-toast";

interface CheckoutFormProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  promptData: any;
  userId: string;
}

const CheckoutForm = ({
  open,
  setOpen,
  promptData,
  userId,
}: CheckoutFormProps) => {
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    try {
      setIsSubmitting(true);
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        redirect: "if_required",
      });

      if (error) {
        setMessage((error?.message as string) || "");
        toast.error(error?.message ?? "");
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        // create order
        await createOrder({
          userId,
          paymentId: paymentIntent.id,
          promptId: promptData?.id,
        });
        setOpen(false);
      }
    } catch (error: any) {
      toast.error(error?.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <form
      id="payment-form"
      className="flex flex-col gap-5"
      onSubmit={handleSubmit}
    >
      <LinkAuthenticationElement id="link-authentication-element" />
      <PaymentElement id="payment-element" />
      <Button
        id="submit"
        type="submit"
        disabled={isSubmitting}
        className={`${styles.button} disabled:cursor-not-allowed disabled:bg-gray-500 my-2 p-2 bg-green-600 flex items-center justify-center gap-1.5`}
      >
        {isSubmitting && <PiSpinnerGapBold className="animate-spin" />}
        <span className="">Pay ${promptData?.price}</span>
      </Button>
      {message && (
        <div className="text-red-500 font-Montserrat p-2">{message}</div>
      )}
    </form>
  );
};

export default CheckoutForm;
