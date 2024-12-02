import { db } from '@/lib/database'
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

export async function POST(req: NextRequest) {
  try {
    const { userId, userEmail, password } = await req.json()
    console.log(userId, userEmail, password)

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
