"use server"
import prismadb from "@/lib/prismaDb";
import { currentUser, User } from "@clerk/nextjs/server"

export const getAllPrompts = async (pageNumber = 1, pageSize = 8) => {

    try {

        const user: User | null = await currentUser();

        if(!user) {
            throw new Error("User not found")
        }

        const prompts: any = await prismadb.prompts.findMany({
            include: {
                orders: true,
                images: true,
                reviews: true,
                promptUrl: true
            },
            where: { status: "Live" },
            take: pageSize,
            skip: (pageNumber - 1) * pageSize,
            orderBy: {
                createdAt: "desc"
            }
        });

        if(prompts) {
            for(const prompt of prompts) {
              const shop = await prismadb.shops.findUnique({
                    where: { userId: prompt.sellerId }
                });
                prompt.shop = shop;
            }
        }

        const allPrompts = await prismadb.prompts.findMany({
            where: { status: "Live" }
        });

        const totalPrompts = allPrompts.length ?? 0;

        const promptsData = JSON.parse(JSON.stringify(prompts));

        return { prompts: promptsData, totalPrompts }

    } catch (error) {
        throw error;
    }
}