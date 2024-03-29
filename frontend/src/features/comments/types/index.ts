export interface Comment {
    id: number,
    createdAt: string,
    _count: {
        upvote: number,
        replies: number
    },
    content: string,
    parentId: number | null
}