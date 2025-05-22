import { useLocation } from 'react-router-dom'
import { ResetPassword, Login as LoginPage } from '@/components/Login'

const Login = () => {
  const location = useLocation()

  return (
    <div className='mx-auto flex w-[100dvw] max-w-6xl flex-col items-center'>
      {location.hash === '#recover' ? <ResetPassword /> : <LoginPage />}
    </div>
  )
}

export default Login
