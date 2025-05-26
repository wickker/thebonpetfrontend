import { Outlet, useNavigate } from 'react-router-dom'
import { Cart, Footer } from '@/components/commons'
import { ROUTES } from '@/utils/constants'
import { getTokenJsonFromLocalStorage } from '@/utils/functions'
import DesktopHeader from './DesktopHeader'
import MobileHeader from './MobileHeader'

const NavigationBar = () => {
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
    <div
      className='flex min-h-[100dvh] min-w-full flex-col'
      style={{
        backgroundImage: `linear-gradient(var(--color-beige-95), var(--color-beige-95)), url('/background.png')`,
      }}
    >
      <div className='sticky top-0 z-10 w-full shadow-lg'>
        <div className='hidden h-8 w-full bg-[linear-gradient(90deg,#03453D_0%,#19756A_50.36%,#03453D_100%)] lg:block'>
          {/* TODO: */}
        </div>

        {/* Displays at widths >= lg */}
        <DesktopHeader onClickUserIcon={handleClickUserIcon} />

        {/* Displays at widths < lg */}
        <MobileHeader />
      </div>

      <div className='min-h-[calc(100dvh-76px-766px)] lg:min-h-[calc(100dvh-306px-76px-32px)]'>
        <Outlet />
      </div>

      <Footer />

      <Cart />
    </div>
  )
}

export default NavigationBar
