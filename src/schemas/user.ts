import { z } from 'zod'

export const userLoginSchema = z.object({
  id: z.string(),
  password: z.string(),
})

export type UserLogin = z.infer<typeof userLoginSchema>
