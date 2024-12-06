import { useQuery, useQueryClient } from '@tanstack/react-query'

export interface userData {
  user: {
    id: string
    userId: string
    userEmail: string
  } | null
  isLogin: boolean
}

export const useAuth = () => {
  const queryClient = useQueryClient()

  const { data } = useQuery<userData>({
    queryKey: ['auth'],
    queryFn: () =>
      queryClient.getQueryData(['auth']) || { user: null, isLogin: false },
    staleTime: Infinity,
    initialData: { user: null, isLogin: false },
  })

  return data
}
