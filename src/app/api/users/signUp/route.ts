import { db } from '@/lib/database'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { userId, userEmail, userPassword } = await req.json()
    console.log(userId, userEmail, userPassword)

    const [result] = await db.query(
      'INSERT INTO posts (title, content) VALUES (?, ?)',
      [userId, userEmail, userPassword]
    )

    return NextResponse.json(
      { message: '회원가입을 축하드립니다.', data: result },
      { status: 201 }
    )
  } catch (error) {
    console.error('Users SignUp Error', error)
  }
}
