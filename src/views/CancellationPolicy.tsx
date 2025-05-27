const CancellationPolicy = () => {
  return (
    <div className='mx-auto flex max-w-[100dvw] flex-col items-center lg:max-w-6xl'>
      <div className='flex w-[100dvw] flex-col px-4 sm:w-full md:w-3/4 lg:w-2/3'>
        <h1 className='text-dark-green py-8 text-center text-4xl font-bold'>
          Cancellation policy
        </h1>
        <p className='mb-6'>
          Some items in our store may be offered to you as a subscription, a
          pre-order or try before you buy. This cancellation policy lays out how
          you can change or cancel these kinds of purchases.
        </p>

        <h2 className='text-dark-green py-4 text-2xl font-semibold'>
          Subscriptions
        </h2>
        <p className='mb-3'>
          When you purchase a subscription you'll receive repeat deliveries.
          These are based on the subscription duration and frequency that you
          select.
        </p>
        <p className='mb-3'>
          Your payment details will be stored securely and you'll be charged for
          each of these deliveries, unless you choose to pay in advance.
        </p>
        <p className='mb-3'>
          Some subscriptions may auto-renew at the end of their duration. If you
          don't want to renew a subscription you can cancel it.
        </p>
        <p className='mb-3'>
          If you want to cancel or change your subscription, you can do it at
          any time. Your order confirmation emails have links to your order. You
          can manage your subscription from there.
        </p>
        <p className='mb-6'>
          See our returns policy for more details on returns and refunds.
        </p>

        <h2 className='text-dark-green py-4 text-2xl font-semibold'>
          Pre-orders
        </h2>
        <p className='mb-3'>
          When you purchase a pre-order, you are buying an out-of-stock or
          soon-to-be-available product not yet in inventory. We may collect no
          payment or a partial deposit at checkout, store your payment method,
          then fulfill and charge the full or remaining payment at a future
          date.
        </p>
        <p className='mb-6'>
          You can cancel a partially paid pre-order order that has not yet been
          fulfilled. If the order has been fulfilled, then you can't cancel the
          order, but you can request a full or partial refund. See our returns
          policy for more details on returns and refunds.
        </p>

        <h2 className='text-dark-green py-4 text-2xl font-semibold'>
          Try before you buy
        </h2>
        <p className='mb-6'>
          When you purchase a try before you buy item, we authorize your payment
          method before fulfilling the order. You will have a certain amount of
          time to decide if you want to keep the item. Once the time period has
          passed, if you have not returned the item, we will charge your payment
          method for the full amount.
        </p>
      </div>
    </div>
  )
}

export default CancellationPolicy
