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

  console.log(data)

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (error) {
    throw new Error(error.message)
  }

  if (!data) {
    return (
      <p className={'w-full text-center mt-20 font-semibold'}>
        댓글이 존재하지 않습니다...
      </p>
    )
  }

  return (
    <div className={cn(className, 'mt-10')} {...props}>
      <ul>
        {data.map((comment, index) => {
          return (
            <li
              className={'py-5 border-b-2 border-gray-300 last:border-b-0'}
              key={index}
            >
              <p className={'font-semibold text-xl'}>
                익명자{comment.userUUID} 님
              </p>
              <textarea
                name="HantanComment"
                typeof="text"
                defaultValue={comment.content}
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
                {comment.date.split('T')[0]}
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
