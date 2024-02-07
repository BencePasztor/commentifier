import { Router } from 'express'
import asyncWrapper from '@/utils/asyncWrapper'
import { getReplies, createReply } from '@/controllers/commentController'
import { authMiddleware } from '@/middleware'
import { createUpvote, deleteUpvote } from '@/controllers/upvoteController'

const router = Router()

//Comments
router.post('/:commentId/replies', authMiddleware, asyncWrapper(createReply))
router.get('/:commentId/replies', asyncWrapper(getReplies))

//Upvotes
router.post('/:commentId/upvotes', authMiddleware, asyncWrapper(createUpvote))
router.delete('/:commentId/upvotes', authMiddleware, asyncWrapper(deleteUpvote))

export default router
