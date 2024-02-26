import { Request, RequestHandler, Response, NextFunction } from 'express'

const asyncWrapper = (handler: RequestHandler): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handler(req, res, next)
    } catch (error) {
      next(error)
    }
  }
}

export default asyncWrapper
