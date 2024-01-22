import { ZodSchema } from "zod"
import { BadRequestError } from "./errors"

const zodValidatorFactory = <T>(schema: ZodSchema<T>) => {
    return (data: unknown) => {
        const parseResult = schema.safeParse(data)

        if (parseResult.success === true) {
            return parseResult.data
        }

        throw new BadRequestError('Invalid input data', parseResult.error.format())
    }
}

export default zodValidatorFactory