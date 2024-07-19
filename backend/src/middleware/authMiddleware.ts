import { type Request, type Response, type NextFunction } from 'express'
import { UnauthorizedError } from '@/utils/errors'

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    throw new UnauthorizedError('Missing or invalid token!')
  }

  next()
}
