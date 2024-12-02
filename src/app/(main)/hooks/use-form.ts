import { useRouter } from 'next/navigation'
import { FieldValues, useForm } from 'react-hook-form'

export const useFormHook = <T extends FieldValues>() => {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitted, isSubmitting, errors },
  } = useForm<T>()

  //   Login Submit
  const handleLoginSubmitForm = async (data: T) => {
    await new Promise((r) => setTimeout(r, 1000))

    console.log(data)
  }

  // Sign Up Submit
  const handlerSignUpSubmitForm = async (data: T) => {
    await new Promise((r) => setTimeout(r, 1000))

    try {
      const response = await fetch('/api/users/signUp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (window.confirm(result.message)) {
        router.push('/login')
      }
    } catch (error) {
      console.warn('SignUP Error', error)
    }
  }

  return {
    register,
    handleSubmit,
    isSubmitted,
    isSubmitting,
    errors,
    watch,
    handleLoginSubmitForm,
    handlerSignUpSubmitForm,
  }
}
