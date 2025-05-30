import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/utils/constants'
import { getTokenJsonFromLocalStorage } from '@/utils/functions'

const UserButton = () => {
  const navigate = useNavigate()
  const customerToken = getTokenJsonFromLocalStorage()
  const isLoggedIn = !!customerToken

  const handleClickUserIcon = () => {
    if (isLoggedIn) {
      navigate(ROUTES.ACCOUNT)
      return
    }
    navigate(ROUTES.LOGIN)
  }

  return (
    <button className='cursor-pointer' onClick={handleClickUserIcon}>
      <img src='/icons/user.png' alt='User' className='h-5 w-5' />
    </button>
  )
}

export default UserButton
