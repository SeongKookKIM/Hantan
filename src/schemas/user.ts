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

export const userDataSchema = z.object({
  user: z
    .object({
      id: z.string(),
      userId: z.string(),
      userEmail: z.string().email(),
    })
    .nullable(),
  isLogin: z.boolean(),
})
export type UserData = z.infer<typeof userDataSchema>

export const userTokenPayloadSchema = z.object({
  id: z.string(),
  userId: z.string(),
  userEmail: z.string().email(),
  iat: z.number(),
  exp: z.number(),
})
export type UserTokenPayload = z.infer<typeof userTokenPayloadSchema>
