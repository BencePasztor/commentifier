import { ErrorRequestHandler } from "express"
import { StatusCodes } from "http-status-codes"
import { BadRequestError } from "@/utils/errors"

interface ErrorData {
    statusCode: number,
    message: string,
    errors?: any
}

export const errorHandlerMiddleware: ErrorRequestHandler = (err, req, res, next) => {
    const errorData: ErrorData = {
        statusCode: err.statusCode ?? StatusCodes.INTERNAL_SERVER_ERROR,
        message: err.message ?? 'Internal Server Error'
    }

    if (err instanceof BadRequestError) {
        errorData.errors = err.errors
    }

    res.status(errorData.statusCode).json(errorData)
}