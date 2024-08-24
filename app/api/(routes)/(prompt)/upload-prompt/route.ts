import cloudinary from "@/lib/cloudinary";
import prismadb from "@/lib/prismaDb";
import { currentUser, User } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";


export const POST = async (request: Request) => {
    try {

        const data = await request.json();
        const user: User | null = await currentUser();

        if(!user || !user.id) {
            return redirect("/sign-in")
        }

        if(data.images && data.images.length > 0) {
            const validImages = data.images.filter((image: string) => image !== undefined);
            const uploadedImages = await Promise.all(
                validImages.map(async (image: string) => {
                    const result = await cloudinary.uploader.upload(image, {
                        transformation: {
                            width: 500,
                            height: 500,
                            crop: "thumb"
                        }
                    });
                    return {
                        create: {
                            public_id: result.public_id,
                            url: result.secure_url,
                        }
                     }
                })
            );

            data.images = {
                createMany: {
                    data: uploadedImages.map((image) => image.create)
                }
            }
        }
        
        if(data.attachments && data.attachments.length > 0) {
            const uploadedAttachments = await Promise.all(
                data.attachments.map(async(attachment: string) => {
                    const result = await cloudinary.uploader.upload(attachment, {
                        resource_type: "auto"
                    });

                    return { public_id: result.public_id, url: result.secure_url }
                })
            );

            data.promptUrl = uploadedAttachments;
            delete data.attachments
        }


        data.estimatedPrice = parseFloat(data.estimatedPrice)
        data.price = parseFloat(data.price)
        const promptUrlData = data.promptUrl;
        delete data.promptUrl;

        const sellerId = user.id;

        const newPrompt = await prismadb.prompts.create({
            data: {
                ...data,
                images: data.images,
                promptUrl: {
                    createMany: {
                        data: promptUrlData.map((prompt: any) => ({
                            public_id: prompt.public_id,
                            url: prompt.url,
                        }))
                    }
                },
                sellerId,
            }
        });

        if(!newPrompt) {
            return NextResponse.json("Prompt not created", {status: 400})
        }

        return NextResponse.json(newPrompt, {status: 201})


    } catch (error) {
        console.log("[CREATE PROMPT:]", error)
        return NextResponse.json("Internal error", {status: 500})
    }
}