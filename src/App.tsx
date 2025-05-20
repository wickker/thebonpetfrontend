import { BrowserRouter, Route, Routes } from 'react-router'
import { QueryClientProvider } from '@tanstack/react-query'
import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { NavigationBar } from '@/components/commons'
import { useToastContext } from '@/contexts/useToastContext/context'
import { ROUTES } from '@/utils/constants'
import Home from '@/views/Home'
import Login from '@/views/Login'
import SubmitNewPassword from './views/SubmitNewPassword'

const App = () => {
  const { toast } = useToastContext()

  const handleError = (err: AxiosError | Error) => {
    if (err instanceof AxiosError) {
      toast.error({ message: err.message })
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

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<NavigationBar />}>
            <Route path={ROUTES.HOME} element={<Home />} />
            <Route path={ROUTES.LOGIN} element={<Login />} />
            <Route
              path={ROUTES.SUBMIT_NEW_PASSWORD}
              element={<SubmitNewPassword />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
