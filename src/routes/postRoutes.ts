import { Router } from 'express'
import asyncWrapper from '@/utils/asyncWrapper'
import { getPostById, getPosts, createPost } from '@/controllers/postController'
import {
  createComment,
  getCommentsByPostId
} from '@/controllers/commentController'
import { authMiddleware } from '@/middleware'

const router = Router()

//Posts
router.get('/', asyncWrapper(getPosts))
router.get('/:postId', asyncWrapper(getPostById))
router.post('/', authMiddleware, asyncWrapper(createPost))

//Comments
router.get('/:postId/comments', asyncWrapper(getCommentsByPostId))
router.post('/:postId/comments', authMiddleware, asyncWrapper(createComment))

export default router
