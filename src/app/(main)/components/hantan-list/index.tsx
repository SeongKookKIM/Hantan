import React, { HTMLAttributes } from 'react'
import HantanCard from '../hatan-card'
import { cn } from '@/lib/utils'
import { getHantans } from '@/action/get-hantans'

export default function HantanCardList({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  const { data, isLoading, error } = getHantans()

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (error) {
    throw new Error(error.message)
  }

  return (
    <main className={cn(className, 'flex flex-col gap-5')} {...props}>
      {data?.pages.map((page, pageIndex) => (
        <React.Fragment key={pageIndex}>
          {page.map((item: any, index: number) => (
            <React.Fragment key={index}>
              <HantanCard
                id={item.id}
                userId={item.userId}
                title={item.title}
                content={item.content}
                date={item.date}
                watched={item.watched}
                likes={item.likes}
              />
            </React.Fragment>
          ))}
        </React.Fragment>
      ))}
    </main>
  )
}
