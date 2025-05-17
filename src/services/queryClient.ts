import { toast } from 'react-toastify'
import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'

const handleError = (err: AxiosError | Error) => {
  if (err instanceof AxiosError) {
    toast.error(err.message)
    return
  }

  console.log('Error : ', err)
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000,
    },
  },
  queryCache: new QueryCache({
    onError: handleError,
  }),
  mutationCache: new MutationCache({
    onError: handleError,
  }),
})

export default queryClient
