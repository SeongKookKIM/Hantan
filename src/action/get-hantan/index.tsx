'use server'

import { PostDetail, postDetailSchema } from '@/schemas/post'

export type GetHantanResponse =
  | {
      status: 'success'
      data: PostDetail
    }
  | {
      status: 'error'
      error: string
    }

export const getHantan = async (id: string): Promise<GetHantanResponse> => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/posts/hantan?id=${id}`
    )

    if (!response.ok) {
      throw new Error('Failed to PostDetail data')
    }

    const result = await response.json()

    const { success, data } = postDetailSchema.safeParse(result.data)

    if (success) {
      return {
        status: 'success',
        data: data,
      }
    } else {
      return {
        status: 'error',
        error: '데이터가 존재하지 않습니다.',
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        status: 'error',
        error: error.message,
      }
    }

    return {
      status: 'error',
      error: '알 수 없는 에러가 발생했습니다.',
    }
  }
}
