import { useNavigate } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa6'
import { ROUTES } from '@/utils/constants'

const PromoBanner = () => {
  const navigate = useNavigate()

  return (
    <div className='flex w-full items-center justify-center bg-[linear-gradient(90deg,#03453D_0%,#19756A_50.36%,#03453D_100%)] px-6 py-4 text-white'>
      <button
        className='group flex cursor-pointer items-center gap-2 font-bold tracking-widest uppercase'
        onClick={() => navigate(ROUTES.DOGS)}
      >
        Get a free trial pack when you subscribe
        <FaArrowRight className='h-5 w-5 transition-transform duration-300 group-hover:translate-x-1' />
      </button>
    </div>
  )
}

export default PromoBanner
