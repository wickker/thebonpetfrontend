import { DateTime } from 'luxon'
import useCart from '@/hooks/queries/useCart'
import { useCartActions } from '@/store/useCartStore'
import { useLocalStorageCartJson } from '@/store/useLocalStorageCartStore'

const CartButton = () => {
  const { openCart } = useCartActions()
  const cart = useLocalStorageCartJson()
  const { useGetCartQuery } = useCart()
  const getCart = useGetCartQuery()
  const showCartCount =
    getCart.data &&
    getCart.data.lines.edges.length > 0 &&
    DateTime.now() < DateTime.fromISO(cart?.expiresAt || '')

  return (
    <button className='relative cursor-pointer' onClick={openCart}>
      <img src='/icons/cart.png' alt='Cart icon' className='h-5 w-5' />

      {showCartCount && (
        <div className='bg-green absolute right-[-8px] bottom-[-6px] grid h-4 w-4 place-items-center rounded-full text-[8px] text-white'>
          {getCart.data.lines.edges.length}
        </div>
      )}
    </button>
  )
}

export default CartButton
