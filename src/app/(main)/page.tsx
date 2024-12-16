'use client'

import HantanCardList from './components/hantan-list'
import HantanCard from './components/hatan-card'
import { useBestHantans } from './hooks/use-best-hantan'
import { useDate } from './hooks/use-date'

export default function Main() {
  const { formattedDate } = useDate()

  const { data } = useBestHantans()

  return (
    <main className="mt-5">
      <div>
        <label className={'text-2xl font-bold'}>베스트 한탄</label>

        {data ? (
          <HantanCard
            id={data.id}
            userId={data.userId}
            title={data.title}
            content={data.content}
            date={data.date}
            watched={data.watched}
            likes={data.likes}
            isBest={true}
          />
        ) : (
          <div className={'w-full h-[100] flex items-center justify-center'}>
            <p className={'font-semibold text-lg text-primary'}>
              금일 베스트 한탄이 존재하지 않습니다...
            </p>
          </div>
        )}
      </div>

      <div className="mt-10">
        <label className={'text-2xl font-bold flex gap-2 items-end'}>
          오늘의 한탄
          <span className="text-lg text-secondary">({formattedDate})</span>
        </label>
        <HantanCardList />
      </div>
    </main>
  )
}
