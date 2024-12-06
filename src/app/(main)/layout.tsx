import { PropsWithChildren, Suspense } from 'react'
import { Metadata } from 'next'
import { MainHeader } from './components/main-header'

export const metadata: Metadata = {
  title: 'Hantan Main',
  description: 'Hatan Main',
}

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <main className={'container max-w-[700] pb-10'}>
      <MainHeader />
      <Suspense>{children}</Suspense>
    </main>
  )
}
