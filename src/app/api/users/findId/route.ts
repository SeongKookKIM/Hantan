import { db } from '@/lib/database'
import { RowDataPacket } from 'mysql2'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { userEmail } = await req.json()

    // 유저 아이디 찾기
    const [rows] = await db.query<RowDataPacket[]>(
      'SELECT * FROM Users WHERE userEmail = ?',
      [userEmail]
    )

    if (rows.length > 0) {
      return NextResponse.json(rows[0], { status: 201 })
    } else {
      return NextResponse.json(
        { message: '해당 이메일로 가입된 계정을 찾을 수 없습니다.' },
        { status: 404 }
      )
    }
  } catch (error) {
    console.error('Users Find ID Error', error)
    return NextResponse.json(
      { message: '서버에서 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}
