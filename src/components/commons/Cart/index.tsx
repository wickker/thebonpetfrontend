import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'motion/react'
import { IoCloseOutline } from 'react-icons/io5'
import { Button } from '@/components/commons'
import useCart from '@/hooks/queries/useCart'
import { useCartActions, useIsCartOpen } from '@/store/useCartStore'
import { ROUTES } from '@/utils/constants'
import { getCartJsonFromLocalStorage } from '@/utils/functions'
import Tile from './Tile'
import { hasSubscription } from './utils'

const Cart = () => {
  const cart = getCartJsonFromLocalStorage()
  const isCartOpen = useIsCartOpen()
  const { closeCart } = useCartActions()
  const { useGetCartQuery } = useCart()
  const getCart = useGetCartQuery(cart?.cartId)

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

          {/* TODO: Handle falsey cart, loading cart etc. */}

          <div className='scrollbar flex flex-col overflow-y-auto p-4'>
            {getCart.data?.lines.edges.map((line) => {
              return (
                <>
                  <Tile key={line.node.id} line={line.node} />
                  <div className='my-4 flex h-[1px] w-full shrink-0 bg-[#CCBC9E]' />
                </>
              )
            })}

            <label className='text-dark-green mb-2 font-semibold'>
              Order special instructions
            </label>
            <textarea
              className='text-dark-gray focus:border-dark-green block min-h-[66px] w-full border border-[#90988F] px-3 py-2 outline-none hover:border-[2px] focus:border-[2px]'
              rows={2}
            />
          </div>

          <div
            className='flex flex-col gap-y-4 px-4 py-6'
            style={{
              backgroundImage: `linear-gradient(var(--color-beige-95), var(--color-beige-95)), url('/background.png')`,
            }}
          >
            <div className='flex w-full items-center justify-between'>
              <p className='font-bold'>Estimated total</p>
              <p className='text-2xl font-bold'>
                {getCart.data?.cost.totalAmount.amount}{' '}
                {getCart.data?.cost.totalAmount.currencyCode}
              </p>
            </div>

            <Button.Plain className='w-full justify-center'>
              Checkout
            </Button.Plain>

            {hasSubscription(getCart.data) && (
              <p className='text-dark-green text-center text-xs'>
                One or more of the items in your cart is a recurring or deferred
                purchase. By continuing, you agree to the{' '}
                <a
                  href={ROUTES.CANCELLATION_POLICY}
                  target='_blank'
                  className='cursor-pointer underline'
                >
                  cancellation policy
                </a>{' '}
                and authorize The Bon Pet to charge your payment method at the
                prices, frequency and dates listed on this page until the order
                is
              </p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}

export default Cart
