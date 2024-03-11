import {
  type Request,
  type RequestHandler,
  type Response,
  type NextFunction
} from 'express'

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
