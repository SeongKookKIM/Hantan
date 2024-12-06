import { getAuth } from '@/action/get-auth'
import { UserData } from '@/schemas/user'
import { useQuery, useQueryClient } from '@tanstack/react-query'

export const useGetAuth = () => {
  const queryClient = useQueryClient()

  try {
    const data = useQuery<UserData>({
      queryKey: ['auth'],
      queryFn: async () => {
        const res = await getAuth()

        queryClient.setQueryData<UserData>(['auth'], (oldData) => {
          return {
            user: res.user ?? oldData?.user ?? null,
            isLogin: res.isLogin ?? oldData?.isLogin ?? false,
          }
        })

        return res
      },
      staleTime: 0,
      initialData: { user: null, isLogin: false },
    })

    return data
  } catch {
    console.warn('실패')
  }
}
