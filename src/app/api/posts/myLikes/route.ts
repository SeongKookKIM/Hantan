import { db } from '@/lib/database'
import { RowDataPacket } from 'mysql2'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const userUUID = searchParams.get('userUUID')

    if (!userUUID) {
      return NextResponse.json(
        { message: 'userUUID가 누락되었습니다.', data: [] },
        { status: 400 }
      )
    }

    // useUUID Number로 타입변경
    const isNumberUserUUID: number = Number(userUUID)

    const [rows] = await db.query<RowDataPacket[]>(
      `
        SELECT *
        FROM Posts
        WHERE JSON_CONTAINS(likes, JSON_ARRAY(?))
        ORDER BY date DESC
        `,
      [isNumberUserUUID]
    )

    if (rows.length === 0) {
      return NextResponse.json(
        {
          message: 'Likes 배열에 userId가 포함된 데이터가 없습니다.',
          data: [],
        },
        { status: 201 }
      )
    }

    return NextResponse.json({ data: rows }, { status: 201 })
  } catch (error) {
    console.error('My Hantan Likes Error:', error)

    return NextResponse.json(
      {
        message:
          '내가 좋아요 한 한탄 목록을 가져오는 중 문제가 발생하였습니다.',
      },
      { status: 500 }
    )
  }
}
