import { useQuery } from '@tanstack/react-query'
import { useAuth } from './use-auth'

export const useMyLikes = () => {
  const { data: authData } = useAuth()

  if (!authData) {
    console.warn('No Auth Data')
    return { data: null, isLoading: false, error: new Error('No Auth Data') }
  }

  return useQuery({
    queryKey: ['myLikes'],
    queryFn: async () => {
      const query = new URLSearchParams({
        userUUID: authData.user!.id.toString(),
      }).toString()

      const response = await fetch(`/api/posts/myLikes?${query}`)

      if (!response.ok) {
        throw new Error('Failed to fetch My Hantan Likes Data')
      }

      const result = await response.json()

      return result.data
    },
    staleTime: 0,
    refetchOnMount: true,
  })
}
