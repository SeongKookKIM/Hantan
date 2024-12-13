'use client'

import HantanCardList from './components/hantan-list'
import HantanCard from './components/hatan-card'
import { useBestHantans } from './hooks/use-best-hantan'
import { useDate } from './hooks/use-date'

export default function Main() {
  const { formattedDate } = useDate()

  const { data, isLoading, error } = useBestHantans()

  return (
    <main className="mt-5">
      <div>
        <label className={'text-2xl font-bold'}>베스트 한탄</label>
        {isLoading && <p>Loading</p>}
        {error && <p>Error</p>}
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
          <p>없음.</p>
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
