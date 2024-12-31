import { cn } from '@/lib/utils'
import { HTMLAttributes } from 'react'
import { useComment } from '../../(post)/[id]/hook/use-comment'

export interface HantanCommentListProps extends HTMLAttributes<HTMLDivElement> {
  postUUID: string
}

export default function HantanCommentList({
  className,
  postUUID,
  ...props
}: HantanCommentListProps) {
  const { data, isLoading, error } = useComment(postUUID)

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (error) {
    throw new Error(error.message)
  }

  return (
    <div className={cn(className, 'mt-10')} {...props}>
      <ul>
        <li className={'py-5 border-b-2 border-gray-300 last:border-b-0'}>
          <p className={'font-semibold text-xl'}>유저네임 </p>
          <textarea
            name="HantanComment"
            typeof="text"
            defaultValue={
              'Test입니다.Test입니다.Test입니다.Test입니다.Test입니다.Test입니다.Test입니다.Test입니다.Test입니다.Test입니다.Test입니다.Test입니다.'
            }
            readOnly={true}
            className={'w-full resize-none block outline-none mt-3'}
            ref={(textarea) => {
              if (textarea) {
                textarea.style.height = 'auto'
                textarea.style.height = `${textarea.scrollHeight}px`
              }
            }}
          ></textarea>
          <span
            className={
              'block mt-3 w-full text-secondary font-semibold text-base text-right'
            }
          >
            2024-11-20
          </span>
        </li>
        {/*  */}
        <li className={'py-5 border-b-2 border-gray-300 last:border-b-0'}>
          <p className={'font-semibold text-xl'}>유저네임 </p>
          <textarea
            name="HantanComment"
            typeof="text"
            defaultValue={
              'Test입니다.Test입니다.Test입니다.Test입니다.Test입니다.Test입니다.Test입니다.Test입니다.Test입니다.Test입니다.Test입니다.Test입니다.'
            }
            readOnly={true}
            className={'w-full resize-none block outline-none mt-3'}
            ref={(textarea) => {
              if (textarea) {
                textarea.style.height = 'auto'
                textarea.style.height = `${textarea.scrollHeight}px`
              }
            }}
          ></textarea>
          <span
            className={
              'block mt-3 w-full text-secondary font-semibold text-base text-right'
            }
          >
            2024-11-20
          </span>
        </li>
        <li className={'py-5 border-b-2 border-gray-300 last:border-b-0'}>
          <p className={'font-semibold text-xl'}>유저네임 </p>
          <textarea
            name="HantanComment"
            typeof="text"
            defaultValue={
              'Test입니다.Test입니다.Test입니다.Test입니다.Test입니다.Test입니다.Test입니다.Test입니다.Test입니다.Test입니다.Test입니다.Test입니다.'
            }
            readOnly={true}
            className={'w-full resize-none block outline-none mt-3'}
            ref={(textarea) => {
              if (textarea) {
                textarea.style.height = 'auto'
                textarea.style.height = `${textarea.scrollHeight}px`
              }
            }}
          ></textarea>
          <span
            className={
              'block mt-3 w-full text-secondary font-semibold text-base text-right'
            }
          >
            2024-11-20
          </span>
        </li>
        <li className={'py-5 border-b-2 border-gray-300 last:border-b-0'}>
          <p className={'font-semibold text-xl'}>유저네임 </p>
          <textarea
            name="HantanComment"
            typeof="text"
            defaultValue={
              'Test입니다.Test입니다.Test입니다.Test입니다.Test입니다.Test입니다.Test입니다.Test입니다.Test입니다.Test입니다.Test입니다.Test입니다.Test입니다.Test입니다.Test입니다.Test입니다.Test입니다.Test입니다.Test입니다.Test입니다.Test입니다.Test입니다.Test입니다.Test입니다.Test입니다.Test입니다.Test입니다.Test입니다.Test입니다.Test입니다.Test입니다.Test입니다.Test입니다.Test입니다.Test입니다.Test입니다.Test입니다.Test입니다.Test입니다.Test입니다.Test입니다.Test입니다.Test입니다.Test입니다.Test입니다.Test입니다.Test입니다.Test입니다.'
            }
            readOnly={true}
            className={'w-full resize-none block outline-none mt-3'}
            ref={(textarea) => {
              if (textarea) {
                textarea.style.height = 'auto'
                textarea.style.height = `${textarea.scrollHeight}px`
              }
            }}
          ></textarea>
          <span
            className={
              'block mt-3 w-full text-secondary font-semibold text-base text-right'
            }
          >
            2024-11-20
          </span>
        </li>
      </ul>
    </div>
  )
}
