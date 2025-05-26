import { useLocation, useNavigate } from 'react-router-dom'
import { ROUTES } from '@/utils/constants'
import { cn } from '@/utils/functions'
import CartButton from './CartButton'
import { desktopNavigationItems } from './utils'

type DesktopHeaderProps = {
  onClickUserIcon: () => void
}

const DesktopHeader = ({ onClickUserIcon }: DesktopHeaderProps) => {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div
      className='hidden h-[76px] grid-cols-[auto_1fr_auto] items-center gap-x-2 lg:grid lg:px-12'
      style={{
        backgroundImage: `linear-gradient(var(--color-cream-98), var(--color-cream-98)), url('/background.png')`,
      }}
    >
      <button
        className='text-green cursor-pointer text-3xl font-bold'
        onClick={() => navigate(ROUTES.HOME)}
      >
        TBP
      </button>

      <div className='mx-auto flex items-center gap-x-8 xl:gap-x-12'>
        {desktopNavigationItems.map((item, index) => {
          const isSelected = location.pathname === item.route

          return (
            <button
              className='text-green flex cursor-pointer flex-col items-center font-bold'
              key={item.label}
              onClick={() => navigate(item.route)}
            >
              <div className='flex items-center gap-x-1'>
                {index === 0 && (
                  <img
                    src='/icons/dog.png'
                    alt='Dog icon'
                    className='h-5 w-5'
                  />
                )}
                {index === 1 && (
                  <img
                    src='/icons/cat.png'
                    alt='Cat icon'
                    className='h-5 w-5'
                  />
                )}
                {item.label}
              </div>
              <div
                className={cn(
                  'h-[2px] w-full max-w-0 rounded-full transition-all',
                  isSelected && 'bg-green max-w-full'
                )}
              />
            </button>
          )
        })}
      </div>

      <div className='flex items-center gap-x-8'>
        <button onClick={onClickUserIcon} className='cursor-pointer'>
          <img src='/icons/user.png' alt='User' className='h-5 w-5' />
        </button>

        <CartButton />
      </div>
    </div>
  )
}

export default DesktopHeader
