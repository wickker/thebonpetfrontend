import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'motion/react'
import { IoCloseOutline } from 'react-icons/io5'
import { useCartActions, useIsCartOpen } from '@/store/useCartStore'

const Cart = () => {
  const isCartOpen = useIsCartOpen()
  const { closeCart } = useCartActions()

  return createPortal(
    <AnimatePresence>
      {isCartOpen && (
        <motion.div
          className='fixed top-0 right-0 z-20 h-full w-full p-4 shadow sm:max-w-md'
          initial={{ x: 500 }}
          animate={{ x: 0 }}
          exit={{ x: 500 }}
          transition={{ duration: 0.15, type: 'tween' }}
          style={{
            backgroundImage: `linear-gradient(var(--color-cream-98), var(--color-cream-98)), url('/background.png')`,
          }}
        >
          <div className='text-dark-green mb-8 flex items-center justify-between text-3xl font-bold'>
            CART
            <button onClick={closeCart} className='cursor-pointer'>
              <IoCloseOutline className='h-10 w-10' />
            </button>
          </div>

          {/* <div className='my-4 h-[1px] w-full bg-[#CCBC9E]' /> */}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}

export default Cart
