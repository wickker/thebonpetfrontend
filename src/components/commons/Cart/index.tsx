import { useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { DateTime } from 'luxon'
import { AnimatePresence, motion } from 'motion/react'
import { Fragment } from 'react/jsx-runtime'
import { IoCloseOutline } from 'react-icons/io5'
import { TbShoppingBagExclamation } from 'react-icons/tb'
import { Button, DateSelect, TimeSlotSelect } from '@/components/commons'
import { DATE_FORMAT } from '@/components/commons/DateSelect/dateSelect'
import useCart from '@/hooks/queries/useCart'
import { useCartActions, useIsCartOpen } from '@/store/useCartStore'
import { getCartJsonFromLocalStorage } from '@/utils/functions'
import CheckoutNotice from './CheckoutNotice'
import Skeleton from './Skeleton'
import Tile from './Tile'
import { getDeliveryDate, getTimeSlot } from './utils'

const Cart = () => {
  // cart
  const cart = getCartJsonFromLocalStorage()
  const isCartOpen = useIsCartOpen()
  const { closeCart } = useCartActions()
  const { useGetCartQuery } = useCart()
  const getCart = useGetCartQuery(cart?.cartId)
  const hasCart = cart && getCart.data && getCart.isSuccess

  // delivery date, time and special instructions
  const now = DateTime.now().plus({ day: 8 }).toFormat(DATE_FORMAT)
  const deliveryDate = getDeliveryDate(getCart.data?.attributes)
  const timeSlot = getTimeSlot(getCart.data?.attributes)
  const [selectedDate, setSelectedDate] = useState(deliveryDate || now)
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(
    timeSlot || '9:00 AM - 12:00 PM'
  )
  const noteRef = useRef<HTMLTextAreaElement>(null)

  const handleCheckout = () => {
    console.log(selectedDate, selectedTimeSlot)
    console.log(noteRef.current?.value)
  }

  const renderCart = () => {
    if (getCart.isLoading) {
      return (
        <div className='scrollbar flex flex-col overflow-y-auto p-4'>
          <Skeleton />
        </div>
      )
    }

    if (!hasCart) {
      return (
        <div className='scrollbar text-dark-green flex flex-col items-center gap-y-8 overflow-y-auto p-4'>
          <TbShoppingBagExclamation className='text-green h-20 w-20' />
          <p className='text-center'>
            Looks like you have not added any items to your cart yet.
          </p>
        </div>
      )
    }

    return (
      <>
        <div className='scrollbar flex flex-col overflow-y-auto p-4'>
          {getCart.data?.lines.edges.map((line) => (
            <Fragment key={line.node.id}>
              <Tile line={line.node} />
              <div className='my-4 flex h-[1px] w-full shrink-0 rounded-full bg-[#CCBC9E]' />
            </Fragment>
          ))}

          <label className='text-dark-green mb-2 font-semibold'>
            Order special instructions
          </label>
          <textarea
            className='text-dark-gray focus:border-dark-green scrollbar block min-h-[66px] w-full border border-[#90988F] px-3 py-2 outline-none hover:border-[2px] focus:border-[2px]'
            rows={2}
            ref={noteRef}
          />
        </div>

        <div
          className='flex flex-col px-4 py-6'
          style={{
            backgroundImage: `linear-gradient(var(--color-beige-95), var(--color-beige-95)), url('/background.png')`,
          }}
        >
          <div className='mb-6 grid grid-cols-[1fr_1.2fr] items-center gap-x-2'>
            <label className='text-dark-green col-span-full mb-2 font-semibold'>
              Select delivery / pickup date and time
            </label>
            <DateSelect
              selectedDate={selectedDate}
              onSelectDate={setSelectedDate}
            />
            <TimeSlotSelect
              selectedTimeSlot={selectedTimeSlot}
              onSelectTimeSlot={setSelectedTimeSlot}
            />
          </div>

          <div className='flex h-[2px] w-full shrink-0 rounded-full bg-[#CCBC9E]' />

          <div className='my-4 flex w-full items-center justify-between'>
            <p className='font-bold'>Estimated total</p>
            <p className='text-2xl font-bold'>
              {getCart.data.cost.totalAmount.amount}{' '}
              {getCart.data.cost.totalAmount.currencyCode}
            </p>
          </div>

          <Button.Plain
            className='mb-4 w-full justify-center'
            onClick={handleCheckout}
          >
            Checkout
          </Button.Plain>

          <CheckoutNotice cart={getCart.data} />
        </div>
      </>
    )
  }

  return createPortal(
    <AnimatePresence>
      {isCartOpen && (
        <motion.div
          className='fixed top-0 right-0 z-20 grid h-full w-full grid-rows-[auto_1fr_auto] shadow sm:max-w-md'
          initial={{ x: 500 }}
          animate={{ x: 0 }}
          exit={{ x: 500 }}
          transition={{ duration: 0.15, type: 'tween' }}
          style={{
            backgroundImage: `linear-gradient(var(--color-cream-98), var(--color-cream-98)), url('/background.png')`,
          }}
        >
          <div className='text-dark-green flex items-center justify-between p-4 text-3xl font-bold'>
            CART
            <button onClick={closeCart} className='cursor-pointer'>
              <IoCloseOutline className='h-10 w-10' />
            </button>
          </div>

          {renderCart()}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}

export default Cart
