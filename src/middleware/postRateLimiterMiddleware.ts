import rateLimit from 'express-rate-limit'
import { StatusCodes } from 'http-status-codes'

export const postRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true,
  message: {
    statusCode: StatusCodes.TOO_MANY_REQUESTS,
    message: 'You can only create 5 posts every hour.'
  }
})
