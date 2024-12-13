import { type HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import { useTextArea } from '../../hooks/use-textarea-height'
import { Eye, Heart, MessageCircle } from 'lucide-react'
import { useLike } from '../../hooks/use-like'

export interface HantanCardProps extends HTMLAttributes<HTMLDivElement> {
  id: string
  userId: string
  title: string
  content: string
  date: string
  watched: number
  likes: number[]
}

export default function HantanCard({
  className,
  id,
  userId,
  title,
  content,
  date,
  watched,
  likes = [],
  ...props
}: HantanCardProps) {
  const { textAreaRef } = useTextArea({ value: content })

  const { isLike, handlerLikeButton, authData } = useLike(likes, id)

  return (
    <main className={cn(className)} {...props}>
      <textarea
        name="bestHantan"
        ref={textAreaRef}
        typeof="text"
        defaultValue={content}
        readOnly={true}
        className={'text-area'}
      ></textarea>

      {/* Like, Comment, Watched */}
      <ul className="flex gap-4 mt-3">
        <li className="common-icon">
          <Heart
            size={30}
            color="#540075"
            fill={
              isLike.includes(authData.user?.id as number) ? '#540075' : 'none'
            }
            className="cursor-pointer"
            onClick={handlerLikeButton}
          />
          <span>{isLike.length}</span>
        </li>
        <li className="common-icon">
          <MessageCircle size={30} color="#540075" className="cursor-pointer" />
          {/* post ID로 Comment테이블에서 가져오기 */}
          <span>0</span>
        </li>
        <li className="common-icon">
          <Eye size={30} color="#540075" className="cursor-default" />
          <span>0</span>
        </li>
      </ul>
    </main>
  )
}
