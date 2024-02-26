import rateLimit from 'express-rate-limit'
import { StatusCodes } from 'http-status-codes'

export const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true,
  message: {
    message: 'Too many login attempts, please try again later.'
  }
})

export const registerRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 2,
  standardHeaders: true,
  legacyHeaders: false,
  skipFailedRequests: true,
  message: {
    message: 'Only 2 accounts can be created every hour.'
  }
})

export const passwordChangeLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 2,
  standardHeaders: true,
  legacyHeaders: false,
  skipFailedRequests: true,
  message: {
    message: 'You can only change your password 2 times per hour.'
  }
})
