const Desktop = () => {
  return (
    <div className='grid h-[88px] w-full grid-cols-[1fr_1fr_1fr_24px] items-center bg-[#CCBC9E]/50 p-4'>
      <div className='flex flex-col gap-y-3'>
        <div className='bg-dark-green/20 h-6 w-[50%] animate-pulse rounded-full' />
        <div className='bg-dark-green/20 h-3 w-[60%] animate-pulse rounded-full' />
      </div>
      <div className='flex flex-col gap-y-3'>
        <div className='bg-dark-green/20 h-4 w-[50%] animate-pulse rounded-full' />
        <div className='bg-dark-green/20 h-4 w-[60%] animate-pulse rounded-full' />
      </div>
      <div className='bg-dark-green/20 h-6 w-[50%] animate-pulse rounded-full' />
      <div className='bg-dark-green/20 h-4 animate-pulse rounded-full' />
    </div>
  )
}

const Mobile = () => {
  return (
    <div className='text-dark-gray flex h-[120px] w-full flex-col justify-center gap-y-2.5 bg-[#CCBC9E]/50 p-4'>
      <div className='flex items-center justify-between gap-x-2'>
        <div className='bg-dark-green/20 h-6 w-[40%] animate-pulse rounded-full' />
        <div className='bg-dark-green/20 h-3 w-[30%] animate-pulse rounded-full' />
      </div>
      <div className='flex items-center justify-between gap-x-2'>
        <div className='bg-dark-green/20 h-4 w-[20%] animate-pulse rounded-full' />
        <div className='bg-dark-green/20 h-6 w-[40%] animate-pulse rounded-full' />
      </div>
      <div className='flex items-center justify-between gap-x-2'>
        <div className='bg-dark-green/20 h-4 w-[50%] animate-pulse rounded-full' />
        <div className='bg-dark-green/20 h-4 w-[10%] animate-pulse rounded-full' />
      </div>
    </div>
  )
}

const Skeleton = {
  Desktop,
  Mobile,
}

export default Skeleton
