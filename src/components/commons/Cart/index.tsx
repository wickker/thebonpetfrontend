import { MouseEvent, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Controller, useForm } from 'react-hook-form'
import { DateTime } from 'luxon'
import { AnimatePresence, motion } from 'motion/react'
import { Fragment } from 'react/jsx-runtime'
import { IoCloseOutline } from 'react-icons/io5'
import {
  CartForm,
  UpdateCartNoteBuyerIdentityAndAttributesResponse,
} from '@/@types/carts'
import {
  Button,
  DateSelect,
  EmptyDisplay,
  TimeSlotSelect,
} from '@/components/commons'
import { DATE_SELECT_FORMAT } from '@/components/commons/DateSelect/dateSelect'
import { useToastContext } from '@/contexts/useToastContext/context'
import useCart from '@/hooks/queries/useCart'
import { useCartActions, useIsCartOpen } from '@/store/useCartStore'
import {
  getCartJsonFromLocalStorage,
  getTokenJsonFromLocalStorage,
} from '@/utils/functions'
import CheckoutNotice from './CheckoutNotice'
import Skeleton from './Skeleton'
import Tile from './Tile'
import {
  composeAttributes,
  getDeliveryDate,
  getTimeSlot,
  TIME_SLOTS,
} from './utils'

const Cart = () => {
  const { toast } = useToastContext()

  // cart
  const cart = getCartJsonFromLocalStorage()
  const isCartOpen = useIsCartOpen()
  const { closeCart } = useCartActions()
  const { useGetCartQuery } = useCart()
  const getCart = useGetCartQuery(cart?.cartId)
  const hasCart =
    getCart.data &&
    getCart.isSuccess &&
    getCart.data.lines.edges.length > 0 &&
    DateTime.now() < DateTime.fromISO(cart?.expiresAt || '')

  // delivery date, time and special instructions
  const { handleSubmit, register, control, setValue } = useForm<CartForm>({
    defaultValues: {
      note: '',
      date: DateTime.now().plus({ day: 8 }).toFormat(DATE_SELECT_FORMAT),
      timeSlot: TIME_SLOTS[0],
    },
  })
  const [isRedirecting, setIsRedirecting] = useState(false)
  const { useUpdateCartNoteBuyerIdentityAndAttributesMutation } = useCart()
  const updateCart = useUpdateCartNoteBuyerIdentityAndAttributesMutation(
    handleUpdateCartSuccess
  )

  function handleUpdateCartSuccess(
    data: UpdateCartNoteBuyerIdentityAndAttributesResponse
  ) {
    const errors = [
      ...data[0].userErrors,
      ...data[1].userErrors,
      ...data[2].userErrors,
    ]
    if (errors.length > 0) {
      setIsRedirecting(false)
      toast.error({ message: errors[0].message })
      return
    }
    window.location.href = getCart.data?.checkoutUrl || ''
  }

  const onSubmit = (data: CartForm) => {
    if (!getCart.data) return
    const { note, date, timeSlot } = data
    const token = getTokenJsonFromLocalStorage()
    const attributes = composeAttributes(timeSlot, date, getCart.data)
    setIsRedirecting(true)
    updateCart.mutate({
      cartId: getCart.data.id,
      note: note.trim() || '',
      attributes,
      buyerIdentity: {
        customerAccessToken: token?.accessToken,
      },
    })
  }

  const handleCloseCart = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    closeCart()
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
        <EmptyDisplay
          title='No items yet'
          description='Browse our selection of premium pet food to keep your furry friends happy and healthy!'
        />
      )
    }

    return (
      <>
        <div className='scrollbar-green flex flex-col overflow-y-auto px-4 pt-6 pb-4'>
          {getCart.data.lines.edges.map((line) => (
            <Fragment key={line.node.id}>
              <Tile line={line.node} cartId={getCart.data.id} />
              <div className='my-4 flex h-[1px] shrink-0 rounded-full bg-[#CCBC9E]' />
            </Fragment>
          ))}

          <label className='text-dark-green mb-2 font-bold'>
            Order special instructions
          </label>
          <textarea
            className='text-dark-gray focus:border-dark-green scrollbar block min-h-[66px] w-full border border-[#90988F] px-3 py-2 outline-none hover:border-[2px] focus:border-[2px]'
            rows={2}
            {...register('note')}
          />
        </div>

        <div className='flex flex-col px-4 py-6'>
          <div className='mb-6 grid grid-cols-[1fr_1.2fr] items-center gap-x-2'>
            <label className='text-dark-green col-span-full mb-2 font-bold'>
              Select delivery / pickup date and time
            </label>
            <Controller
              control={control}
              name='date'
              render={({ field }) => (
                <DateSelect
                  selectedDate={field.value}
                  onSelectDate={field.onChange}
                />
              )}
            />
            <Controller
              control={control}
              name='timeSlot'
              render={({ field }) => (
                <TimeSlotSelect
                  selectedTimeSlot={field.value}
                  onSelectTimeSlot={field.onChange}
                />
              )}
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
            className='z-10 mb-4 w-full justify-center'
            onClick={handleSubmit(onSubmit)}
            isLoading={isRedirecting}
            type='submit'
          >
            Checkout
          </Button.Plain>
          {isRedirecting && (
            <motion.div
              className='pointer-events-none fixed inset-0 bg-black/30'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />
          )}

          <CheckoutNotice cart={getCart.data} />
        </div>
      </>
    )
  }

  useEffect(() => {
    if (!getCart.data) return
    const date = getDeliveryDate(getCart.data.attributes)
    const timeSlot = getTimeSlot(getCart.data.attributes)

    if (date) setValue('date', date)
    if (timeSlot) setValue('timeSlot', timeSlot)
    setValue('note', getCart.data.note || '')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getCart.data])

  return createPortal(
    <AnimatePresence>
      {isCartOpen && (
        <form>
          <motion.div
            className='fixed top-0 right-0 z-20 grid h-full w-full grid-rows-[auto_1fr_auto] shadow-lg sm:max-w-md'
            initial={{ x: 500 }}
            animate={{ x: 0 }}
            exit={{ x: 500 }}
            transition={{ duration: 0.15, type: 'tween' }}
            style={{
              backgroundImage: `linear-gradient(var(--color-cream-98) 0%, var(--color-cream-98) 46%, var(--color-beige-95) 68%, var(--color-beige-95) 100%), url('/background.png')`,
            }}
          >
            <div className='bg-dark-green flex items-center justify-between px-4 py-2 text-3xl tracking-wider text-white'>
              CART
              <button onClick={handleCloseCart} className='cursor-pointer'>
                <IoCloseOutline className='h-10 w-10' />
              </button>
            </div>

            {renderCart()}
          </motion.div>
        </form>
      )}
    </AnimatePresence>,
    document.body
  )
}

export default Cart
