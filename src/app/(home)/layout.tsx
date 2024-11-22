import { PropsWithChildren, Suspense } from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hantan Home',
  description: 'Hatan Main Home',
}

export default function HomeLayout({ children }: PropsWithChildren) {
  return (
    <main className={'py-10'}>
      <Suspense>{children}</Suspense>
    </main>
  )
}
