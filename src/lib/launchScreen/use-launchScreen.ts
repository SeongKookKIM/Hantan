'use client'

import { useSessionStorage } from '@uidotdev/usehooks'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export const useLaunchScreen = () => {
  const [isVisited, setIsVisited] = useSessionStorage('isVisited', false)
  const [isLaunching, setIsLaunching] = useState(!isVisited)

  useEffect(() => {
    if (!isVisited) {
      const timer = setTimeout(() => {
        setIsVisited(true)
        setIsLaunching(false)
      }, 2700)

      return () => clearTimeout(timer)
    } else {
      setIsLaunching(false)
    }
  }, [isVisited, setIsVisited])

  return { isLaunching }
}
