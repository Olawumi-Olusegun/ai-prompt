"use server"
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2024-06-20",
    typescript: true,
});

export const stripePublishableKey = async () => {
    const publishableKey = process.env.STRIPE_PUBLISHABLE_KEY ?? ""
    return JSON.parse(JSON.stringify(publishableKey))
}

export const stripePaymentIntent = async (amount: number) => {

    try {

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: "USD",
            metadata: {
                company: "AI-Prompt"
            },
            automatic_payment_methods: {
                enabled: true,
            }
        });

        return JSON.parse(JSON.stringify(paymentIntent)) ;
        
    } catch (error) {
        throw error;
    }
}