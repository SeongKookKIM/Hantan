import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const postId = searchParams.get('id')
    console.log('postId', postId)

    return NextResponse.json({ data: 123 }, { status: 201 })
  } catch (error) {
    console.error('Error fetching post:', error)
    return NextResponse.json({ data: null }, { status: 500 })
  }
}
