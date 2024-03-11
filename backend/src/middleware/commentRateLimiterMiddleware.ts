import rateLimit from 'express-rate-limit'

export const commentRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true,
  message: {
    message: 'Too many comments, please try again later.'
  }
})
