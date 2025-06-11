import { Button } from '@/components/commons'
import DonationModal from '@/components/Home/Section5Meals/DonationModal'
import { LINKS } from '@/utils/constants'

const DonationSection = () => {
  return (
    <div className='relative w-full'>
      <div className='mx-auto grid w-full max-w-[1650px] gap-8 px-4 py-10 lg:w-[90%] lg:grid-cols-[1fr_1fr]'>
        <img
          src='/home-meals-wildflower.png'
          alt='Wildflower'
          className='rounded-xl border border-[#CCBC9E]'
        />

        <div className='text-dark-brown flex flex-col'>
          <h1 className='mb-8 text-5xl font-bold'>
            Help Stray Cats, One Meal at a Time
          </h1>

          <p className='text-brown'>
            Opt into kindness by donating to support rescue cats.
          </p>
          <p className='text-brown mb-8'>
            100% goes to the charity of your choosing.{' '}
            <a
              className='underline'
              href={LINKS.WILDFLOWER_STUDIO}
              target='_blank'
            >
              Wildflower Studio
            </a>{' '}
            or{' '}
            <a className='underline' href={LINKS.LUNI} target='_blank'>
              LUNI
            </a>
            .
          </p>

          <DonationModal>
            <Button.Cta>
              <img
                src='/icons/paw-white.png'
                alt='Paw icon'
                className='aspect-auto w-6'
              />
              Donate a Meal
            </Button.Cta>
          </DonationModal>
        </div>
      </div>

      <img
        src='/home-meals-corner-cat.png'
        alt='Curious cat'
        className='aspect auto absolute right-0 bottom-0 h-22 scale-x-[-1] xl:h-34'
      />
    </div>
  )
}

export default DonationSection
