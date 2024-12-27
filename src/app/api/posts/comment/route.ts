import { db } from '@/lib/database'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { comment, postUUID, userUUID } = await req.json()

    const [result] = await db.query(
      'INSERT INTO COMMENT (postId, userUUID, content) VALUES (?, ?, ?)',
      [postUUID, userUUID, comment]
    )

    return NextResponse.json(
      { message: '댓글작성 완료', data: result },
      { status: 201 }
    )
  } catch (error) {
    console.error('Post Comment Error', error)

    return NextResponse.json(
      { message: '댓글 작성 중 문제가 발생했습니다.' },
      { status: 500 }
    )
  }
}
