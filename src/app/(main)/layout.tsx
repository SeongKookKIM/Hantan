import { PropsWithChildren, Suspense } from 'react'
import { Metadata } from 'next'
import { Bell, Menu } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Hantan Main',
  description: 'Hatan Main',
}

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <main className={'container max-w-[700] pb-10'}>
      <header className="flex justify-between items-center">
        <Link href={'/login'}>
          <Menu size={35} strokeWidth={2} color="#540075" />
        </Link>
        <Link href={'/'}>
          <Image src={'/hantan_logo.png'} alt="Logo" width={200} height={100} />
        </Link>
        <Link href={'/'}>
          <Bell size={30} strokeWidth={2} color="#540075" />
        </Link>
      </header>
      <Suspense>{children}</Suspense>
    </main>
  )
}
