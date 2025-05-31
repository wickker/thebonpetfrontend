import { FaRegUser } from 'react-icons/fa6'
import { Skeleton, Tile } from '@/components/Account'
import { EmptyDisplay } from '@/components/commons'
import useCustomer from '@/hooks/queries/useCustomer'
import { LOCAL_STORAGE_KEYS, ROUTES } from '@/utils/constants'
import { getTokenJsonFromLocalStorage } from '@/utils/functions'

const Account = () => {
  const token = getTokenJsonFromLocalStorage()
  const { useGetCustomerQuery } = useCustomer()
  const getCustomer = useGetCustomerQuery(token?.accessToken || '', {
    first: 100,
  })
  const orders = getCustomer.data?.orders.edges.slice().reverse() || []
  const hasOrders = getCustomer.isSuccess && orders.length > 0

  const handleLogout = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN)
    window.location.replace(ROUTES.HOME)
  }

  const renderDesktopOrders = () => {
    if (getCustomer.isFetching) {
      return Array.from({ length: 3 }).map((_, i) => (
        <Skeleton.Desktop key={i} />
      ))
    }

    if (!hasOrders) {
      return (
        <EmptyDisplay
          title='No orders yet'
          description='Your order history will appear here once you have made a purchase'
        />
      )
    }

    return orders.map((order) => (
      <Tile.Desktop key={order.node.id} order={order} />
    ))
  }

  return (
    <div className='mx-auto flex max-w-[100dvw] flex-col items-center lg:max-w-6xl'>
      <div className='flex w-[100dvw] flex-col px-4 md:px-8 lg:w-2/3'>
        <h1 className='text-dark-green mt-8 text-4xl font-bold'>Account</h1>

        <div className='text-dark-green mt-6 mb-2 flex items-center gap-x-2'>
          <FaRegUser className='h-4 w-4' />
          <button className='cursor-pointer underline' onClick={handleLogout}>
            Log out
          </button>
        </div>

        <h1 className='text-dark-green my-8 text-4xl font-bold'>
          Order history
        </h1>

        <div className='mb-8 hidden flex-col gap-y-2 md:flex'>
          {renderDesktopOrders()}
        </div>

        <div className='mb-8 flex flex-col gap-y-2 md:hidden'>
          {orders.map((order) => (
            <Tile.Mobile key={order.node.id} order={order} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Account
