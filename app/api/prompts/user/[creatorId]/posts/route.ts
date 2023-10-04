import prismaDB from "@/lib/prismaDB"
import { NextResponse } from "next/server"

export async function GET(req: Request, { params }: { params: { creatorId: string } }) {
    try {
        if (!params.creatorId) {
            return new NextResponse("Id is required")
        }

        const posts = await prismaDB.prompt.findMany({
            where: {
                creatorId: params.creatorId
            }
        })
        return NextResponse.json(posts)
    } catch (error) {
        console.log("POST_GET", error)
        return new NextResponse("Internal server error", { status: 500 })
    }
}
