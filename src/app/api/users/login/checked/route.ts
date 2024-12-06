import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const accessToken = req.cookies.get('accessToken')?.value || ''
    const refreshToken = req.cookies.get('refreshToken')?.value || ''

    console.log('AccessToken:', accessToken)
    console.log('RefreshToken:', refreshToken)

    if (!accessToken || !refreshToken) {
      console.warn('쿠키가 없습니다.')
      return NextResponse.json({ user: null, isLogin: false }, { status: 403 })
    }

    if (!process.env.ACCESS_TOKEN_SECRET || !process.env.REFRESH_TOKEN_SECRET) {
      console.error('필요한 환경 변수가 설정되지 않았습니다.')
      process.exit(1)
    }

    // Test Response
    return NextResponse.json(
      {
        user: {
          id: '100',
          userId: 'test',
          userEmail: '123@naver.com',
        },
        isLogin: true,
      },
      { status: 200 }
    )
  } catch (error) {
    console.warn(error)
  }
}
