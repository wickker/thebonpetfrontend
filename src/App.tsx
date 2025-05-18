import { BrowserRouter, Route, Routes } from 'react-router'
import { NavigationBar } from '@/components'
import { ROUTES } from '@/utils/constants'
import Home from '@/views/Home'
import Login from '@/views/Login'

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<NavigationBar />}>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
      </Route>
    </Routes>
  </BrowserRouter>
)

export default App
