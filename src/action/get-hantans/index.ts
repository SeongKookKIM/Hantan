import { useScroll } from '@/app/(main)/hooks/use-scroll'
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'

export const getHantans = () => {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await fetch(`/api/posts?page=${pageParam}`)

      if (!response.ok) {
        throw new Error('Failed to fetch posts')
      }

      const result = await response.json()

      return result.data
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 20 ? allPages.length + 1 : undefined
    },
    gcTime: 1000 * 60 * 5,
    staleTime: 1000 * 60,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })

  useScroll({ fetchNextPage, hasNextPage: hasNextPage, isFetchingNextPage })

  return {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  }
}
