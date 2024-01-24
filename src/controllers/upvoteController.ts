import { Request, Response } from "express"
import prisma from "@/lib/db"
import { BadRequestError, NotFoundError } from "@/utils/errors"
import { StatusCodes } from "http-status-codes"

export const createUpvote = async (req: Request, res: Response) => {
    //Check if comment exists
    const commentExists = !!await prisma.comment.findUnique({
        select: {
            id: true
        },
        where: {
            id: parseInt(req.params.commentId)
        }
    })

    if (!commentExists) {
        throw new NotFoundError('Comment not found')
    }

    //Check if upvote exists
    const upvoteExists = !!await prisma.upvote.findFirst({
        select: {
            commentId: true,
            userId: true
        },
        where: {
            userId: req.user!.userId,
            commentId: parseInt(req.params.commentId)
        }
    })

    if (upvoteExists) {
        throw new BadRequestError('Upvote already exists')
    }

    //Create upvote
    const upvote = await prisma.upvote.create({
        data: {
            userId: req.user!.userId,
            commentId: parseInt(req.params.commentId)
        }
    })

    return res.status(StatusCodes.CREATED).json({ data: upvote })
}

export const deleteUpvote = async (req: Request, res: Response) => {
    //Delete upvote
    const upvote = await prisma.upvote.deleteMany({
        where: {
            userId: req.user!.userId,
            commentId: parseInt(req.params.commentId)
        }
    })

    return res.status(StatusCodes.OK).json({ message: 'Upvote deleted' })
}