import { Fragment, PropsWithChildren } from 'react'
import { DateTime } from 'luxon'
import { FaRegUser } from 'react-icons/fa6'
import { FiXCircle } from 'react-icons/fi'
import useCustomer from '@/hooks/queries/useCustomer'
import { LOCAL_STORAGE_KEYS, ROUTES } from '@/utils/constants'
import { getTokenJsonFromLocalStorage } from '@/utils/functions'

const columnHeaders = [
  'Order',
  'Date',
  'Payment Status',
  'Fulfillment Status',
  'Total',
] as const

const Skeleton = () =>
  Array.from({ length: 5 }).map((_, i) => (
    <div
      key={i}
      className='bg-dark-green/20 my-4 h-4 w-[80%] animate-pulse rounded-full'
    />
  ))

const HeaderContent = ({ children }: PropsWithChildren) => (
  <div className='py-4 text-sm font-bold uppercase'>{children}</div>
)

const Content = ({ children }: PropsWithChildren) => (
  <div className='text-dark-green py-4'>{children}</div>
)

const Account = () => {
  const token = getTokenJsonFromLocalStorage()
  const { useGetCustomerQuery } = useCustomer()
  const getCustomer = useGetCustomerQuery(token?.accessToken || '', {
    first: 100,
  })
  const hasOrders =
    getCustomer.isSuccess && getCustomer.data.orders.edges.length > 0

  const handleLogout = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN)
    window.location.replace(ROUTES.HOME)
  }

  const renderOrders = () => {
    if (getCustomer.isLoading) {
      return Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} />)
    }

    if (!hasOrders) {
      return (
        <div className='col-span-full flex flex-col items-center justify-center gap-y-2 py-8'>
          <div className='flex items-center'>
            <FiXCircle className='text-dark-green mr-2 h-5 w-5' />
            <p className='text-dark-green text-lg'>No orders yet</p>
          </div>
          <p className='text-dark-green/70'>
            Your order history will appear here once you have made a purchase
          </p>
        </div>
      )
    }

    return getCustomer.data.orders.edges
      .slice()
      .reverse()
      .map((order) => (
        <Fragment key={order.node.id}>
          <a
            className='text-green font-bold underline'
            href={order.node.statusUrl}
            target='_blank'
          >
            {order.node.name}
          </a>
          <Content>
            {DateTime.fromJSDate(
              new Date(order.node.processedAt)
            ).toLocaleString(DateTime.DATE_MED)}
          </Content>
          <Content>{order.node.financialStatus}</Content>
          <Content>{order.node.fulfillmentStatus}</Content>
          <Content>
            {order.node.totalPrice.amount} {order.node.totalPrice.currencyCode}
          </Content>
        </Fragment>
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

        {/* Desktop view*/}
        <div className='mb-8 hidden grid-cols-[0.5fr_0.8fr_1fr_1.2fr_0.5fr] items-center gap-x-4 md:grid'>
          {columnHeaders.map((header) => {
            return <HeaderContent key={header}>{header}</HeaderContent>
          })}

          <div className='bg-dark-green/20 col-span-full h-[1px] w-full' />

          {renderOrders()}
        </div>
      </div>
    </div>
  )
}

export default Account
