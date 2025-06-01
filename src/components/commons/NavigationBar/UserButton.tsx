import { useNavigate } from 'react-router-dom'
import { FaCheck } from 'react-icons/fa6'
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
    <button className='relative cursor-pointer' onClick={handleClickUserIcon}>
      <img src='/icons/user.png' alt='User icon' className='h-5 w-5' />

      {isLoggedIn && (
        <div className='bg-green absolute right-[-8px] bottom-[-6px] grid h-4 w-4 place-items-center rounded-full text-[8px] text-white'>
          <FaCheck className='text-white' />
        </div>
      )}
    </button>
  )
}

export default UserButton
