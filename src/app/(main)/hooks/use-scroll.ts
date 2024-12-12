import { useEffect } from 'react'
import throttle from 'lodash/throttle'

export interface UseScrollProps {
  fetchNextPage: () => void
  hasNextPage: boolean
  isFetchingNextPage: boolean
}

export const useScroll = ({
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: UseScrollProps) => {
  // 새로고침 시 상단으로 이동
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // [throttle] 스크롤 중복 방지(스크롤 80%에서 데이터 패칭)
  useEffect(() => {
    const handleScroll = throttle(() => {
      const scrollTop = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight

      if (
        scrollTop + windowHeight >= documentHeight * 0.8 &&
        hasNextPage &&
        !isFetchingNextPage
      ) {
        fetchNextPage()
      }
    }, 300)

    window.addEventListener('scroll', handleScroll)

    return () => {
      handleScroll.cancel()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage])
}
