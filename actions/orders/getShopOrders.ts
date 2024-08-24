"use server"
import prismadb from "@/lib/prismaDb";
import { clerkClient, currentUser, User } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";


export const getShopOrders = async ({ sellerId}: { sellerId: string }) => {
    try {

        const user: User | null = await currentUser();

        if(!user || !user?.id) {
            return redirect("/sign-in")
        }

        const orders: any = await prismadb.orders.findMany({ 
            where : { 
                prompt: { sellerId }
             },
            include: { 
                prompt: true
            }
        });

        for(const order of orders) {
            console.log(order)
            const userId = order?.userId;
            if(userId) {
                const user = await clerkClient.users.getUser(userId);
                order.user = user
            }
        }

        console.log(JSON.parse(JSON.stringify(orders)))

        return JSON.parse(JSON.stringify(orders))
        
    } catch (error) {
        throw error;
    }
}