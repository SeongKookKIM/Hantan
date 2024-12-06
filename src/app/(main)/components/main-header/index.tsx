'use client'

import { Bell, Menu } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useAuth } from '@/action/get-auth'

export function MainHeader() {
  const auth = useAuth()

  return (
    <header className="flex justify-between items-center">
      <Link href={auth.isLogin ? '/menu' : '/login'}>
        <Menu size={35} strokeWidth={2} color="#540075" />
      </Link>
      <Link href={'/'}>
        <Image src={'/hantan_logo.png'} alt="Logo" width={200} height={100} />
      </Link>
      <Link href={'/'}>
        <Bell size={30} strokeWidth={2} color="#540075" />
      </Link>
    </header>
  )
}
