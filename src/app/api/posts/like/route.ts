import { db } from '@/lib/database'
import { RowDataPacket } from 'mysql2'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { postId, userUUID } = await req.json()

    const [post] = await db.query<RowDataPacket[]>(
      'SELECT likes FROM Posts WHERE id = ?',
      [postId]
    )
    const likes = post[0]?.likes

    // 좋아요 추가 또는 제거
    const updatedLikes = likes.includes(userUUID)
      ? likes.filter((id: number) => id !== userUUID)
      : [...likes, userUUID]

    await db.query('UPDATE Posts SET likes = ? WHERE id = ?', [
      JSON.stringify(updatedLikes),
      postId,
    ])

    return NextResponse.json(
      { message: 'Like Success', likes: updatedLikes },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error updating likes:', error)
    return NextResponse.json(
      { message: 'Failed to update likes' },
      { status: 500 }
    )
  }
}
