import { usePostMutation } from '@/action/post-action'
import { UserData } from '@/schemas/user'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { useAuth } from './use-auth'
import { v4 as uuidv4 } from 'uuid'

export const useFormHook = <T extends FieldValues>() => {
  const router = useRouter()
  const [isFind, setIsFind] = useState<boolean>(false)
  const [findUserId, setFindUserId] = useState<string>()

  const queryClient = useQueryClient()
  const { data } = useAuth()
  const authData = data

  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitted, isSubmitting, errors },
  } = useForm<T>()

  const { mutate } = usePostMutation<T, any>()

  // Login Submit
  const handleLoginSubmitForm = async (data: T) => {
    await new Promise((r) => setTimeout(r, 1000))

    await mutate(
      { url: '/api/users/login', body: data },
      {
        onSuccess: (result: UserData) => {
          const { user, isLogin } = result

          queryClient.setQueryData(['auth'], { user, isLogin })

          router.push('/')
        },
        onError: (error) => {
          console.log('Login Error', error)
          alert(error.message)
        },
      }
    )
  }

  // Sign Up Submit
  const handlerSignUpSubmitForm = async (data: T) => {
    await new Promise((r) => setTimeout(r, 1000))

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
    await new Promise((r) => setTimeout(r, 1000))

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
    await new Promise((r) => setTimeout(r, 1000))

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
    await new Promise((r) => setTimeout(r, 1000))

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

  // Hantan Write
  const handlerPostWrite = async (data: T) => {
    await new Promise((r) => setTimeout(r, 1000))

    const id = uuidv4()
    const userId = authData.user?.userId

    await mutate(
      { url: '/api/posts/write', body: { ...data, id, userId } },
      {
        onSuccess: () => {
          router.push('/')
        },
        onError: (error) => {
          console.warn('Post Write Error:', error)
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
    handlerPostWrite,
    isFind,
    findUserId,
  }
}
