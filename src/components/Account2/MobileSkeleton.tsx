const Skeleton = () => (
  <div className='border-dark-green/20 flex flex-col border-b py-4'>
    <div className='flex h-8 items-center justify-between'>
      <div className='bg-dark-green/20 h-4 w-[25%] animate-pulse rounded-full' />
      <div className='bg-dark-green/20 h-4 w-[25%] animate-pulse rounded-full' />
    </div>

    <div className='flex h-8 items-center justify-between'>
      <div className='bg-dark-green/20 h-4 w-[25%] animate-pulse rounded-full' />
      <div className='bg-dark-green/20 h-4 w-[30%] animate-pulse rounded-full' />
    </div>

    <div className='flex h-8 items-center justify-between'>
      <div className='bg-dark-green/20 h-4 w-[30%] animate-pulse rounded-full' />
      <div className='bg-dark-green/20 h-4 w-[30%] animate-pulse rounded-full' />
    </div>

    <div className='flex h-8 items-center justify-between'>
      <div className='bg-dark-green/20 h-4 w-[40%] animate-pulse rounded-full' />
      <div className='bg-dark-green/20 h-4 w-[35%] animate-pulse rounded-full' />
    </div>

    <div className='flex h-8 items-center justify-between'>
      <div className='bg-dark-green/20 h-4 w-[22%] animate-pulse rounded-full' />
      <div className='bg-dark-green/20 h-4 w-[25%] animate-pulse rounded-full' />
    </div>
  </div>
)

const MobileSkeleton = () =>
  Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} />)

export default MobileSkeleton
