import { z } from "zod"
import zodValidatorFactory from "@/utils/zodValidatorFactory"

export const createCommentSchema = z.object({
    content: z.string().trim()
})

export const createCommentSchemaValidator = zodValidatorFactory(createCommentSchema)