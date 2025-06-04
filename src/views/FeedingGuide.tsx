import { motion } from 'motion/react'
import { PromoBanner } from '@/components/commons'

const FeedingGuide = () => {
  return (
    <div className='flex w-[100dvw] flex-col overflow-x-hidden'>
      <motion.div
        className='grid h-[355px] w-full place-items-center bg-[#03443C] bg-auto bg-bottom'
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(255, 255, 255, 0.12) 0%, rgba(0, 0, 0, 0.12) 100%), conic-gradient(#02443CCC, #02443CCC), url('/background-feeding-guide.png')`,
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ amount: 0.5 }}
      >
        <div className='p-4'>
          <h1 className='text-center text-[66px] font-bold text-[#FFF5E3]'>
            THE BON PET
          </h1>
          <div className='mx-auto mt-2 mb-3 h-[3px] w-[80%] rounded-full bg-[#FFF5E3]' />
          <h1 className='text-center text-[40px] font-bold text-[#FFF5E3]'>
            Feeding Guide
          </h1>
        </div>
      </motion.div>

      <div className='flex flex-col items-center p-4 text-center'>
        <h1 className='text-dark-green text-[52px] font-bold'>
          HOW TO INTRODUCE
        </h1>

        <p className='text-dark-green text-xl'>
          Transition from old to new food over a week
        </p>

        <div className='my-6 grid max-w-md grid-cols-[1fr_1fr] gap-x-10 gap-y-10 sm:gap-x-14'>
          <div className='grid grid-cols-[auto_1fr] gap-x-1'>
            <div className='bg-dark-green text-beige grid h-8 w-8 place-items-center rounded-full text-xl font-bold'>
              1
            </div>
            <img src='/day1-3.png' alt='Feeding guide day 1-3' />
            <div className='text-dark-green col-span-full my-2 flex justify-between gap-x-2 text-center'>
              <div>
                <p className='text-2xl font-bold'>75%</p>
                <p>Existing Food</p>
              </div>
              <div>
                <p className='text-2xl font-bold'>25%</p>
                <p>The Bon Pet</p>
              </div>
            </div>
          </div>

          <div className='grid grid-cols-[auto_1fr] gap-x-1'>
            <div className='bg-dark-green text-beige grid h-8 w-8 place-items-center rounded-full text-xl font-bold'>
              2
            </div>
            <img src='/day4-6.png' alt='Feeding guide day 4-6' />
            <div className='text-dark-green col-span-full my-2 flex justify-between gap-x-2 text-center'>
              <div>
                <p className='text-2xl font-bold'>50%</p>
                <p>Existing Food</p>
              </div>
              <div>
                <p className='text-2xl font-bold'>50%</p>
                <p>The Bon Pet</p>
              </div>
            </div>
          </div>

          <div className='grid grid-cols-[auto_1fr] gap-x-1'>
            <div className='bg-dark-green text-beige grid h-8 w-8 place-items-center rounded-full text-xl font-bold'>
              3
            </div>
            <img src='/day7-9.png' alt='Feeding guide day 7-9' />
            <div className='text-dark-green col-span-full my-2 flex justify-between gap-x-2 text-center'>
              <div>
                <p className='text-2xl font-bold'>25%</p>
                <p>Existing Food</p>
              </div>
              <div>
                <p className='text-2xl font-bold'>75%</p>
                <p>The Bon Pet</p>
              </div>
            </div>
          </div>

          <div className='grid grid-cols-[auto_1fr] gap-x-1'>
            <div className='bg-dark-green text-beige grid h-8 w-8 place-items-center rounded-full text-xl font-bold'>
              4
            </div>
            <img src='/day10.png' alt='Feeding guide day 10' />
            <div className='text-dark-green col-start-2 my-2 flex flex-col items-center text-center'>
              <p className='text-2xl font-bold'>100%</p>
              <p>The Bon Pet</p>
            </div>
          </div>
        </div>

        <div className='mb-6 w-full max-w-xl text-[#7B6D57]'>
          <p>Applicable for both dog and cat formulas.</p>
          <p>
            If your pet is known to have a sensitive stomach, you may extend the
            transition period following steps 1 and 2.
          </p>
        </div>

        <div className='my-2 h-[3px] w-full max-w-xl rounded-full bg-[#CCBC9E]' />

        <h1 className='text-dark-green mt-2 text-[52px] font-bold'>
          HOW TO PREPARE
        </h1>

        <p className='text-dark-green text-xl'>
          A quick and simple way to thaw
        </p>

        <div className='my-6 grid max-w-md grid-cols-[1fr_1fr] gap-x-10 gap-y-2 sm:gap-x-14'>
          <div className='grid grid-cols-[auto_1fr] gap-x-1'>
            <div className='bg-dark-green text-beige grid h-8 w-8 place-items-center rounded-full text-xl font-bold'>
              1
            </div>
            <img src='/thaw-1.png' alt='Thaw step 1' />
          </div>

          <div className='grid grid-cols-[auto_1fr] gap-x-1'>
            <div className='bg-dark-green text-beige grid h-8 w-8 place-items-center rounded-full text-xl font-bold'>
              2
            </div>
            <img src='/thaw-2.png' alt='Thaw step 2' />
          </div>

          <div className='text-dark-green mb-6 text-sm'>
            Take out the required amount needed for thawing
          </div>

          <div className='text-dark-green mb-6 text-sm'>
            Transfer from freezer to chiller on the night before feeding{' '}
            <p className='font-bold'>(Do not refreeze)</p>
          </div>

          <div className='grid grid-cols-[auto_1fr] gap-x-1'>
            <div className='bg-dark-green text-beige grid h-8 w-8 place-items-center rounded-full text-xl font-bold'>
              3
            </div>
            <img src='/thaw-3.png' alt='Thaw step 3' />
          </div>

          <div className='grid grid-cols-[auto_1fr] gap-x-1'>
            <div className='bg-dark-green text-beige grid h-8 w-8 place-items-center rounded-full text-xl font-bold'>
              4
            </div>
            <img src='/thaw-4.png' alt='Thaw step 4' />
          </div>

          <div className='text-dark-green mb-4 text-sm'>
            To achieve room temperature, submerge packet in warm water for 15
            minutes before serving{' '}
            <p className='font-bold'>(Do not microwave or cook it)</p>
          </div>

          <div className='text-dark-green mb-4 text-sm'>
            Ready to feed!
            <p className='font-bold'>
              (Clear the food if unfinished after 30 minutes and do not leave
              left overs)
            </p>
          </div>
        </div>

        <div className='mb-6 w-full max-w-xl text-[#7B6D57]'>
          <p>
            Cooking or microwaving is not recommended as it can affect the
            nutrient content of the formula.
          </p>
          <p>
            Thawed food can be stored in an airtight container in the chiller at
            0-4°C for up to 36 hours.
          </p>
        </div>
      </div>

      <PromoBanner />
    </div>
  )
}

export default FeedingGuide
