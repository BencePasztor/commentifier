import { type ErrorRequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError } from '@/utils/errors'

interface ErrorData {
  message: string
  errors?: any
}

export const errorHandlerMiddleware: ErrorRequestHandler = (
  err,
  req,
  res,
  next
) => {
  const errorData: ErrorData = {
    message: err.message ?? 'Internal Server Error'
  }

  if (err instanceof BadRequestError) {
    errorData.errors = err.errors
  }

  res
    .status(err.statusCode ?? StatusCodes.INTERNAL_SERVER_ERROR)
    .json(errorData)
}
