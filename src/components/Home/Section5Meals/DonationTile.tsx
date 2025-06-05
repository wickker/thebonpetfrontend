import { Button } from '@/components/commons'
import DonationModal from './DonationModal'

const DonationTile = () => {
  return (
    <div className='bg-beige text-dark-brown relative grid items-center gap-6 overflow-hidden rounded-xl border-[2px] border-[#E9D9BD] p-6 lg:grid-cols-[1fr_1fr]'>
      <div className='relative'>
        <img
          src='/home-meals-wildflower.png'
          alt='Wildflower'
          className='rounded-xl'
        />
        <p
          className='absolute top-0 m-4 rounded-full px-4 py-2 text-sm text-white'
          style={{
            textShadow: '1px 1px 2px black',
            background:
              'linear-gradient(180deg, rgba(239, 72, 63, 0.9) 0%, rgba(239, 72, 63, 0.64) 100%)',
          }}
        >
          Over 50 rescue cats at Wildflower Studio eat our meals daily and
          thrive. Known for high standards, Wildflower Studio proudly stands by
          our food.
        </p>
      </div>

      <div className='flex flex-col items-center text-center'>
        <h1 className='mb-8 text-5xl font-bold'>Paw it Forward</h1>

        <p className='mb-2 text-xl font-bold'>
          Help Stay Cats, One Meal at a Time.
        </p>

        <p className='text-brown text-sm'>
          Opt into kindness by donating to support rescue cats.
        </p>
        <p className='text-brown mb-8 text-sm'>
          100% goes to the charity of your choosing.{' '}
          <a
            className='underline'
            href='https://www.wildflowerstudio.sg/'
            target='_blank'
          >
            Wildflower Studio
          </a>{' '}
          or{' '}
          <a
            className='underline'
            href='https://luni-singapore.com/'
            target='_blank'
          >
            LUNI
          </a>
          .
        </p>

        <DonationModal>
          <Button.Cta className='mb-20 lg:mb-0'>
            <img
              src='/icons/paw-white.png'
              alt='Paw icon'
              className='aspect-auto w-6'
            />
            Donate a Meal
          </Button.Cta>
        </DonationModal>
      </div>

      <img
        src='/home-meals-corner-cat.png'
        alt='Curious cat'
        className='aspect auto absolute right-0 bottom-0 h-22 scale-x-[-1] xl:h-34'
      />
    </div>
  )
}

export default DonationTile
