import { db } from '@/lib/database'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { id, userId, title, content } = await req.json()
    const likes: number[] = []

    const [result] = await db.query(
      'INSERT INTO Posts (id, userId, title, content, likes) VALUES (?, ?, ?, ?, ?)',
      [id, userId, title, content, JSON.stringify(likes)]
    )

    return NextResponse.json(
      { message: '글작성 완료', data: result },
      { status: 201 }
    )
  } catch (error) {
    console.error('Post Write Error', error)

    return NextResponse.json(
      { message: '글작성 중 문제가 발생했습니다.' },
      { status: 500 }
    )
  }
}
