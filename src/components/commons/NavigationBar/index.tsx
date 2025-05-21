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
    label: 'Feeding Guide',
    route: ROUTES.FEEDING_GUIDE,
  },
  {
    label: 'Pet Food Calculator',
    route: ROUTES.PET_FOOD_CALCULATOR,
  },
  {
    label: 'Donate',
    route: ROUTES.DONATE,
  },
  {
    label: 'Blog',
    route: ROUTES.BLOG,
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
    <div
      className='relative flex min-h-[100dvh] min-w-max flex-col'
      style={{ backgroundImage: `url('/background.png')` }}
    >
      <div className='bg-beige absolute inset-0 opacity-95' />

      <div className='sticky top-0 z-10 w-full shadow-lg'>
        <div className='h-8 w-full bg-[linear-gradient(90deg,#03453D_0%,#19756A_50.36%,#03453D_100%)]'>
          {/* TODO: */}
        </div>

        <div
          className='relative grid h-[76px] w-full grid-cols-[auto_1fr_auto] items-center gap-x-2 px-4 lg:px-12'
          style={{ backgroundImage: `url('/background.png')` }}
        >
          <div className='bg-cream absolute h-[76px] w-full opacity-97' />

          <button
            className='text-green z-10 text-3xl font-bold hover:cursor-pointer'
            onClick={() => navigate(ROUTES.HOME)}
          >
            TBP
          </button>

          <div className='z-10 mx-auto hidden items-center gap-x-8 lg:flex xl:gap-x-12'>
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

          <div className='z-10 hidden items-center gap-x-8 lg:flex'>
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

      <div className='isolate'>
        <Outlet />
      </div>
    </div>
  )
}

export default NavigationBar
