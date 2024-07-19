import { type Request, type Response, type NextFunction } from 'express'
import { verifyToken } from '@/utils/token'

export const decodeJwtMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Get the token from the cookies
  const { token } = req.cookies

  // If the token is missing, clear the user object
  if (!token) {
    delete req.user
    return next()
  }

  // Validate token
  try {
    const tokenPayload = verifyToken(token as string)
    req.user = {
      username: tokenPayload.username,
      userId: tokenPayload.userId
    }
  } catch (error) {
    delete req.user
  }

  next()
}
