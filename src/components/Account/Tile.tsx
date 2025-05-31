import { Fragment, useState } from 'react'
import { OrderEdge } from '@shopify/hydrogen-react/storefront-api-types'
import { DateTime } from 'luxon'
import { IoChevronDown } from 'react-icons/io5'
import { OrderItem } from '@/@types/carts'
import { ATTRIBUTE_KEYS } from '@/utils/constants'
import { cn, jsonSafeParse } from '@/utils/functions'

const columnLabels = [
  'Item',
  'Qty',
  'Frequency',
  'Fulfillment Date',
  'Next Fulfillment Date',
] as const

type TileProps = {
  order: OrderEdge
}

const Desktop = ({ order }: TileProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const orderItems = getOrderItems()

  function getOrderItems(): Array<OrderItem> {
    if (!order.node.customAttributes) return []
    const orderItem = order.node.customAttributes.find(
      (attribute) => attribute.key === ATTRIBUTE_KEYS.ITEMS
    )
    if (!orderItem) return []
    return jsonSafeParse<Array<OrderItem>>(orderItem.value as string) || []
  }

  const handleToggleAccordian = () => setIsOpen((prev) => !prev)

  return (
    <div>
      <div className='text-dark-gray grid h-[88px] w-full grid-cols-[1fr_1fr_1fr_24px] items-center bg-[#CCBC9E]/50 p-4'>
        <div className='flex flex-col gap-y-1'>
          <a
            className='text-dark-green text-2xl font-bold underline'
            href={order.node.statusUrl}
            target='_blank'
          >
            {order.node.name}
          </a>
          <p className='text-sm'>
            {DateTime.fromJSDate(new Date(order.node.processedAt)).toFormat(
              'd LLL yyyy'
            )}
          </p>
        </div>

        <div className='flex flex-col gap-y-1'>
          <p>{order.node.financialStatus}</p>
          <p>{order.node.fulfillmentStatus}</p>
        </div>

        <p className='text-2xl font-bold'>
          {order.node.totalPrice.amount} {order.node.totalPrice.currencyCode}
        </p>

        {orderItems.length > 0 && (
          <button
            className='text-dark-green cursor-pointer'
            onClick={handleToggleAccordian}
          >
            <IoChevronDown
              className={cn(
                'h-6 w-6 transition-transform',
                isOpen && 'rotate-180'
              )}
            />
          </button>
        )}
      </div>

      {/* Accordian */}
      <div
        className={cn(
          'bg-cream/30 col-span-full h-fit max-h-0 w-full overflow-hidden transition-[max_height]',
          isOpen && 'max-h-[1000px]'
        )}
      >
        <div className='grid grid-cols-[1fr_0.3fr_0.8fr_0.7fr_0.7fr] items-center gap-2 p-4 text-sm'>
          {columnLabels.map((label) => (
            <h1 key={label} className='font-bold uppercase'>
              {label}
            </h1>
          ))}

          <div className='bg-dark-gray/20 col-span-full h-[1px]' />

          {orderItems.map((item, index) => (
            <Fragment key={`${item.variant_id}-${index}`}>
              <p>{item.name}</p>
              <p>x{item.quantity}</p>
              <p>{item.frequency}</p>
              <p>{item.delivery_date}</p>
              <p>{item.next_delivery_date}</p>
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}

const Tile = {
  Desktop,
}

export default Tile
