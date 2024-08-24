"use server"
import prismadb from "@/lib/prismaDb";
import { currentUser, User } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";


export const getUserOrders = async () => {
    try {

        const user: User | null = await currentUser();

        if(!user || !user?.id) {
            return redirect("/sign-in")
        }

        const orders = await prismadb.orders.findMany({ 
            where : { userId: user.id },
            include: { 
                prompt: {
                    include: {
                        promptUrl: true,
                        reviews: true
                    }
                }
            }
        });

        return JSON.parse(JSON.stringify(orders))
        
    } catch (error) {
        throw error;
    }
}