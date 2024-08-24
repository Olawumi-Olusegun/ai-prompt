import prismadb from "@/lib/prismaDb"
import { currentUser, User } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
    
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

        return NextResponse.json(prompts, {status: 200})
        
    } catch (error) {
        console.log("[GET PROMPTS:]", error)
        return NextResponse.json("Internal error", {status: 500})
    }
}