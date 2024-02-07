import rateLimit from 'express-rate-limit'
import { StatusCodes } from 'http-status-codes'

export const commentRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true,
  message: {
    statusCode: StatusCodes.TOO_MANY_REQUESTS,
    message: 'Too many comments, please try again later.'
  }
})
