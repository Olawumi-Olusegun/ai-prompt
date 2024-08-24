"use server"
import prismadb from "@/lib/prismaDb";
import { currentUser, User } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";

export const getUser = async () => {

    try {

        const user: User | null = await currentUser();

        if(!user) {
            return redirect("/sign-in")
        }

        const shop = await prismadb.shops.findUnique({
            where: { userId: user?.id }
        });

        const userData = JSON.parse(JSON.stringify(user));
        const shopData = JSON.parse(JSON.stringify(shop));

        return { user: userData, shop: shopData }

    } catch (error) {
        throw error;
    }
}