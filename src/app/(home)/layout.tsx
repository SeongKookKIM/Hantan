import { PropsWithChildren } from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hantan',
  description: 'Hatan Launch Screen!',
}
export default function LaunchScreenLayout({ children }: PropsWithChildren) {
  return <main>{children}</main>
}
