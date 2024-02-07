import { Request, Response } from 'express'
import { NotFoundError } from '../utils/errors'

export const notFoundMiddleware = (req: Request, res: Response) => {
  throw new NotFoundError('Resource not found')
}
