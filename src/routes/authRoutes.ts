import { Router } from 'express'
import asyncWrapper from '@/utils/asyncWrapper'
import {
  register,
  login,
  logout,
  passwordChange
} from '@/controllers/authController'
import {
  authMiddleware,
  registerRateLimiter,
  loginRateLimiter,
  passwordChangeLimiter
} from '@/middleware'

const router = Router()

router.post('/register', registerRateLimiter, asyncWrapper(register))
router.post('/login', loginRateLimiter, asyncWrapper(login))
router.delete('/logout', logout)
router.patch(
  '/password',
  authMiddleware,
  passwordChangeLimiter,
  asyncWrapper(passwordChange)
)

export default router
