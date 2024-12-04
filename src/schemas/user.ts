import { z } from 'zod'

export const userLoginSchema = z.object({
  userId: z.string(),
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

export const userFindIdSchema = z.object({
  userEmail: z.string().email(),
})

export type UserFindId = z.infer<typeof userFindIdSchema>

export const userFindPasswordSchema = z.object({
  userId: z.string(),
  userEmail: z.string().email(),
})

export type UserFindPassword = z.infer<typeof userFindPasswordSchema>

export const userResetPasswordSchema = z.object({
  password: z.string(),
  confirmPassword: z.string(),
})
export type UserResetPassword = z.infer<typeof userResetPasswordSchema>
