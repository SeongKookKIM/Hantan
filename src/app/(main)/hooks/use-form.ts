import { usePostMutation } from '@/action/post-action'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'

export const useFormHook = <T extends FieldValues>() => {
  const router = useRouter()
  const [isFind, setIsFind] = useState<boolean>(false)
  const [findUserId, setFindUserId] = useState<string>()

  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitted, isSubmitting, errors },
  } = useForm<T>()

  const { mutate } = usePostMutation<T, any>()

  // Login Submit
  const handleLoginSubmitForm = async (data: T) => {
    console.log(data)
  }

  // Sign Up Submit
  const handlerSignUpSubmitForm = async (data: T) => {
    await mutate(
      { url: '/api/users/signUp', body: data },
      {
        onSuccess: (result) => {
          if (window.confirm(result.message)) {
            router.push('/login')
          }
        },
        onError: (error) => {
          console.warn('Sign Up Error:', error)
          alert(error.message)
        },
      }
    )
  }

  // User Find ID
  const handlerFindUserId = async (data: T) => {
    await mutate(
      { url: '/api/users/findId', body: data },
      {
        onSuccess: (result) => {
          setIsFind(true)
          setFindUserId(result.userId || '')
        },
        onError: (error) => {
          setIsFind(true)
          setFindUserId('')
          console.warn('Find ID Error:', error)
        },
      }
    )
  }

  // User Find Password
  const handlerFindUserPassword = async (data: T) => {
    await mutate(
      { url: '/api/users/findPassword', body: data },
      {
        onSuccess: (result) => {
          router.push(`/findUser/password/reset?id=${result.data.id}`)
        },
        onError: (error) => {
          console.warn('Find Password Error:', error)
          alert(error.message)
        },
      }
    )
  }

  // User Reset Password
  const handlerResetPassword = async (data: T, id: string | null) => {
    await mutate(
      { url: '/api/users/findPassword/reset', body: { ...data, id } },
      {
        onSuccess: () => {
          router.push('/login')
        },
        onError: (error) => {
          console.warn('Reset Password Error:', error)
          alert(error.message)
        },
      }
    )
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
    handlerFindUserId,
    handlerFindUserPassword,
    handlerResetPassword,
    isFind,
    findUserId,
  }
}
