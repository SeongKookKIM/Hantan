import { useState } from 'react'
import { useAuth } from './use-auth'
import { usePostMutation } from '@/action/post-action'

export const useLike = (likes: number[], postId: string) => {
  const { data: authData } = useAuth()
  const [isLike, setIsLike] = useState<number[]>(likes)

  const { mutate } = usePostMutation()

  const handlerLikeButton = async () => {
    if (!authData) {
      alert('로그인이 필요합니다.')
      return
    }

    const userUUID = authData.user?.id
    if (userUUID === undefined) return

    // Like Toggle
    const liked = isLike.includes(userUUID)
    const updateLiked = liked
      ? isLike.filter((id) => id !== userUUID)
      : [...isLike, userUUID]

    setIsLike(updateLiked)

    await mutate(
      { url: '/api/posts/like', body: { postId, userUUID } },
      {
        onSuccess: (result) => {
          console.log('Like updated successfully', result)
        },
        onError: (error) => {
          console.error('Error updating like:', error)
          alert(error.message)

          setIsLike(
            liked
              ? [...isLike, userUUID]
              : isLike.filter((id) => id !== userUUID)
          )
        },
      }
    )
  }

  return { isLike, handlerLikeButton, authData }
}
