"use server"
import prismadb from "@/lib/prismaDb";
import { currentUser, User } from "@clerk/nextjs/server"

export const getShopById = async ({ shopId }: {shopId: string}) => {

    try {

        const user: User | null = await currentUser();

        if(!user) {
            throw new Error("Please signin")
        }

        const shop = await prismadb.shops.findUnique({
            where: { userId: shopId }
        })

        return shop

    } catch (error) {
        throw error;
    }
}