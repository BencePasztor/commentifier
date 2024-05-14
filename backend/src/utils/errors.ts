import { StatusCodes } from 'http-status-codes'

export abstract class CustomError extends Error {
  name: string
  statusCode: StatusCodes

  constructor(message: string, statusCode: StatusCodes) {
    super(message)
    this.name = this.constructor.name
    this.statusCode = statusCode
  }
}

export class NotFoundError extends CustomError {
  constructor(message: string) {
    super(message, StatusCodes.NOT_FOUND)
  }
}

export class BadRequestError extends CustomError {
  errors: any

  constructor(message: string, errors: any = null) {
    super(message, StatusCodes.BAD_REQUEST)
    this.errors = errors
  }
}

export class UnauthorizedError extends CustomError {
  constructor(message: string) {
    super(message, StatusCodes.UNAUTHORIZED)
  }
}
