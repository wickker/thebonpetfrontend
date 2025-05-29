import { PropsWithChildren } from 'react'
import { Customer } from '@shopify/hydrogen-react/storefront-api-types'
import { UseQueryResult } from '@tanstack/react-query'
import { DateTime } from 'luxon'
import MobileSkeleton from './MobileSkeleton'
import NoOrdersYet from './NoOrdersYet'
import { ORDER_FIELDS } from './utils'

const KeyContent = ({ children }: PropsWithChildren) => (
  <div className='py-1 text-sm font-bold uppercase'>{children}</div>
)

const Content = ({ children }: PropsWithChildren) => (
  <div className='text-dark-green py-1'>{children}</div>
)

type MobileViewProps = {
  getCustomer: UseQueryResult<Customer, Error>
}

const MobileView = ({ getCustomer }: MobileViewProps) => {
  const hasOrders =
    getCustomer.isSuccess && getCustomer.data.orders.edges.length > 0

  const renderOrders = () => {
    if (getCustomer.isLoading) {
      return <MobileSkeleton />
    }

    if (!hasOrders) {
      return <NoOrdersYet />
    }

    return getCustomer.data.orders.edges
      .slice()
      .reverse()
      .map((order) => (
        <div
          className='border-dark-green/20 flex flex-col border-b py-4'
          key={order.node.id}
        >
          <div className='flex h-8 items-center justify-between gap-2'>
            <KeyContent>{ORDER_FIELDS[0]}</KeyContent>
            <a
              className='text-green font-bold underline'
              href={order.node.statusUrl}
              target='_blank'
            >
              {order.node.name}
            </a>
          </div>

          <div className='flex h-8 items-center justify-between gap-2'>
            <KeyContent>{ORDER_FIELDS[1]}</KeyContent>
            <Content>
              {DateTime.fromJSDate(
                new Date(order.node.processedAt)
              ).toLocaleString(DateTime.DATE_MED)}
            </Content>
          </div>

          <div className='flex h-8 items-center justify-between gap-2'>
            <KeyContent>{ORDER_FIELDS[2]}</KeyContent>
            <Content>{order.node.financialStatus}</Content>
          </div>

          <div className='flex h-8 items-center justify-between gap-2'>
            <KeyContent>{ORDER_FIELDS[3]}</KeyContent>
            <Content>{order.node.fulfillmentStatus}</Content>
          </div>

          <div className='flex h-8 items-center justify-between gap-2'>
            <KeyContent>{ORDER_FIELDS[4]}</KeyContent>
            <Content>
              ${order.node.totalPrice.amount}{' '}
              {order.node.totalPrice.currencyCode}
            </Content>
          </div>
        </div>
      ))
  }

  return <div className='mb-8 block md:hidden'>{renderOrders()}</div>
}

export default MobileView
