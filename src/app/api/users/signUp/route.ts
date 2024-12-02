import { db } from '@/lib/database'
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { RowDataPacket } from 'mysql2'

export async function POST(req: NextRequest) {
  try {
    const { userId, userEmail, password } = await req.json()

    // userId가 존재할 경우
    const [existUserId] = await db.query<RowDataPacket[]>(
      'SELECT * FROM Users WHERE userId = ?',
      [userId]
    )

    if (existUserId.length > 0) {
      return NextResponse.json(
        { message: '이미 존재하는 사용자 ID 입니다.' },
        { status: 403 }
      )
    }

    // userEmail 이 존재할 경우
    const [existUserEmail] = await db.query<RowDataPacket[]>(
      'SELECT * FROM Users WHERE userEmail = ?',
      [userEmail]
    )

    if (existUserEmail.length > 0) {
      return NextResponse.json(
        { message: '이미 존재하는 사용자 Email 입니다.' },
        { status: 403 }
      )
    }

    // 데이터 저장
    const userPassword = bcrypt.hashSync(password, 10)

    const [result] = await db.query(
      'INSERT INTO Users (userId, userEmail, userPassword) VALUES (?, ?, ?)',
      [userId, userEmail, userPassword]
    )

    return NextResponse.json(
      { message: '회원가입을 축하드립니다.', data: result },
      { status: 201 }
    )
  } catch (error) {
    console.error('Users SignUp Error', error)

    return NextResponse.json(
      { message: '회원가입 중 문제가 발생했습니다.' },
      { status: 500 }
    )
  }
}
