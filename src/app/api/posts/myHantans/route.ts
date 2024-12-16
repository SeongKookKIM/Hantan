import { db } from '@/lib/database'
import { RowDataPacket } from 'mysql2'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { message: 'userId가 누락되었습니다.', data: [] },
        { status: 400 }
      )
    }

    const [rows] = await db.query<RowDataPacket[]>(
      `SELECT * 
       FROM Posts 
       WHERE userId = ? 
       ORDER BY date DESC`,
      [userId]
    )

    if (rows.length === 0) {
      return NextResponse.json(
        { message: '해당 userId로 저장된 데이터가 없습니다.', data: [] },
        { status: 201 }
      )
    }

    return NextResponse.json({ data: rows }, { status: 201 })
  } catch (error) {
    console.error('My Hantans Error:', error)

    return NextResponse.json(
      { message: '내가 쓴 한탄 목록을 가져오는 중 문제가 발생하였습니다.' },
      { status: 500 }
    )
  }
}
