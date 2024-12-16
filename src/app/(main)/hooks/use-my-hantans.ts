import { useQuery } from '@tanstack/react-query'
import { useAuth } from './use-auth'

export const useMyHatans = () => {
  const { data: authData } = useAuth()

  if (!authData) {
    console.warn('No Auth Data')
    return { data: null, isLoading: false, error: new Error('No Auth Data') }
  }

  return useQuery({
    queryKey: ['myPosts'],
    queryFn: async () => {
      const query = new URLSearchParams({
        userId: authData.user!.userId.toString(),
      }).toString()

      const response = await fetch(`/api/posts/myHantans?${query}`)

      if (!response.ok) {
        throw new Error('Failed to fetch My Hantans Data')
      }

      const result = await response.json()

      return result.data
    },
    staleTime: 0,
    refetchOnMount: true,
  })
}
