import { useQuery } from '@tanstack/react-query'

export const useBestHantans = () => {
  return useQuery({
    queryKey: ['bestPosts'],
    queryFn: async () => {
      const response = await fetch('/api/posts/best')

      if (!response.ok) {
        throw new Error('Failed to fetch auth data')
      }

      const result = await response.json()

      return result.data
    },
  })
}
