import { db } from '@/lib/database'
import { RowDataPacket } from 'mysql2'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { userId, userEmail } = await req.json()

    // 유저 정보 확인
    const [findUser] = await db.query<RowDataPacket[]>(
      'SELECT * FROM Users WHERE userId = ? AND userEmail = ?',
      [userId, userEmail]
    )

    if (findUser.length > 0) {
      return NextResponse.json(
        { data: findUser[0], message: '유저를 확인하였습니다.' },
        { status: 201 }
      )
    } else {
      return NextResponse.json(
        { message: '해당 아이디와 이메일로 가입된 계정을 찾을 수 없습니다.' },
        { status: 403 }
      )
    }
  } catch (error) {
    console.error('Users Find Password Error', error)
    return NextResponse.json(
      { message: '서버에서 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}
