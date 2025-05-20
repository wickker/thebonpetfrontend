import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { BsCart2 } from 'react-icons/bs'
import { FaRegUser, FaUser } from 'react-icons/fa6'
import { ROUTES } from '@/utils/constants'
import { cn, getTokenJsonFromLocalStorage } from '@/utils/functions'

const navigationItems = [
  {
    label: 'Dogs',
    route: ROUTES.DOGS,
  },
  {
    label: 'Cats',
    route: ROUTES.CATS,
  },
  {
    label: 'Blog',
    route: ROUTES.BLOG,
  },
  {
    label: 'Feeding Guide',
    route: ROUTES.FEEDING_GUIDE,
  },
  {
    label: 'Contact',
    route: ROUTES.CONTACT,
  },
] as const

const NavigationBar = () => {
  const navigate = useNavigate()
  const location = useLocation()
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
    <div className='bg-beige flex min-h-[100dvh] min-w-max flex-col'>
      <div className='sticky top-0 z-10 w-full'>
        <div className='bg-green h-8 w-full'></div>

        <div className='bg-cream grid h-[76px] w-full grid-cols-[auto_1fr_auto] items-center gap-x-2 px-4 sm:px-12'>
          <button
            className='text-green text-3xl font-bold hover:cursor-pointer'
            onClick={() => navigate(ROUTES.HOME)}
          >
            TBP
          </button>

          <div className='mx-auto hidden items-center gap-x-14 sm:flex'>
            {navigationItems.map((item) => {
              const isSelected = location.pathname === item.route
              return (
                <button
                  className='text-green flex flex-col items-center font-semibold hover:cursor-pointer'
                  key={item.label}
                  onClick={() => navigate(item.route)}
                >
                  {item.label}
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

          <div className='hidden items-center gap-x-10 sm:flex'>
            <button
              onClick={handleClickUserIcon}
              className='hover:cursor-pointer'
            >
              {isLoggedIn ? (
                <FaUser className='text-green h-5 w-5' />
              ) : (
                <FaRegUser className='text-green h-5 w-5' />
              )}
            </button>

            <button className='hover:cursor-pointer'>
              <BsCart2 className='text-green h-6 w-6' />
            </button>
          </div>
        </div>
      </div>

      <Outlet />
    </div>
  )
}

export default NavigationBar
