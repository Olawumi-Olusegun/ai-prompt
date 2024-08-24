"use server"
import prismadb from "@/lib/prismaDb";
import { currentUser, User } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

interface OrderProps  {
    promptId: string;
    paymentId: string;
    paymentMethod?: string;
    userId: string;
}

export const createOrder = async ({promptId, paymentId, paymentMethod = "visa", userId}: OrderProps) => {

    try {

        const user: User | null = await currentUser();

        
        if(!user || !user?.id || !userId) {
            return redirect("/sign-in")
        }
        
        if(user?.id.toString() !== userId.toString()) {
            return redirect("/")
        }

        const order = await prismadb.orders.create({
            data: {
                userId,
                promptId,
                paymentId,
                paymentMethod,
            }
        });

        const shop = await prismadb.shops.update({
            where: { userId },
            data: {
                totalSales: { increment: 1 }
            }
        })

        return JSON.parse(JSON.stringify(order))
        
    } catch (error) {
        throw error;
    }
}