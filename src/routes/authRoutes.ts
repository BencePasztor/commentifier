import { Router } from 'express'
import asyncWrapper from '@/utils/asyncWrapper'
import {
  register,
  login,
  logout,
  passwordChange,
  getCurrentUser
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
router.get('/me', authMiddleware, asyncWrapper(getCurrentUser))

export default router
