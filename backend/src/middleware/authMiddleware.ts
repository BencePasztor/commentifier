import { type Request, type Response, type NextFunction } from 'express'
import { verifyToken } from '@/utils/token'
import { UnauthorizedError } from '@/utils/errors'

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Get the token from the cookies
  const { token } = req.cookies

  // If the token is missing throw an error
  if (!token) {
    throw new UnauthorizedError('Missing token! User is not authenticated.')
  }

  // Validate token
  try {
    const tokenPayload = verifyToken(token)
    req.user = {
      username: tokenPayload.username,
      userId: tokenPayload.userId
    }
    next()
  } catch (error) {
    throw new UnauthorizedError('Invalid token!')
  }
}
