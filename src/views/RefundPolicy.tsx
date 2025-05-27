const RefundPolicy = () => {
  return (
    <div className='mx-auto flex max-w-[100dvw] flex-col items-center lg:max-w-6xl'>
      <div className='flex w-[100dvw] flex-col px-4 sm:w-full md:w-3/4 lg:w-2/3'>
        <h1 className='text-dark-green py-8 text-center text-4xl font-bold'>
          Refund Policy
        </h1>

        <div className='text-dark-green space-y-6 pb-12'>
          <section className='space-y-4'>
            <h2 className='text-xl font-bold'>RETURN POLICY</h2>
            <p>
              We have a 14-day return policy, which means you have 14 days after
              receiving your item to request a return.
            </p>
            <p>
              To be eligible for a return, your item must be in the same
              condition that you received it, unworn or unused, with tags, and
              in its original packaging. You'll also need the receipt or proof
              of purchase.
            </p>
            <p>
              To start a return, you can contact us at{' '}
              <a href='mailto:hello@thebonpet.com' className='underline'>
                hello@thebonpet.com
              </a>
              .
            </p>
            <p>
              If your return is accepted, we'll send you a return shipping
              label, as well as instructions on how and where to send your
              package. Items sent back to us without first requesting a return
              will not be accepted.
            </p>
            <p>
              You can always contact us for any return question at{' '}
              <a href='mailto:hello@thebonpet.com' className='underline'>
                hello@thebonpet.com
              </a>
              .
            </p>
          </section>

          <section className='space-y-4'>
            <h2 className='text-xl font-bold'>DAMAGES AND ISSUES</h2>
            <p>
              Please inspect your order upon reception and contact us
              immediately if the item is defective, damaged or if you receive
              the wrong item, so that we can evaluate the issue and make it
              right.
            </p>
          </section>

          <section className='space-y-4'>
            <h2 className='text-xl font-bold'>
              EXCEPTIONS / NON-RETURNABLE ITEMS
            </h2>
            <p>
              Certain types of items cannot be returned, like perishable goods
              (such as food, flowers, or plants), custom products (such as
              special orders or personalized items), and personal care goods
              (such as beauty products). We also do not accept returns for
              hazardous materials, flammable liquids, or gases. Please get in
              touch if you have questions or concerns about your specific item.
            </p>
            <p>
              Unfortunately, we cannot accept returns on sale items or gift
              cards.
            </p>
          </section>

          <section className='space-y-4'>
            <h2 className='text-xl font-bold'>EXCHANGES</h2>
            <p>
              The fastest way to ensure you get what you want is to return the
              item you have, and once the return is accepted, make a separate
              purchase for the new item.
            </p>
          </section>

          <section className='space-y-4'>
            <h2 className='text-xl font-bold'>REFUNDS</h2>
            <p>
              We will notify you once we've received and inspected your return,
              and let you know if the refund was approved or not. If approved,
              you'll be automatically refunded on your original payment method
              within 10 business days. Please remember it can take some time for
              your bank or credit card company to process and post the refund
              too.
            </p>
            <p>
              If more than 15 business days have passed since we've approved
              your return, please contact us at{' '}
              <a href='mailto:hello@thebonpet.com' className='underline'>
                hello@thebonpet.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

export default RefundPolicy
