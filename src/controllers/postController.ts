import { Request, Response } from "express"
import { createPostSchemaValidator } from "@/schemas/postSchema"
import prisma from "@/lib/db"
import { BadRequestError, NotFoundError } from "@/utils/errors"
import { StatusCodes } from "http-status-codes"

export const createPost = async (req: Request, res: Response) => {
    //Validate Data
    const validatedData = createPostSchemaValidator(req.body)

    //Check the uniqueness of the sourceUrl
    const postExists = !!await prisma.post.findFirst({
        where: {
            sourceUrl: validatedData.sourceUrl
        },
    })

    if (postExists) {
        throw new BadRequestError('A post with this sourceUrl already exists')
    }

    //TODO: Save additional data(title, OG:thumbnail, description, author...etc)

    //Create Post
    const post = await prisma.post.create({
        data: {
            sourceUrl: validatedData.sourceUrl,
            createdBy: req.user!.userId
        }
    })

    return res.status(StatusCodes.CREATED).json({ data: post })
}

export const getPostById = async (req: Request, res: Response) => {
    const post = await prisma.post.findUnique({
        where: {
            id: parseInt(req.params.postId)
        },
        include: {
            comment: true
        }
    })

    if (!post) {
        throw new NotFoundError('Post not found')
    }

    return res.status(StatusCodes.OK).json({ data: post })
}