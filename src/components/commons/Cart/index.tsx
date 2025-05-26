import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'motion/react'
import { IoCloseOutline } from 'react-icons/io5'
import { TbShoppingBagExclamation } from 'react-icons/tb'
import useCart from '@/hooks/queries/useCart'
import { useCartActions, useIsCartOpen } from '@/store/useCartStore'
import { getCartJsonFromLocalStorage } from '@/utils/functions'
import Footer from './Footer'
import Skeleton from './Skeleton'
import Tile from './Tile'

const Cart = () => {
  const cart = getCartJsonFromLocalStorage()
  const isCartOpen = useIsCartOpen()
  const { closeCart } = useCartActions()
  const { useGetCartQuery } = useCart()
  const getCart = useGetCartQuery(cart?.cartId)
  const hasCart = cart && getCart.data && getCart.isSuccess

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
            <>
              <Tile key={line.node.id} line={line.node} />
              <div className='my-4 flex h-[1px] w-full shrink-0 rounded-full bg-[#CCBC9E]' />
            </>
          ))}

          <label className='text-dark-green mb-2 font-semibold'>
            Order special instructions
          </label>
          <textarea
            className='text-dark-gray focus:border-dark-green block min-h-[66px] w-full border border-[#90988F] px-3 py-2 outline-none hover:border-[2px] focus:border-[2px]'
            rows={2}
          />
        </div>

        <Footer cart={getCart.data} />
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
