const FeedingGuide = () => {
  return (
    <div className='flex w-[100dvw] flex-col overflow-x-hidden'>
      <div
        className='relative grid h-[355px] w-full place-items-center bg-[#03443C] bg-auto bg-bottom'
        style={{ backgroundImage: `url('/background-feeding-guide.png')` }}
      >
        <div
          className='absolute top-0 h-[355px] w-full opacity-80'
          style={{
            backgroundImage:
              'linear-gradient(0deg, #02443C, #02443C), linear-gradient(180deg, rgba(255, 255, 255, 0.12) 0%, rgba(0, 0, 0, 0.12) 100%)',
          }}
        />

        <div className='isolate p-4'>
          <h1 className='text-center text-[66px] font-bold text-[#FFF5E3]'>
            THE BON PET
          </h1>
          <div className='mx-auto mt-2 mb-3 h-[3px] w-[80%] rounded-full bg-[#FFF5E3]' />
          <h1 className='text-center text-[40px] font-bold text-[#FFF5E3]'>
            Feeding Guide
          </h1>
        </div>
      </div>

      <div className='flex flex-col items-center p-4 text-center'>
        <h1 className='text-dark-green text-[52px] font-bold'>
          HOW TO INTRODUCE
        </h1>

        <p className='text-dark-green text-xl'>
          Transition from old to new food over a week
        </p>

        <div className='my-6 grid max-w-md grid-cols-[1fr_1fr] gap-10'>
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

        <div className='my-2 h-[3px] w-full max-w-xl rounded-full bg-[#CCBC9E]' />

        <h1 className='text-dark-green mt-2 text-[52px] font-bold'>
          HOW TO PREPARE
        </h1>

        <p className='text-dark-green text-xl'>
          A quick and simple way to thaw
        </p>
        {/* TODO: */}
      </div>
    </div>
  )
}

export default FeedingGuide
