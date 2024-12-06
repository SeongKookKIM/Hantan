import { PropsWithChildren, Suspense } from 'react'
import { Metadata } from 'next'
import { Bell, Menu } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useAuth } from '@/action/get-auth'
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
