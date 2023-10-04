import prismaDB from "@/lib/prismaDB"
import { NextResponse } from "next/server"

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        const user = await prismaDB.user.findFirst({
            where: {
                userId: params.id
                   }
                })
                return NextResponse.json(user)
            } catch (error) {
                console.log("USER_GET", error)
        return new NextResponse("Internal server error", { status: 500 })
    }
}