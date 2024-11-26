import { UserLogin } from '@/schemas/user'
import { useForm } from 'react-hook-form'

export const useFormHook = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitted, isSubmitting, errors },
  } = useForm<UserLogin>()

  const handleSubmitForm = async (data: UserLogin) => {
    await new Promise((r) => setTimeout(r, 1000))

    console.log(data)
  }

  return {
    register,
    handleSubmit,
    isSubmitted,
    isSubmitting,
    errors,
    handleSubmitForm,
  }
}
