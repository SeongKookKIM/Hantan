'use server'

import {
  PostCommentDetail,
  postCommentDetailsArraySchema,
} from '@/schemas/post'

export type GetHantanCommentResponse =
  | {
      status: 'success'
      data: PostCommentDetail | null
    }
  | {
      status: 'error'
      error: string
    }

export const getHantanComment = async (
  postUUID: string
): Promise<GetHantanCommentResponse> => {
  try {
    const url = `http://localhost:3000/api/posts/comment?postUUID=${postUUID}`
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error('Failed to Get Post Comment data')
    }

    const result = await response.json()

    if (!result.data) {
      return {
        status: 'success',
        data: null,
      }
    }

    const { success, data } = postCommentDetailsArraySchema.safeParse(
      result.data
    )

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
      console.warn('Eroro입니다만..')
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
