'use server'

import { UserData, userDataSchema } from '@/schemas/user'
import { cookies } from 'next/headers'

export const getAuth = async (): Promise<UserData> => {
  try {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get('accessToken')?.value || ''
    const refreshToken = cookieStore.get('refreshToken')?.value || ''
    console.log('AccessToken:', accessToken)
    console.log('RefreshToken:', refreshToken)

    const response = await fetch(
      'http://localhost:3000/api/users/login/checked',
      {
        method: 'GET',
        headers: {
          Cookie: `accessToken=${accessToken}; refreshToken=${refreshToken}`,
        },
      }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch auth data')
    }

    const result = await response.json()

    // safeParse 결과 처리
    const parsedResult = userDataSchema.safeParse(result)

    if (!parsedResult.success) {
      console.warn('Validation failed', parsedResult.error)
      return {
        user: null,
        isLogin: false,
      }
    }

    return parsedResult.data
  } catch (error) {
    console.warn('Login Failed', error)

    return {
      user: null,
      isLogin: false,
    }
  }
}
