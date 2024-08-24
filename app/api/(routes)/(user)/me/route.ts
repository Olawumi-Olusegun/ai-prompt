import prismadb from "@/lib/prismaDb";
import { currentUser, User } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export const GET = async (request: Request) => {

    try {

        const user: User | null = await currentUser();

        if(!user) {
            return NextResponse.json("Please login to access this resource", { status: 400 })
        }

        const shop = await prismadb.shops.findUnique({
            where: { userId: user.id }
        });

        return NextResponse.json({user, shop}, {status: 200})

    } catch (error) {
        return NextResponse.json("Internal Error", {status: 500})
    }
}