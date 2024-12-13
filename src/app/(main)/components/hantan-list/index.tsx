import React, { HTMLAttributes } from 'react'
import HantanCard from '../hatan-card'
import { cn } from '@/lib/utils'
import { getHantans } from '@/action/get-hantans'
import Image from 'next/image'

export default function HantanCardList({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  const { data, isLoading, error } = getHantans()

  console.log(data)

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

      {/* Data가 존재 하지 않을 경우 */}
      {data?.pages[0].length === 0 && (
        <div
          className={'w-full flex flex-col items-center justify-center mt-5'}
        >
          <Image src={'/sorry.jpg'} alt="Sorry_Logo" width={250} height={250} />
          <p className={'font-semibold text-lg text-primary text-center'}>
            금일 한탄 목록이 존재하지 않습니다...
            <br />
            여러분의 한탄을 공유해주세요!
          </p>
        </div>
      )}
    </main>
  )
}
