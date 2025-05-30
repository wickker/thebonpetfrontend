import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { DateTime } from 'luxon'
import { Cart, Footer } from '@/components/commons'
import { LOCAL_STORAGE_KEYS } from '@/utils/constants'
import { cn, getShowPromoFromLocalStorage } from '@/utils/functions'
import DesktopHeader from './DesktopHeader'
import MobileHeader from './MobileHeader'

const NavigationBar = () => {
  const [showPromo, setShowPromo] = useState(getShowPromoFromLocalStorage())

  const handleDismissPromo = () => {
    localStorage.setItem(
      LOCAL_STORAGE_KEYS.PROMO_DISMISSED_EXPIRY,
      DateTime.now().plus({ days: 1 }).toISO()
    )
    setShowPromo(false)
  }

  return (
    <div
      className='flex min-h-[100dvh] min-w-full flex-col'
      style={{
        backgroundImage: `linear-gradient(var(--color-beige-95), var(--color-beige-95)), url('/background.png')`,
      }}
    >
      <div className='sticky top-0 z-10 w-full shadow-lg'>
        {showPromo && (
          <div className='hidden h-8 w-full grid-cols-[auto_1fr_auto] items-center gap-x-2 bg-[linear-gradient(90deg,#03453D_0%,#19756A_50.36%,#03453D_100%)] px-6 lg:grid'>
            <div />
            <p className='text-center text-sm text-white'>
              Use code BONPET10 for 10% off first subscription
              <span className='mx-2'>•</span>Free delivery over $60 for cat or
              $100 for dog food
            </p>
            <button onClick={handleDismissPromo} className='cursor-pointer'>
              <img src='/icons/close-white.png' alt='Close icon' />
            </button>
          </div>
        )}

        {/* Displays at widths >= lg */}
        <DesktopHeader />

        {/* Displays at widths < lg */}
        <MobileHeader />
      </div>

      <div
        className={cn(
          'min-h-[calc(100dvh-76px-766px)] lg:min-h-[calc(100dvh-306px-76px-32px)]',
          !showPromo && 'lg:min-h-[calc(100dvh-306px-76px)]'
        )}
      >
        <Outlet />
      </div>

      <Footer />

      <Cart />
    </div>
  )
}

export default NavigationBar
