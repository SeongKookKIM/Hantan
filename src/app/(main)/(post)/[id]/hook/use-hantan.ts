import { getHantan } from '@/action/get-hantan'
import { useQuery } from '@tanstack/react-query'

export const useHantan = (id: string) => {
  return useQuery({
    queryKey: ['hantan', id],
    queryFn: async () => {
      const res = await getHantan(id)

      return res
    },
  })
}
