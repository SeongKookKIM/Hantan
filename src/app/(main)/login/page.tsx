'use client'

import { usePathname } from 'next/navigation'

export default function Login() {
  const location = usePathname()
  console.log(location)

  return <main className={'mt-5'}>로그인 페이지</main>
}
