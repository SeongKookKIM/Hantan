'use client'

import { useSessionStorage } from '@uidotdev/usehooks'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export const useLaunchScreen = () => {
  const [isVisited, setIsVisited] = useSessionStorage('isVisited', false)

  const router = useRouter()

  useEffect(() => {
    if (!isVisited) {
      const timer = setTimeout(() => {
        setIsVisited(true)
        router.push('/main')
      }, 2700)

      return () => {
        clearTimeout(timer)
      }
    } else {
      router.push('/main')
    }
  }, [isVisited, setIsVisited])
}
