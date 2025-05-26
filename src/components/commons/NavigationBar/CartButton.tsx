import useCart from '@/hooks/queries/useCart'
import { useCartActions } from '@/store/useCartStore'
import { getCartJsonFromLocalStorage } from '@/utils/functions'

const CartButton = () => {
  const { openCart } = useCartActions()
  const cart = getCartJsonFromLocalStorage()
  const { useGetCartQuery } = useCart()
  const getCart = useGetCartQuery(cart?.cartId)
  const hasCart = cart && getCart.data && getCart.isSuccess

  return (
    <button className='relative cursor-pointer' onClick={openCart}>
      <img src='/icons/cart.png' alt='Cart' className='h-5 w-5' />

      {hasCart && (
        <div className='bg-green absolute right-[-8px] bottom-[-6px] grid h-4 w-4 place-items-center rounded-full text-[8px] text-white'>
          {getCart.data.lines.edges.length}
        </div>
      )}
    </button>
  )
}

export default CartButton
