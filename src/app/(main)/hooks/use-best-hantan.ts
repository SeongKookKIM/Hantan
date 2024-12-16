import { useQuery } from '@tanstack/react-query'

export const useBestHantans = () => {
  return useQuery({
    queryKey: ['bestPosts'],
    queryFn: async () => {
      const response = await fetch('/api/posts/bestHantan')

      if (!response.ok) {
        throw new Error('Failed to fetch bestPost Data')
      }

      const result = await response.json()

      return result.data
    },
    staleTime: 0,
    refetchOnMount: true,
  })
}
