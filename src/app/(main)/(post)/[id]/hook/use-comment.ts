import { getHantanComment } from '@/action/get-comment'
import { useQuery } from '@tanstack/react-query'

export const useComment = (postUUID: string) => {
  return useQuery({
    queryKey: ['comment', postUUID],
    queryFn: async () => {
      const res = await getHantanComment(postUUID)

      if (res.status === 'error') {
        throw new Error(res.error)
      }

      console.log('UseComment: ', res)

      return res.data
    },
  })
}
