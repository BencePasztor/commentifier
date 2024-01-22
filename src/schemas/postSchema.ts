import { z } from "zod"
import zodValidatorFactory from "@/utils/zodValidatorFactory"

export const createPostSchema = z.object({
    sourceUrl: z.string().trim().url("Invalid URL").transform(urlString => {
        const cleanUrl = new URL(urlString);
        cleanUrl.hash = '';
        cleanUrl.search = '';
        return cleanUrl.toString();
    }),
})

export const createPostSchemaValidator = zodValidatorFactory(createPostSchema)