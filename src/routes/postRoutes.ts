import { Router } from "express"
import asyncWrapper from "@/utils/asyncWrapper"
import { getPostById, getPosts, createPost } from "@/controllers/postController"
import { authMiddleware } from "@/middleware"
import commentRoutes from "./commentRoutes"

const router = Router()

//Posts
router.get('/', asyncWrapper(getPosts))
router.get('/:postId', asyncWrapper(getPostById))
router.post('/', authMiddleware, asyncWrapper(createPost))

//Comments
router.use('/:postId/comments', commentRoutes)

export default router