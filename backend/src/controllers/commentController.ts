import { type Request, type Response } from 'express'
import { createCommentSchemaValidator } from '@/schemas/commentSchema'
import prisma from '@/lib/db'
import { NotFoundError, BadRequestError } from '@/utils/errors'
import { StatusCodes } from 'http-status-codes'
import { COMMENT_FIELDS, COMMENTS_PER_PAGE } from '@/config/comment'

export const getCommentsByPostId = async (req: Request, res: Response) => {
  // Check if the post exists
  const postExists = !!(await prisma.post.findUnique({
    select: {
      id: true
    },
    where: {
      id: parseInt(req.params.postId)
    }
  }))

  if (!postExists) {
    throw new NotFoundError('Post not found')
  }

  // Get the cursor for the infinite scroll
  const cursorParam = req.query.cursor

  if (
    cursorParam &&
    (typeof cursorParam !== 'string' || isNaN(parseInt(cursorParam)))
  ) {
    throw new BadRequestError('Invalid cursor!')
  }

  // Collect comments
  const comments = await prisma.comment.findMany({
    where: {
      postId: parseInt(req.params.postId),
      parentId: null
    },
    select: COMMENT_FIELDS,
    take: COMMENTS_PER_PAGE + 1, // +1 to get the next cursor
    orderBy: {
      createdAt: 'desc'
    },
    cursor: cursorParam ? { id: parseInt(cursorParam) } : undefined
  })

  return res.status(StatusCodes.OK).json({
    data: comments.slice(0, COMMENTS_PER_PAGE),
    nextCursor:
      comments.length > COMMENTS_PER_PAGE
        ? comments[comments.length - 1].id
        : null
  })
}

export const createComment = async (req: Request, res: Response) => {
  // Validate Data
  const validatedData = createCommentSchemaValidator(req.body)

  // Check if the post exists
  const postExists = !!(await prisma.post.findFirst({
    select: {
      id: true
    },
    where: {
      id: parseInt(req.params.postId)
    }
  }))

  if (!postExists) {
    throw new NotFoundError('The post with the given id was not found')
  }

  // Create comment
  const comment = await prisma.comment.create({
    data: {
      postId: parseInt(req.params.postId),
      content: validatedData.content,
      createdBy: req.user!.userId
    },
    select: COMMENT_FIELDS
  })

  return res.status(StatusCodes.CREATED).json({ data: comment })
}

export const getReplies = async (req: Request, res: Response) => {
  // Check if the comment exists
  const commentExists = !!(await prisma.comment.findFirst({
    select: {
      id: true
    },
    where: {
      id: parseInt(req.params.commentId)
    }
  }))

  if (!commentExists) {
    throw new NotFoundError('The comment with the given id was not found')
  }

  // Collect replies
  const replies = await prisma.comment.findMany({
    where: {
      parentId: parseInt(req.params.commentId)
    },
    select: COMMENT_FIELDS
  })

  return res.status(StatusCodes.OK).json({ data: replies })
}

export const createReply = async (req: Request, res: Response) => {
  // Validate Data
  const validatedData = createCommentSchemaValidator(req.body)

  // Check if the comment exists
  const commentExists = await prisma.comment.findFirst({
    select: {
      id: true,
      postId: true
    },
    where: {
      id: parseInt(req.params.commentId)
    }
  })

  if (!commentExists) {
    throw new NotFoundError('The comment with the given id was not found')
  }

  // Create comment
  const comment = await prisma.comment.create({
    data: {
      postId: commentExists.postId,
      parentId: commentExists.id,
      content: validatedData.content,
      createdBy: req.user!.userId
    },
    select: COMMENT_FIELDS
  })

  return res.status(StatusCodes.CREATED).json({ data: comment })
}
