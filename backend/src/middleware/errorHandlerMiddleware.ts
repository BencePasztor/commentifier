import { type ErrorRequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, ConflictError } from '@/utils/errors'

interface ErrorData {
  message: string
  errors?: any // The list of errors in case of BadRequestError
  url?: string // The URL to the already existing resource in case of ConflictError
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

  if (err instanceof ConflictError && err.url) {
    errorData.url = err.url
  }

  res
    .status((err.statusCode as number) ?? StatusCodes.INTERNAL_SERVER_ERROR)
    .json(errorData)
}
