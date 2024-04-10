import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(1, 'Password is required')
})

export type LoginData = z.infer<typeof loginSchema>

export type LoginResponse = {
  data: {
    id: number
    username: string
    email: string
    avatarSource: string
  }
}

export const registerSchema = z
  .object({
    username: z
      .string()
      .trim()
      .min(1, 'Name must be at least 1 character long'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .max(50, 'Password must be at most 50 characters long'),
    confirmPassword: z.string(),
    email: z.string().trim().email()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'The passwords do not match',
    path: ['confirmPassword']
  })

export type RegisterData = z.infer<typeof registerSchema>

export type RegisterResponse = {
  data: {
    id: number
    username: string
    email: string
    avatarSource: string
  }
}

export type LogoutResponse = {
  message: string
}
