import { useForm } from 'react-hook-form'

export const useFormHook = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitted, isSubmitting, errors },
  } = useForm()

  return { register, handleSubmit, isSubmitted, isSubmitting, errors }
}
