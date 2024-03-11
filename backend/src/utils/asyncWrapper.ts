import {
  type Request,
  type RequestHandler,
  type Response,
  type NextFunction
} from 'express'

type AsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<any>

const asyncWrapper = (handler: AsyncHandler): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handler(req, res, next)
    } catch (error) {
      next(error)
    }
  }
}

export default asyncWrapper
