import { db } from '@/lib/database'
import { RowDataPacket } from 'mysql2'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const postId = searchParams.get('id')

    const [post] = await db.query<RowDataPacket[]>(
      'SELECT * FROM Posts WHERE id = ?',
      [postId]
    )

    if (!post.length) {
      return NextResponse.json(
        { message: 'Post not found', data: null },
        { status: 201 }
      )
    }

    return NextResponse.json(
      { message: 'Success Get PostDetail Data', data: post[0] },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error fetching post:', error)
    return NextResponse.json({ data: null }, { status: 500 })
  }
}
