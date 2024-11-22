import { z } from 'zod'

export const postDetailSchema = z.object({
  id: z.string().uuid(),
  userId: z.string(),
  title: z.string(),
  content: z.string(),
  date: z.date(),
  watched: z.number(),
  like: z.number(),
})

export type PostDetail = z.infer<typeof postDetailSchema>
