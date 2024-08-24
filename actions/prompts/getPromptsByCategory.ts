"use server"
import prismadb from "@/lib/prismaDb";
import { currentUser, User } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";

export const getPromptByCategory = async (promptCategories: string) => {

    try {

        const user: User | null = await currentUser();

        if(!user) {
            return redirect("/sign-in")
        }

        if(!promptCategories) {
            throw new Error("Provide prompt categories")
        }

        const prompts = await prismadb.prompts.findMany({
            where: { category: promptCategories },
            include: {
                orders: true,
                images: true,
                reviews: true,
                promptUrl: true
            },
        });

        return JSON.parse(JSON.stringify(prompts))

    } catch (error) {
        throw error;
    }
}