import { useLocation } from 'react-router-dom'
import { ResetPassword, Login as LoginPage } from '@/components/Login'

const Login = () => {
  const location = useLocation()

  return (
    <div className='mx-auto flex max-w-[100dvw] flex-col items-center lg:max-w-6xl'>
      {location.hash === '#recover' ? <ResetPassword /> : <LoginPage />}
    </div>
  )
}

export default Login
