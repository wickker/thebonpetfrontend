import { Fragment, PropsWithChildren } from 'react'
import { DateTime } from 'luxon'
import { FaRegUser } from 'react-icons/fa6'
import { MobileView, NoOrdersYet } from '@/components/Account'
import { ORDER_FIELDS } from '@/components/Account/utils'
import useCustomer from '@/hooks/queries/useCustomer'
import { LOCAL_STORAGE_KEYS, ROUTES } from '@/utils/constants'
import { getTokenJsonFromLocalStorage } from '@/utils/functions'

const Skeleton = () =>
  Array.from({ length: 5 }).map((_, i) => (
    <div key={i} className='flex h-[56px] w-[80%] flex-col justify-center py-4'>
      <div className='bg-dark-green/20 h-4 animate-pulse rounded-full' />
    </div>
  ))

const HeaderContent = ({ children }: PropsWithChildren) => (
  <div className='py-4 text-sm font-bold uppercase'>{children}</div>
)

const Content = ({ children }: PropsWithChildren) => (
  <div className='text-dark-green h-[56px] py-4'>{children}</div>
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
      return <NoOrdersYet />
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
            ${order.node.totalPrice.amount} {order.node.totalPrice.currencyCode}
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

        <h1 className='text-dark-green mt-8 mb-2 text-4xl font-bold md:my-8'>
          Order history
        </h1>

        {/* Desktop view*/}
        <div className='mb-8 hidden grid-cols-[0.5fr_0.8fr_1fr_1.2fr_0.5fr] items-center gap-x-4 md:grid'>
          {ORDER_FIELDS.map((field) => {
            return <HeaderContent key={field}>{field}</HeaderContent>
          })}

          <div className='bg-dark-green/20 col-span-full h-[1px] w-full' />

          {renderOrders()}
        </div>

        <MobileView getCustomer={getCustomer} />
      </div>
    </div>
  )
}

export default Account
