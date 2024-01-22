import { Router } from "express"
import asyncWrapper from "@/utils/asyncWrapper"
import { createUpvote, deleteUpvote } from "@/controllers/upvoteController"
import { authMiddleware } from "@/middleware"

const router = Router({ mergeParams: true })

router.post('/', authMiddleware, asyncWrapper(createUpvote))
router.delete('/', authMiddleware, asyncWrapper(deleteUpvote))

export default router