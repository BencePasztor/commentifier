import { Router } from 'express'
import asyncWrapper from '@/utils/asyncWrapper'
import { authMiddleware, multerProfileMiddleware } from '@/middleware'
import { updateProfile } from '@/controllers/userController'

const router = Router()

router.patch(
  '/profile',
  authMiddleware,
  multerProfileMiddleware,
  asyncWrapper(updateProfile)
)

export default router
