import { Route, Routes } from 'react-router'
import { ShopifyAuth } from '@/components'
import Home from '@/views/Home'
import Login from '@/views/Login'

const App = () => (
  <Routes>
    <Route element={<ShopifyAuth />}>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
    </Route>
  </Routes>
)

export default App
