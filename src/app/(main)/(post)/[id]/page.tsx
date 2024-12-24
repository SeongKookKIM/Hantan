'use client'

import { use } from 'react'
import { useHantan } from './hook/use-hantan'

export interface HantansDetailPageProps {
  params: Promise<{ id: string }>
}

export default function HantansDetailPage({ params }: HantansDetailPageProps) {
  const { id } = use(params)

  const { data, isLoading, error } = useHantan(id)

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    throw new Error(error.message)
  }

  if (!data) {
    return <div>데이터를 불러오는데 실패하였습니다. 다시 시도해주세요.</div>
  }

  return (
    <main className={'h-screenVH min-h-[600] py-5'}>
      <h4 className={'text-2xl font-bold w-full'}>{data.title}</h4>
      <span className={'block w-full text-secondary font-semibold mt-1'}>
        {data.date.split('T')[0]}
      </span>

      <hr className={'w-full border my-3'} />

      <textarea
        name="HantanDetail"
        typeof="text"
        defaultValue={data.content}
        readOnly={true}
        className={
          'w-full resize-none block outline-none text-xl font-semibold h-auto min-h-[200] overflow-hidden'
        }
        ref={(textarea) => {
          if (textarea) {
            textarea.style.height = 'auto'
            textarea.style.height = `${textarea.scrollHeight}px`
          }
        }}
      ></textarea>

      {/* Comment */}
      <h1>댓글</h1>
    </main>
  )
}
