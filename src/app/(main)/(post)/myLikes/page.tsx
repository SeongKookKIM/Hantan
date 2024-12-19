'use client'

import { PostDetail } from '@/schemas/post'
import { useMyLikes } from '../../hooks/use-my-likes'
import React from 'react'
import HantanCard from '../../components/hatan-card'
import Image from 'next/image'

export default function MyLikes() {
  const { data, isLoading, error } = useMyLikes()

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (error) {
    throw new Error(error.message)
  }

  return (
    <main className={'h-screenVH min-h-[600] mt-5'}>
      <h4 className={'text-2xl font-bold'}>내가 좋아요 한 한탄</h4>
      {data.length !== 0 ? (
        <div className={'pb-10'}>
          {data.map((post: PostDetail) => (
            <React.Fragment key={post.id}>
              <p className={'text-2xl font-semibold text-primary mt-[30]'}>
                {post.date.split('T')[0]}
              </p>
              <HantanCard
                id={post.id}
                userId={post.userId}
                title={post.title}
                content={post.content}
                date={post.date}
                watched={post.watched}
                likes={post.likes}
              />
            </React.Fragment>
          ))}
        </div>
      ) : (
        <div
          className={'w-full h-full flex flex-col items-center justify-center '}
        >
          <Image src={'/sorry.jpg'} alt="Sorry_Logo" width={250} height={250} />
          <p className={'font-semibold text-lg text-primary text-center'}>
            내가 좋아요 한 목록이 존재하지 않습니다...
            <br />
            한탄 글에 좋아요를 눌러주세요!
          </p>
        </div>
      )}
    </main>
  )
}
