export interface PromptProps {
    id: string,
    creatorId: string,
    prompt: string,
    tag: string,
    username: string,
    image: string,
    email: string,
    userId: string,
    createdAt: string,
}

export interface PromptUpdateProps {
    id: string,
    creatorId: string,
    prompt: string,
    tag: string,
    userId: string,

}