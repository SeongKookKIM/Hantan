import { HTMLAttributes } from 'react'
import HantanCard from '../hatan-card'
import { cn } from '@/lib/utils'

export default function HantanCardList({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <main className={cn(className, 'flex flex-col gap-5')} {...props}>
      <HantanCard />
      <HantanCard />
      <HantanCard />
      <HantanCard />
      <HantanCard />
      <HantanCard />
    </main>
  )
}
