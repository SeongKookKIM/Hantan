import { useEffect, useRef } from 'react'

interface useTextAreaProps {
  value: string
}

export const useTextArea = ({ value }: useTextAreaProps) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto'
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`
    }
  }, [value])

  return { textAreaRef }
}
