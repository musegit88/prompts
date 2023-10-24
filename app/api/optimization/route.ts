import { NextResponse } from "next/server"


const sdk = require('api')('@eden-ai/v2.0#4w1xlnae33f3');
sdk.auth(process.env.EDEN_AI_API_TOKEN)
export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { text } = body
        if (!text) {
            return new NextResponse("Message is required", { status: 400 })
        }
        if (!sdk.auth) {
            return new NextResponse("sdk key not found", { status: 500 })
        }
        const { data } = await sdk.text_prompt_optimization_create({
            response_as_dict: true,
            attributes_as_list: false,
            show_original_response: false,
            providers: "openai",
            text,
            target_provider: 'google',
        })
        return NextResponse.json(data.openai.items)
    } catch (error) {
        console.log("OPTIMAIZATION_POST", error)
        return new NextResponse("Internal server error", { status: 500 })
    }
}