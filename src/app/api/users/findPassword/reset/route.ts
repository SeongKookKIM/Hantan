import { db } from '@/lib/database'
import { RowDataPacket } from 'mysql2'
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

export async function POST(req: NextRequest) {
  try {
    // 요청에서 데이터 추출
    const { password, confirmPassword, id } = await req.json()

    // 사용자가 존재하는지 확인
    const [user] = await db.query<RowDataPacket[]>(
      'SELECT * FROM Users WHERE id = ?',
      [id]
    )

    if (user.length === 0) {
      return NextResponse.json(
        { message: '해당 사용자가 존재하지 않습니다.' },
        { status: 404 }
      )
    }

    // Password Hash
    const userPassword = bcrypt.hashSync(password, 10)

    // 비밀번호 업데이트
    await db.query('UPDATE Users SET userPassword = ? WHERE id = ?', [
      userPassword,
      id,
    ])

    return NextResponse.json(
      { message: '비밀번호가 성공적으로 변경되었습니다.' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Users Reset Password Error', error)
    return NextResponse.json(
      { message: '서버에서 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}
