import { db } from '@/lib/database'
import { RowDataPacket } from 'mysql2'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    // 오늘 날짜의 데이터를 가져오고 likes.length + watched 합산이 가장 큰 포스트 반환
    const [rows] = await db.query<RowDataPacket[]>(`
      SELECT *, JSON_LENGTH(likes) + watched AS total
      FROM Posts
      WHERE DATE(date) = CURDATE()
        AND (JSON_LENGTH(likes) + watched) > 0
      ORDER BY total DESC
      LIMIT 1;
    `)

    if (rows.length === 0) {
      return NextResponse.json({ data: null }, { status: 301 })
    }

    return NextResponse.json({ data: rows[0] }, { status: 201 })
  } catch (error) {
    console.error('Error fetching post:', error)
    return NextResponse.json(
      { message: 'Error fetching post' },
      { status: 500 }
    )
  }
}
