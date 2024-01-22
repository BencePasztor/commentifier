import { z } from "zod"
import zodValidatorFactory from "@/utils/zodValidatorFactory"

export const authRegisterSchema = z.object({
    username: z.string().trim().min(1, "Name must be at least 1 character long"),
    password: z.string().min(8, 'Password must be at least 8 characters long').max(50, 'Password must be at most 50 characters long'),
    email: z.string().trim().email()
})

export const authRegisterValidator = zodValidatorFactory(authRegisterSchema)