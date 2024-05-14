import { type ErrorRequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError } from '@/utils/errors'

interface ErrorData {
  message: string
  errors?: any // The list of errors in case of BadRequestError
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

  if (err instanceof BadRequestError && err.errors !== null) {
    errorData.errors = err.errors
  }

  res
    .status((err.statusCode as number) ?? StatusCodes.INTERNAL_SERVER_ERROR)
    .json(errorData)
}
