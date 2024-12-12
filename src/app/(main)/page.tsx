'use client'

import HantanCardList from './components/hantan-list'
import HantanCard from './components/hatan-card'
import { useDate } from './hooks/use-date'

export default function Main() {
  const { formattedDate } = useDate()

  // 베스트 한탄 가져오기

  return (
    <main className="mt-5">
      <div>
        <label className={'text-2xl font-bold'}>베스트 한탄</label>
        {/* <HantanCard /> */}
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
