import { Cart } from '@shopify/hydrogen-react/storefront-api-types'
import { Button, DateSelect, TimeSlotSelect } from '@/components/commons'
import { ROUTES } from '@/utils/constants'
import { hasSubscription } from './utils'

type FooterProps = {
  cart: Cart
}

const Footer = ({ cart }: FooterProps) => {
  return (
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
        <DateSelect />
        <TimeSlotSelect />
      </div>

      <div className='flex h-[2px] w-full shrink-0 rounded-full bg-[#CCBC9E]' />

      <div className='my-4 flex w-full items-center justify-between'>
        <p className='font-bold'>Estimated total</p>
        <p className='text-2xl font-bold'>
          {cart.cost.totalAmount.amount} {cart.cost.totalAmount.currencyCode}
        </p>
      </div>

      <Button.Plain className='mb-4 w-full justify-center'>
        Checkout
      </Button.Plain>

      {hasSubscription(cart) && (
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
          and authorize The Bon Pet to charge your payment method at the prices,
          frequency and dates listed on this page until the order is
        </p>
      )}
    </div>
  )
}

export default Footer
