import { db } from '@/lib/database'
import { RowDataPacket } from 'mysql2'
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

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const postId = searchParams.get('postUUID')

    const [comments] = await db.query<RowDataPacket[]>(
      'SELECT * FROM COMMENT WHERE postId = ?',
      [postId]
    )

    if (!comments.length) {
      return NextResponse.json(
        { message: 'Comment not found', data: null },
        { status: 201 }
      )
    }

    return NextResponse.json(
      { message: 'Success Get Post Comments Data', data: comments[0] },
      { status: 201 }
    )
  } catch (error) {
    console.error('Post Get Comment Error', error)

    return NextResponse.json(
      { message: '댓글 목록을 불러오는 중 문제가 발생했습니다.' },
      { status: 500 }
    )
  }
}
