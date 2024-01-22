import { StatusCodes } from "http-status-codes"

export abstract class CustomError extends Error {
    name: string
    statusCode: StatusCodes

    constructor(message: any, statusCode: StatusCodes) {
        super(message)
        this.name = this.constructor.name
        this.statusCode = statusCode
    }
}

export class NotFoundError extends CustomError {
    constructor(message: any) {
        super(message, StatusCodes.NOT_FOUND)
    }
}

export class BadRequestError extends CustomError {
    errors: any

    constructor(message: any, errors: any = null) {
        super(message, StatusCodes.BAD_REQUEST)

        if (errors) {
            this.errors = errors
        }
    }
}

export class UnauthorizedError extends CustomError {
    constructor(message: any) {
        super(message, StatusCodes.UNAUTHORIZED)
    }
}