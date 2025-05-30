import { FiXCircle } from 'react-icons/fi'

const NoOrdersYet = () => (
  <div className='col-span-full flex flex-col justify-center gap-y-2 py-8 md:items-center'>
    <div className='flex items-center'>
      <FiXCircle className='text-dark-green mr-2 h-5 w-5' />
      <p className='text-dark-green text-lg'>No orders yet</p>
    </div>
    <p className='text-dark-green/70'>
      Your order history will appear here once you have made a purchase
    </p>
  </div>
)

export default NoOrdersYet
