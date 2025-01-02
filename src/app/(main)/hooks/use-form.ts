import { usePostMutation } from '@/action/post-action'
import { UserData } from '@/schemas/user'
import { InfiniteData, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { useAuth } from './use-auth'
import { v4 as uuidv4 } from 'uuid'
import { PostDetail } from '@/schemas/post'

export const useFormHook = <T extends FieldValues>() => {
  const router = useRouter()
  const [isFind, setIsFind] = useState<boolean>(false)
  const [findUserId, setFindUserId] = useState<string>()

  const queryClient = useQueryClient()
  const { data: authData, logout } = useAuth()

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
          new Promise<void>((resolve) => {
            window.confirm('비밀번호가 변경되었습니다. 다시 로그인해주세요.')
            resolve()
          })

          logout()
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
          // 무한 스크롤 캐시 업데이트
          queryClient.setQueryData(['posts'], (oldData: InfiniteData<any>) => {
            if (!oldData) return oldData

            return {
              ...oldData,
              pages: [
                [
                  {
                    id,
                    userId,
                    title: data.title,
                    content: data.content,
                    date: new Date().toISOString(),
                    watched: 0,
                    likes: [],
                  },
                  // 첫 번째 페이지에 새 데이터 추가
                  ...oldData.pages[0],
                ],
                // 나머지 페이지 유지
                ...oldData.pages.slice(1),
              ],
            }
          })

          router.push('/')
        },
        onError: (error) => {
          console.warn('Post Write Error:', error)
          alert(error.message)
        },
      }
    )
  }

  // Hantan Detail Comment
  const handlerPostComment = async (data: T, postDetailData: PostDetail) => {
    const postUUID = postDetailData.id
    const userUUID = authData.user?.id

    await new Promise((r) => setTimeout(r, 1000))

    await mutate(
      {
        url: '/api/posts/comment',
        body: { ...data, postUUID, userUUID },
      },
      {
        onSuccess: (result) => {
          queryClient.resetQueries({ queryKey: ['comment', postUUID] })
          console.log(result.message)
        },
        onError: (error) => {
          console.log('Commnet Error', error)
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
    handlerPostComment,
    isFind,
    findUserId,
  }
}
