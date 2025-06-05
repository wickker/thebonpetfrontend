import { useNavigate } from 'react-router-dom'
import { FaYoutube } from 'react-icons/fa6'
import { IoDocumentText } from 'react-icons/io5'
import { Button } from '@/components/commons'
import { ROUTES } from '@/utils/constants'

const Section3Guide = () => {
  const navigate = useNavigate()

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(var(--color-cream-98), var(--color-cream-98)), url('/background.png')`,
      }}
    >
      <div className='mx-auto grid w-full max-w-[1650px] grid-cols-[1fr] items-center gap-10 px-4 py-8 lg:w-[90%] lg:grid-cols-[1fr_1fr]'>
        <div>
          <h1 className='text-dark-brown mb-4 text-center text-5xl font-bold lg:text-left'>
            Tail-Wagging Goodness in Every Bowl
          </h1>

          <p className='text-dark-brown mb-6 text-center text-lg leading-[1.8] lg:text-left'>
            Learn how to prepare and transition to gently cooked meals for both
            dog and cat formula.
          </p>

          <div className='flex flex-wrap items-center justify-center gap-4 lg:justify-start'>
            <Button.Cta
              icon={<IoDocumentText className='h-7 w-7' />}
              onClick={() => navigate(ROUTES.FEEDING_GUIDE)}
            >
              Feeding Guide
            </Button.Cta>
            <button className='border-green text-green flex min-w-fit cursor-pointer items-center gap-2 rounded-xl border-[3px] px-4 py-2 text-2xl whitespace-nowrap disabled:hover:cursor-not-allowed'>
              <img src='/icons/bowl.png' alt='Bowl icon' className='h-8 w-8' />
              View Meals
            </button>
          </div>
        </div>

        <div className='grid grid-cols-[auto_auto] items-center justify-self-center lg:gap-x-10'>
          <div className='border-brown relative flex h-[400px] w-[240px] flex-col items-center justify-center overflow-hidden rounded-xl border-[2px] lg:rotate-[-5deg]'>
            <img
              src='/home-guide-1.png'
              alt='Guide 1'
              className='w-full transition-transform duration-300 hover:scale-105'
            />

            <button
              className='absolute bottom-0 mb-7 flex w-fit cursor-pointer items-center gap-x-2 rounded-xl border-[2px] border-white/50 bg-[#E12B65] p-2 text-white'
              onClick={() =>
                window.open(
                  'https://www.instagram.com/p/DFFNUvLzq2K/',
                  '_blank'
                )
              }
            >
              <FaYoutube className='h-12 w-12' />
              <div className='text-left'>
                <p>How It's Made</p>
                <p className='truncate text-xs'>
                  Our process, ratios & formula
                </p>
              </div>
            </button>
          </div>

          <div className='border-brown hidden h-[350px] w-[220px] rotate-5 flex-col items-center justify-center overflow-hidden rounded-xl border-[2px] lg:flex'>
            <img
              src='/home-guide-2.png'
              alt='Guide 1'
              className='w-full transition-transform duration-300 hover:scale-105'
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Section3Guide
