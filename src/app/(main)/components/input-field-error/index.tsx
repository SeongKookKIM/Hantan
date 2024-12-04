import { FieldError } from 'react-hook-form'
import { cn } from '@/lib/utils'

interface ErrorMessageProps {
  error?: FieldError
  className?: string
}

export default function ErrorMessage({
  error,
  className = '',
}: ErrorMessageProps) {
  if (!error) return null

  return (
    <p className={cn('text-error', className)}>{error.message?.toString()}</p>
  )
}
