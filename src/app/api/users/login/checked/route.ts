import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { UserTokenPayload } from '@/schemas/user'

export async function GET(req: NextRequest) {
  try {
    const accessToken = req.cookies.get('accessToken')?.value || ''
    const refreshToken = req.cookies.get('refreshToken')?.value || ''

    if (!process.env.ACCESS_TOKEN_SECRET || !process.env.REFRESH_TOKEN_SECRET) {
      console.error('필요한 환경 변수가 설정되지 않았습니다.')
      process.exit(1)
    }

    const nowTime = Math.floor(Date.now() / 1000)

    if (accessToken) {
      // Access 토큰 검증
      const decodedAccess = jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET!
      ) as UserTokenPayload

      if (decodedAccess.exp >= nowTime) {
        return NextResponse.json(
          {
            user: {
              id: decodedAccess.id,
              userId: decodedAccess.userId,
              userEmail: decodedAccess.userEmail,
            },
            isLogin: true,
          },
          { status: 201 }
        )
      }
    } else {
      if (refreshToken) {
        const decodedRefresh = jwt.verify(
          refreshToken,
          process.env.REFRESH_TOKEN_SECRET!
        ) as UserTokenPayload

        if (decodedRefresh.exp >= nowTime) {
          // 엑세스토큰 재생성
          const accessToken = jwt.sign(
            {
              id: decodedRefresh.id,
              userId: decodedRefresh.userId,
              userEmail: decodedRefresh.userEmail,
            },
            process.env.ACCESS_TOKEN_SECRET!,
            { expiresIn: '30m' }
          )

          const response = NextResponse.json(
            {
              user: {
                id: decodedRefresh.id,
                userId: decodedRefresh.userId,
                userEmail: decodedRefresh.userEmail,
              },
              isLogin: true,
            },
            { status: 201 }
          )

          response.cookies.set('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 30, // 30m
            path: '/',
          })

          return response
        }
      } else {
        console.warn('토큰이 존재하지 않습니다.')
        return NextResponse.json(
          { user: null, isLogin: false },
          { status: 403 }
        )
      }
    }
  } catch (error) {
    console.warn(error)

    return NextResponse.json(
      { message: '로그인 체크 중 서버에 문제가 발생했습니다.' },
      { status: 500 }
    )
  }
}
