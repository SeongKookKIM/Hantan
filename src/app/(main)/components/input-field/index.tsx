import { cn } from '@/lib/utils'
import { FieldError, UseFormRegisterReturn } from 'react-hook-form'

export interface InputFieldProps {
  type: string
  id: string
  className?: string
  placeholder: string
  error?: FieldError
  register: UseFormRegisterReturn
  isSubmitted: boolean
}

export default function InputField({
  type,
  id,
  className,
  placeholder,
  error,
  register,
  isSubmitted,
}: InputFieldProps) {
  return (
    <input
      type={type}
      id={id}
      placeholder={placeholder}
      className={cn('input-field', className)}
      aria-invalid={isSubmitted ? (error ? 'true' : 'false') : undefined}
      {...register}
    />
  )
}
