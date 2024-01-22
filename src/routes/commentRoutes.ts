import { Router } from "express"
import asyncWrapper from "@/utils/asyncWrapper"
import { createComment, getCommentsByPostId, getReplies, createReply } from "@/controllers/commentController"
import { authMiddleware } from "@/middleware"
import upvoteRoutes from "./upvoteRoutes"

const router = Router({ mergeParams: true })

//Comments
router.get('/', asyncWrapper(getCommentsByPostId))
router.post('/', authMiddleware, asyncWrapper(createComment))
router.post('/:commentId/replies', authMiddleware, asyncWrapper(createReply))
router.get('/:commentId/replies', asyncWrapper(getReplies))

//Upvotes
router.use('/:commentId/upvotes', upvoteRoutes)

export default router