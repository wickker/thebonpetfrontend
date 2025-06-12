import { RefObject, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiMenu } from 'react-icons/fi'
import { useOnClickOutside } from 'usehooks-ts'
import { ROUTES } from '@/utils/constants'
import { cn } from '@/utils/functions'
import CartButton from './CartButton'
import UserButton from './UserButton'

const MobileHeader = () => {
  const navigate = useNavigate()
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  useOnClickOutside(mobileMenuRef as RefObject<HTMLElement>, () =>
    setIsMenuOpen(false)
  )

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
          'bg-cream absolute bottom-0 flex max-h-0 w-full translate-y-full flex-col overflow-hidden text-7xl transition-all duration-200',
          isMenuOpen && 'max-h-[300px]'
        )}
        ref={mobileMenuRef}
      >
        HI
      </div>
    </div>
  )
}

export default MobileHeader
