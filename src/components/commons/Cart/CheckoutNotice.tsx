import { Cart } from '@shopify/hydrogen-react/storefront-api-types'
import { ROUTES } from '@/utils/constants'
import { hasSubscription } from './utils'

type CheckoutNoticeProps = {
  cart: Cart
}

const CheckoutNotice = ({ cart }: CheckoutNoticeProps) => {
  if (hasSubscription(cart)) {
    return (
      <p className='text-dark-green text-center text-xs'>
        One or more of the items in your cart is a recurring or deferred
        purchase. By continuing, you agree to the{' '}
        <a href={ROUTES.CANCELLATION_POLICY} className='underline'>
          cancellation policy
        </a>{' '}
        and authorize The Bon Pet to charge your payment method at the prices,
        frequency and dates listed on this page.
      </p>
    )
  }
}

export default CheckoutNotice
