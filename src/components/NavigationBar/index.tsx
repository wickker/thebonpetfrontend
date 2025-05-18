import { Outlet } from 'react-router-dom'

const NavigationBar = () => {
  return (
    <div className='bg-cream flex min-h-[100dvh] min-w-max flex-col'>
      <div className='bg-beige sticky top-0 z-10 flex h-[80px] w-full items-center justify-center'>
        {/* TODO: */}
      </div>

      <Outlet />
    </div>
  )
}

export default NavigationBar
