import { UserData } from '@/schemas/user'
import { useQuery, useQueryClient } from '@tanstack/react-query'

export const useAuth = () => {
  const queryClient = useQueryClient()

  const { data } = useQuery<UserData>({
    queryKey: ['auth'],
    queryFn: () =>
      queryClient.getQueryData(['auth']) || { user: null, isLogin: false },
    staleTime: Infinity,
    initialData: { user: null, isLogin: false },
  })

  return {
    data,
  }
}
