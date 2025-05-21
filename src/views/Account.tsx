import { FaRegUser } from 'react-icons/fa6'

const Account = () => {
  return (
    <div className='mx-auto max-w-[100dvw] lg:max-w-6xl'>
      <div className='flex w-[100dvw] flex-col px-4 lg:max-w-4xl'>
        <h1 className='text-dark-green mt-8 text-4xl font-semibold'>Account</h1>

        <div className='text-dark-green my-6 flex items-center gap-x-2'>
          <FaRegUser className='h-4 w-4' />
          <button className='underline'>Log out</button>
        </div>

        <h1 className='text-dark-green mt-8 text-4xl font-semibold'>
          Order history
        </h1>
      </div>
    </div>
  )
}

export default Account
