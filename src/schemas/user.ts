import { z } from 'zod'

export const userLoginSchema = z.object({
  id: z.string(),
  password: z.string(),
})

export type UserLogin = z.infer<typeof userLoginSchema>

export const userSignUpSchema = z.object({
  userId: z.string(),
  userEmail: z.string().email(),
  password: z.string(),
  confirmPassword: z.string(),
})

export type UserSignUp = z.infer<typeof userSignUpSchema>
