import { db } from '@/lib/database'
import { RowDataPacket } from 'mysql2'
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { number } from 'zod'

/**
 @params 유저 아이디와 비밀번호 -> 해싱
 @returns user객체(id, userId, userEmail), isLogin(로그인유무 상태값), AccessToken, RefreshToken
 */

export async function POST(req: NextRequest) {
  try {
    const { userId, password } = await req.json()
    console.log(userId, password)

    //유저정보 확인
    const [existUser] = await db.query<RowDataPacket[]>(
      'SELECT * FROM Users WHERE userId = ?',
      [userId]
    )

    if (existUser.length === 0) {
      return NextResponse.json(
        { message: '아이디가 존재하지 않습니다.' },
        { status: 403 }
      )
    }
    const user = existUser[0]

    // 비밀번호 확인
    const passwordValid = bcrypt.compareSync(password, user.userPassword)

    if (!passwordValid) {
      return NextResponse.json(
        { message: '비밀번호가 일치하지 않습니다.' },
        { status: 403 }
      )
    }

    // 엑세스토큰, 리프레쉬토큰 생성 및 유저 데이터 생성
    const accessToken = jwt.sign(
      { id: user.id, userId: user.userId, userEmail: user.userEmail },
      process.env.ACCESS_TOKEN_SECRET!,
      { expiresIn: '30m' }
    )

    const refreshToken = jwt.sign(
      { id: user.id, userId: user.userId, userEmail: user.userEmail },
      process.env.REFRESH_TOKEN_SECRET!,
      {
        expiresIn: '7d',
      }
    )

    const userInfo = {
      id: user.id,
      userId: user.userId,
      userEmail: user.userEmail,
    }

    // 쿠키 설정
    const response = NextResponse.json(
      { user: userInfo, isLogin: true },
      { status: 201 }
    )

    response.cookies.set('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 30, // 30m
      path: '/',
    })

    response.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7days
      path: '/',
    })

    return response
  } catch (error) {
    console.error('User Login Error', error)

    return NextResponse.json(
      { message: '로그인 중 서버에 문제가 발생했습니다.' },
      { status: 500 }
    )
  }
}
