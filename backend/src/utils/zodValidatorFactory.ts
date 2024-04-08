import { type ZodSchema } from 'zod'
import { BadRequestError } from './errors'

const zodValidatorFactory = <T>(schema: ZodSchema<T>) => {
  return (data: unknown) => {
    const parseResult = schema.safeParse(data)

    if (parseResult.success) {
      return parseResult.data
    }

    throw new BadRequestError('Invalid input data', parseResult.error.flatten())
  }
}

export default zodValidatorFactory
