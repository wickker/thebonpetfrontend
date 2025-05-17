import { BrowserRouter, Route, Routes } from 'react-router'
import { RefreshTokenRequired } from '@/components'
import { ROUTES } from '@/utils/constants'
import Home from '@/views/Home'
import Login from '@/views/LoginBeta'
import LoginResolve from '@/views/LoginResolve'

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<RefreshTokenRequired />}>
        <Route path={ROUTES.HOME} element={<Home />} />
      </Route>

      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.LOGIN_RESOLVE} element={<LoginResolve />} />
    </Routes>
  </BrowserRouter>
)

export default App
