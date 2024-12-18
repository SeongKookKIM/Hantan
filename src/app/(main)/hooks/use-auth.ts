import { UserData } from '@/schemas/user'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

export const useAuth = () => {
  const queryClient = useQueryClient()

  const router = useRouter()

  const { data } = useQuery<UserData>({
    queryKey: ['auth'],
    queryFn: () =>
      queryClient.getQueryData(['auth']) || { user: null, isLogin: false },
    staleTime: Infinity,
    initialData: { user: null, isLogin: false },
  })

  const logout = async () => {
    try {
      await fetch('/api/users/logout', { method: 'POST' })

      queryClient.setQueryData(['auth'], { user: null, isLogin: false })

      router.push('/login')
    } catch (error) {
      console.error('Logout Error', error)
    }
  }

  return {
    data,
    logout,
  }
}
