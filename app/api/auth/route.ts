import prismaDB from "@/lib/prismaDB"
import { NextResponse } from "next/server"

export async function POST(req: Request) {

    try {
        const body = await req.json()
        const { userId, name, email, image } = body
        if (!userId) {
            return new NextResponse("Name is required", { status: 400 })
        }
        if (!name) {
            return new NextResponse("Name is required", { status: 400 })
        }
        if (!email) {
            return new NextResponse("Email is required", { status: 400 })
        }
        if (!image) {
            return new NextResponse("Email is required", { status: 400 })
        }

        const userExists = await prismaDB.user.findFirst({
            where: {
                userId
            }
        })



        if (!userExists) {
            await prismaDB.user.create({
                data: {
                    userId,
                    name,
                    email,
                    image,
                }
            })
        }





        return NextResponse.json("")
    } catch (error) {
        console.log("USER_POST", error)
        return new NextResponse("Internal server error", { status: 500 })
    }
}