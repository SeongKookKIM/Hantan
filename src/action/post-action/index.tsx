interface FetchParams<T> {
  url: string
  body: T
}

interface MutationCallbacks<R> {
  onSuccess: (result: R) => void
  onError: (error: { message: string; status: number | undefined }) => void
}

export const usePostMutation = <T, R>() => {
  const mutate = async (
    { url, body }: FetchParams<T>,
    { onSuccess, onError }: MutationCallbacks<R>
  ): Promise<void> => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: body ? JSON.stringify(body) : undefined,
      })

      const result = await response.json()

      if (response.ok) {
        onSuccess?.(result)
      } else {
        const errorObject = {
          message: result?.message || 'Request failed',
          status: response.status,
        }
        onError?.(errorObject)
      }
    } catch (err) {
      const errorObject = { message: 'Network error', status: undefined }
      onError?.(errorObject)
    }
  }

  return { mutate }
}
