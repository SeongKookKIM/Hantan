'use client'

import HantanCard from './components/hatan-card'

export default function Home() {
  return (
    <main className="mt-5">
      <div>
        <label className={'text-3xl font-bold'}>오늘의 베스트 한탄</label>
        <HantanCard />
      </div>
    </main>
  )
}
