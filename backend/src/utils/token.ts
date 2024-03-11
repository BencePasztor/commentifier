import jwt, { type JwtPayload } from 'jsonwebtoken'

export const createToken = (payload: any): string => {
  return jwt.sign(payload, process.env.TOKEN_SECRET!, {
    expiresIn: parseInt(process.env.TOKEN_EXPIRATION_SECONDS!)
  })
}

export const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.TOKEN_SECRET!) as JwtPayload
}
