"use server"
import prismadb from "@/lib/prismaDb";
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";

export const getPromptById = async (promptId: string) => {

    try {

        const { userId: currentUserId } = auth()

        if(!currentUserId ) {
            return redirect("/sign-in")
        }

        if(!promptId) {
            throw new Error("Provide prompt ID")
        }

        const prompt: any = await prismadb.prompts.findUnique({
            where: { id: promptId },
            include: {
                orders: true,
                images: true,
                reviews: true,
                promptUrl: true
            },
        });

        if(prompt) {
            
            const shop = await prismadb.shops.findUnique({
                where: { userId: prompt.sellerId }
            });

            prompt.shop = shop;
        }

        return JSON.parse(JSON.stringify(prompt))

    } catch (error) {
        throw error;
    }
}