import { useNavigate } from 'react-router-dom'
import { FiMenu } from 'react-icons/fi'
import { ROUTES } from '@/utils/constants'
import CartButton from './CartButton'
import UserButton from './UserButton'

const MobileHeader = () => {
  const navigate = useNavigate()

  return (
    <div
      className='grid h-[76px] grid-cols-[auto_1fr_auto] items-center gap-x-3 px-4 lg:hidden'
      style={{
        backgroundImage: `linear-gradient(var(--color-cream-98), var(--color-cream-98)), url('/background.png')`,
      }}
    >
      <button className='text-green cursor-pointer'>
        <FiMenu className='h-6 w-6' />
      </button>

      <button
        className='text-green cursor-pointer justify-self-start text-3xl font-bold'
        onClick={() => navigate(ROUTES.HOME)}
      >
        TBP
      </button>

      <div className='flex items-center gap-x-8'>
        <UserButton />
        <CartButton />
      </div>
    </div>
  )
}

export default MobileHeader
