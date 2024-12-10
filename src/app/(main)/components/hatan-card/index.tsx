import { useState, type HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import { useTextArea } from '../../hooks/use-textarea-height'
import { Eye, Heart, MessageCircle } from 'lucide-react'

export default function HantanCard({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  const [text, setText] = useState<string>(
    "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
  )

  const { textAreaRef } = useTextArea({ value: text })

  return (
    <main className={cn(className)} {...props}>
      <textarea
        name="bestHantan"
        ref={textAreaRef}
        typeof="text"
        defaultValue={text}
        readOnly={true}
        className={'text-area'}
      ></textarea>

      {/* Like, Comment, Watched */}
      <ul className="flex gap-4 mt-3">
        <li className="common-icon">
          <Heart size={30} color="#540075" className="cursor-pointer" />
          <span>5</span>
        </li>
        <li className="common-icon">
          <MessageCircle size={30} color="#540075" className="cursor-pointer" />
          <span>10</span>
        </li>
        <li className="common-icon">
          <Eye size={30} color="#540075" className="cursor-default" />
          <span>1000</span>
        </li>
      </ul>
    </main>
  )
}
