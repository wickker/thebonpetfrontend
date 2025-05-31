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

const Skeleton = {
  Desktop,
}

export default Skeleton
