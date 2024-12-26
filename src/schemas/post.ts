import { z } from 'zod'

export const postDetailSchema = z.object({
  id: z.string().uuid(),
  userId: z.string(),
  title: z.string(),
  content: z.string(),
  date: z.string(),
  watched: z.number(),
  likes: z.array(z.number()),
})
export type PostDetail = z.infer<typeof postDetailSchema>

export const postWriteSchema = z.object({
  title: z.string(),
  content: z.string(),
})
export type PostWrite = z.infer<typeof postWriteSchema>

export const postCommentSchema = z.object({
  comment: z.string(),
})
export type PostComment = z.infer<typeof postCommentSchema>
