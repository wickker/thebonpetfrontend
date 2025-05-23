import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Footer } from '@/components/commons'
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
            {navigationItems.map((item, index) => {
              const isSelected = location.pathname === item.route
              return (
                <button
                  className='text-green flex flex-col items-center font-bold hover:cursor-pointer'
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

          <div className='z-10 hidden items-center gap-x-8 lg:flex'>
            <button
              onClick={handleClickUserIcon}
              className='hover:cursor-pointer'
            >
              <img src='/icons/user.png' alt='User' className='h-5 w-5' />
            </button>

            <button className='relative hover:cursor-pointer'>
              <img src='/icons/cart.png' alt='Cart' className='h-5 w-5' />
              <div className='bg-green absolute right-[-8px] bottom-[-6px] grid h-4 w-4 place-items-center rounded-full text-[8px] text-white'>
                0
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className='isolate'>
        <div className='min-h-[calc(100dvh-306px-76px-32px)]'>
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default NavigationBar
