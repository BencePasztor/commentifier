import { Request, Response } from 'express'
import { createPostSchemaValidator } from '@/schemas/postSchema'
import prisma from '@/lib/db'
import { BadRequestError, NotFoundError } from '@/utils/errors'
import { StatusCodes } from 'http-status-codes'
import { COMMENT_FIELDS } from '@/config/comment'
import { POSTS_PER_PAGE } from '@/config/post'
import { getMetadataFromUrl } from '@/utils/metadata'
import { savePostImage } from '@/utils/postUtils'
import { truncate } from '@/utils/common'

export const createPost = async (req: Request, res: Response) => {
  //Validate Data
  const validatedData = createPostSchemaValidator(req.body)

  //Check the uniqueness of the sourceUrl
  const postExists = !!(await prisma.post.findFirst({
    select: {
      id: true
    },
    where: {
      sourceUrl: validatedData.sourceUrl
    }
  }))

  if (postExists) {
    throw new BadRequestError('A post with this sourceUrl already exists')
  }

  //Get metadata
  const postMetadata = await getMetadataFromUrl(validatedData.sourceUrl)

  //Save post image
  const postImage = await savePostImage(postMetadata.image)

  //Create Post
  const post = await prisma.post.create({
    data: {
      title: truncate(postMetadata.title, 150),
      description: truncate(postMetadata.description, 300),
      image: postImage,
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
      comment: {
        select: COMMENT_FIELDS
      }
    }
  })

  if (!post) {
    throw new NotFoundError('Post not found')
  }

  return res.status(StatusCodes.OK).json({ data: post })
}

export const getPosts = async (req: Request, res: Response) => {
  const cursorParam = req.query.cursor

  if (
    cursorParam &&
    (typeof cursorParam !== 'string' || isNaN(parseInt(cursorParam)))
  ) {
    throw new BadRequestError('Invalid cursor!')
  }

  const posts = await prisma.post.findMany({
    take: POSTS_PER_PAGE + 1, //+1 to get the next cursor
    orderBy: {
      createdAt: 'desc'
    },
    cursor: cursorParam ? { id: parseInt(cursorParam) } : undefined
  })

  return res.status(StatusCodes.OK).json({
    data: posts.slice(0, POSTS_PER_PAGE),
    nextCursor:
      posts.length > POSTS_PER_PAGE ? posts[posts.length - 1].id : null
  })
}
