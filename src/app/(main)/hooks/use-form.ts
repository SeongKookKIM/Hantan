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

      switch (response.status) {
        case 201:
          if (window.confirm(result.message)) {
            router.push('/login')
          }
          break
        default:
          window.confirm(result.message)
      }
    } catch (error) {
      console.warn('SignUP Error', error)
    }
  }

  // User Find ID
  const handlerFindUserId = async (data: T) => {
    await new Promise((r) => setTimeout(r, 1000))

    try {
      const response = await fetch('/api/users/findId', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      switch (response.status) {
        case 201:
          setIsFind(true)
          setFindUserId(result.userId)
          break
        default:
          setIsFind(true)
          setFindUserId('')
      }
    } catch (error) {
      console.warn('Find ID Error', error)
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
    handlerFindUserId,
    isFind,
    findUserId,
  }
}
