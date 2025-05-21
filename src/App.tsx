import { BrowserRouter, Route, Routes } from 'react-router'
import { QueryClientProvider } from '@tanstack/react-query'
import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { CheckAuth, NavigationBar } from '@/components/commons'
import { useToastContext } from '@/contexts/useToastContext/context'
import { ROUTES } from '@/utils/constants'
import Account from '@/views/Account'
import FeedingGuide from '@/views/FeedingGuide'
import Home from '@/views/Home'
import Login from '@/views/Login'
import SignUp from '@/views/SignUp'
import SubmitNewPassword from '@/views/SubmitNewPassword'

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
          <Route element={<CheckAuth />}>
            <Route element={<NavigationBar />}>
              <Route path={ROUTES.HOME} element={<Home />} />
              <Route path={ROUTES.DOGS} element={<></>} />
              <Route path={ROUTES.CATS} element={<></>} />
              <Route path={ROUTES.BLOG} element={<></>} />
              <Route path={ROUTES.FEEDING_GUIDE} element={<FeedingGuide />} />
              <Route path={ROUTES.CONTACT} element={<></>} />
              <Route path={ROUTES.PET_FOOD_CALCULATOR} element={<></>} />
              <Route path={ROUTES.DONATE} element={<></>} />

              {/* Shopify route matches */}
              <Route path={ROUTES.ACCOUNT} element={<Account />} />
              <Route path={ROUTES.LOGIN} element={<Login />} />
              <Route
                path={ROUTES.SUBMIT_NEW_PASSWORD}
                element={<SubmitNewPassword />}
              />
              <Route path={ROUTES.SIGNUP} element={<SignUp />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
