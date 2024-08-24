"use server"
import prismadb from "@/lib/prismaDb";
import { currentUser, User } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";

interface NewReviewProps {
    rating: number;
    comment: string;
    promptId: string; 
    userId: string;
}

export const newReview = async ({ rating, comment, promptId, userId }: NewReviewProps) => {

    try {

        const user: User | null = await currentUser();

        if(!user || !user?.id || !userId) {
            return redirect("/sign-in")
        }
        
        if(user?.id.toString() !== userId.toString()) {
            return redirect("/")
        }

        const review = await prismadb.reviews.create({
            data: { rating, comment, promptId, userId }
        });

        const prompt = await prismadb.prompts.findUnique({
            where: { id: promptId },
            include: { reviews: true }
        })

        if(prompt) {
            const reviews: any = prompt.reviews;
            reviews.push({ rating });

            let avg = 0;
            reviews && reviews.forEach((rev: any) => {
                avg += rev.rating
            });

            await prismadb.prompts.update({
                where: { id: promptId },
                data: {
                    rating: avg / reviews.length
                } 
            })
        }

        const shop = await prismadb.shops.findUnique({
            where: { userId: prompt?.sellerId }
        });

        if(shop) {

            const shopRatings = shop.rating + rating;
            await prismadb.shops.update({
                where: { userId: prompt?.sellerId },
                data: {
                    rating: shop.rating === 0 ? shopRatings : shopRatings / 2
                 }
            });
        }

        return JSON.parse(JSON.stringify(review))

    } catch (error) {
        throw error;
    }
}