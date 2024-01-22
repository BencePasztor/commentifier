import { Request, Response } from "express"
import { createCommentSchemaValidator } from "@/schemas/commentSchema"
import prisma from "@/lib/db"
import { NotFoundError } from "@/utils/errors"
import { StatusCodes } from "http-status-codes"

export const getCommentsByPostId = async (req: Request, res: Response) => {
    //Check if the post exists
    const postExists = !!await prisma.post.findUnique({
        where: {
            id: parseInt(req.params.postId)
        },
        include: {
            comment: true
        }
    })

    if (!postExists) {
        throw new NotFoundError('Post not found')
    }

    //Collect comments
    const comments = await prisma.comment.findMany({
        where: {
            postId: parseInt(req.params.postId),
        },
        select: {
            id: true,
            content: true,
            createdAt: true,
            user: {
                select: {
                    id: true,
                    username: true
                }
            },
            _count: {
                select: {
                    replies: true
                }
            }
        },
    })

    return res.status(StatusCodes.OK).json({ data: comments })
}

export const createComment = async (req: Request, res: Response) => {
    //Validate Data
    const validatedData = createCommentSchemaValidator(req.body)

    //Check if the post exists
    const postExists = !!await prisma.post.findFirst({
        where: {
            id: parseInt(req.params.postId)
        }
    })

    if (!postExists) {
        throw new NotFoundError('The post with the given id was not found')
    }

    //Create comment
    const comment = await prisma.comment.create({
        data: {
            postId: parseInt(req.params.postId),
            content: validatedData.content,
            createdBy: req.user!.userId
        },
        select: {
            id: true,
            parentId: true,
            content: true
        }
    })

    return res.status(StatusCodes.CREATED).json({ data: comment })
}

export const getReplies = async (req: Request, res: Response) => {
    //Check if the comment exists
    const commentExists = !!await prisma.comment.findFirst({
        where: {
            id: parseInt(req.params.commentId)
        },
        select: {
            id: true
        }
    })

    if (!commentExists) {
        throw new NotFoundError('The comment with the given id was not found')
    }

    //Collect replies
    const replies = await prisma.comment.findMany({
        where: {
            parentId: parseInt(req.params.commentId),
        },
        select: {
            id: true,
            content: true,
            createdAt: true,
            user: {
                select: {
                    id: true,
                    username: true
                }
            },
            _count: {
                select: {
                    replies: true
                }
            }
        },
    })

    return res.status(StatusCodes.OK).json({ data: replies })
}

export const createReply = async (req: Request, res: Response) => {
    //Validate Data
    const validatedData = createCommentSchemaValidator(req.body)

    //Check if the comment exists
    const commentExists = await prisma.comment.findFirst({
        where: {
            id: parseInt(req.params.commentId)
        },
        select: {
            id: true,
            postId: true
        }
    })

    if (!commentExists) {
        throw new NotFoundError('The comment with the given id was not found')
    }

    //Create comment
    const comment = await prisma.comment.create({
        data: {
            postId: commentExists.postId,
            parentId: commentExists.id,
            content: validatedData.content,
            createdBy: req.user!.userId
        },
        select: {
            id: true,
            parentId: true,
            content: true,
            createdAt: true,
            user: {
                select: {
                    id: true,
                    username: true
                }
            }
        }
    })

    return res.status(StatusCodes.CREATED).json({ data: comment })
}