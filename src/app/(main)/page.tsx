'use client'

import HantanCardList from './components/hantan-list'
import HantanCard from './components/hatan-card'

export default function Main() {
  const newDate = (): string => {
    const todayDate = new Date()

    const year = todayDate.getFullYear()
    const month = String(todayDate.getMonth() + 1).padStart(2, '0')
    const day = String(todayDate.getDate()).padStart(2, '0')

    const formattedDate = `${year}-${month}-${day}`

    return formattedDate
  }

  return (
    <main className="mt-5">
      <div>
        <label className={'text-2xl font-bold'}>베스트 한탄</label>
        <HantanCard />
      </div>
      <div className="mt-10">
        <label className={'text-2xl font-bold flex gap-2 items-end'}>
          오늘의 한탄
          <span className="text-lg text-secondary">({newDate()})</span>
        </label>
        <HantanCardList />
      </div>
    </main>
  )
}
