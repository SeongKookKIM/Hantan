import { db } from '@/lib/database'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') || '1', 10)
    const limit = 20
    const offset = (page - 1) * limit

    // 금일 날짜 계산
    const today = new Date()
    const todayString = today.toISOString().split('T')[0]

    const [rows] = await db.query(
      `SELECT * 
       FROM Posts 
       WHERE DATE(date) = ? 
       ORDER BY date DESC 
       LIMIT ? OFFSET ?`,
      [todayString, limit, offset]
    )

    return NextResponse.json(
      { message: '금일 데이터 조회 성공', data: rows },
      { status: 200 }
    )
  } catch (error) {
    console.error('Posts Fetch Error:', error)

    return NextResponse.json(
      { message: '데이터 조회 중 문제가 발생했습니다.' },
      { status: 500 }
    )
  }
}
