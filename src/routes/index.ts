import { Router } from 'express'
import userRoutes from "./userRoutes"
import authRoutes from "./authRoutes"
import postRoutes from "./postRoutes"

const router = Router()

router.use('/auth', authRoutes)
router.use('/users', userRoutes)
router.use('/posts', postRoutes)

export default router