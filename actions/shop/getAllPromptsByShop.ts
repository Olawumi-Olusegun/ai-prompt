import prismadb from "@/lib/prismaDb"
import { currentUser, User } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const getAllPromptsByShop = async () => {

    try {

        const user: User | null = await currentUser();

        if(!user) {
            return redirect("/sign-in")
        }

        const sellerId = user.id;

        const prompts = await prismadb.prompts.findMany({
            where: { sellerId },
            include: { orders: true }
        });

        return JSON.parse(JSON.stringify(prompts));

    } catch (error) {
        throw error;
    }
}