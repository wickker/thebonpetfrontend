import { RefObject, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { FaCheck } from 'react-icons/fa6'
import { FiMenu } from 'react-icons/fi'
import { useOnClickOutside } from 'usehooks-ts'
import { ROUTES } from '@/utils/constants'
import { cn } from '@/utils/functions'
import CartButton from './CartButton'
import UserButton from './UserButton'
import { MOBILE_NAVIGATION_ITEMS } from './utils'

const MobileHeader = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  useOnClickOutside(mobileMenuRef as RefObject<HTMLElement>, () =>
    setIsMenuOpen(false)
  )

  const handleMenuItemClick = (route: string) => {
    setIsMenuOpen(false)
    navigate(route)
  }

  return (
    <div
      className='relative grid h-[76px] grid-cols-[auto_1fr_auto] items-center gap-x-3 px-4 lg:hidden'
      style={{
        backgroundImage: `linear-gradient(var(--color-cream-98), var(--color-cream-98)), url('/background.png')`,
      }}
    >
      <button
        className='text-green cursor-pointer'
        onClick={() => setIsMenuOpen(true)}
      >
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

      <div
        className={cn(
          'bg-cream absolute bottom-0 flex max-h-0 w-full translate-y-full flex-col overflow-hidden shadow-lg transition-all duration-200',
          isMenuOpen && 'max-h-[300px]'
        )}
        ref={mobileMenuRef}
      >
        <div className='text-green flex flex-col items-start gap-y-2 p-4 text-lg font-bold'>
          {MOBILE_NAVIGATION_ITEMS.map((item, index) => {
            const isSelected = location.pathname === item.route

            return (
              <button
                key={item.label}
                className='flex w-full cursor-pointer items-center justify-between'
                onClick={() => handleMenuItemClick(item.route)}
              >
                <div className='flex items-center gap-x-2'>
                  {item.label}
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
                </div>

                {isSelected && <FaCheck className='h-5 w-5' />}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default MobileHeader
