import { BrowserRouter, Route, Routes } from 'react-router'
import { ROUTES } from '@/utils/constants'
import Home from '@/views/Home'

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path={ROUTES.HOME} element={<Home />} />
    </Routes>
  </BrowserRouter>
)

export default App
