import prismaDB from "@/lib/prismaDB"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
    try {
        const prompts = await prismaDB.prompt.findMany({

        })
        return NextResponse.json(prompts)
    } catch (error) {
        console.log("PROMPTS_GET", error)
        return new NextResponse("Internal server error", { status: 500 })
    }
}