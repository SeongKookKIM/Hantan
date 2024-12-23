'use server'

import { PostDetail } from '@/schemas/post'

export const getHantan = async (id: string) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/posts/hantan?id=${id}`
    )

    const result = response.json()

    return result
  } catch (error) {
    if (error instanceof Error) {
    }
  }
}
