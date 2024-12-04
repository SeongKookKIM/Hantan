'use client'

import { useEffect, useState } from 'react'

export const useLaunchScreen = () => {
  const [isLaunching, setIsLaunching] = useState(true)

  useEffect(() => {
    const visited = sessionStorage.getItem('isVisited') === 'true'

    if (!visited) {
      const timer = setTimeout(() => {
        sessionStorage.setItem('isVisited', 'true')
        setIsLaunching(false)
      }, 2700)

      return () => clearTimeout(timer)
    } else {
      setIsLaunching(false)
    }
  }, [])

  return { isLaunching }
}
