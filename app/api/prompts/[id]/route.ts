import prismaDB from "@/lib/prismaDB"
import { NextResponse } from "next/server"


export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        if (!params.id) {
            return new NextResponse("Id is required")
        }

        const posts = await prismaDB.prompt.delete({
            where: {
                id: params.id
            }
        })
        return NextResponse.json(posts)
    } catch (error) {
        console.log("POST_GET", error)
        return new NextResponse("Internal server error", { status: 500 })
    }
}
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    try {
        const body = await req.json()
        const { text, tag } = body
        if (!params.id) {
            return new NextResponse("Id is required")
        }
        if (!text) {
            return new NextResponse("text is required", { status: 400 })
        }
        if (!tag) {
            return new NextResponse("tag is required", { status: 400 })
        }

        const posts = await prismaDB.prompt.update({
            where: {
                id: params.id
            },
            data: {
                prompt: text,
                tag: tag,
            }
        })
        return NextResponse.json(posts)
    } catch (error) {
        console.log("POST_GET", error)
        return new NextResponse("Internal server error", { status: 500 })
    }
}