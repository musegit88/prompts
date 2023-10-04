
import prismaDB from "@/lib/prismaDB"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { userId, creatorId, text, tag } = body
        if (!creatorId) {
            return new NextResponse("creatorId is required", { status: 400 })
        }
        if (!text) {
            return new NextResponse("text is required", { status: 400 })
        }
        if (!tag) {
            return new NextResponse("tag is required", { status: 400 })
        }



        const prompts = await prismaDB.prompt.create({
            data: {
                prompt: text,
                tag: tag,
                creatorId,
                userId
            }
        })


        return NextResponse.json(prompts)
    } catch (error) {
        console.log("PROMPT_POST", error)
        return new NextResponse("Internal server error", { status: 500 })
    }
}