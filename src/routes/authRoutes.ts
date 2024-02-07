import { Router } from 'express'
import asyncWrapper from '@/utils/asyncWrapper'
import {
  register,
  login,
  logout,
  passwordChange,
  getCurrentUser
} from '@/controllers/authController'
import { authMiddleware } from '@/middleware'

const router = Router()

router.post('/register', asyncWrapper(register))
router.post('/login', asyncWrapper(login))
router.delete('/logout', logout)
router.patch('/password', authMiddleware, asyncWrapper(passwordChange))
router.get('/me', authMiddleware, asyncWrapper(getCurrentUser))

export default router
