import prismadb from "@/lib/prismaDb";
import { NextResponse } from "next/server"

export const POST = async (request: Request) => {
    try {
        const data = await request.json();
        const userId = data.userId;

        const user = await prismadb.shops.findUnique({
            where: {userId }
        });

        if(user) {
            return NextResponse.json("You already have one shop with this account", {status: 400}) 
        }

        const shop = await prismadb.shops.create({data});

        return NextResponse.json(shop, {status: 201})

    } catch (error) {
        console.log("[CREATE SHOP:]", error)
        return NextResponse.json("Internal error", {status: 500})
    }
}