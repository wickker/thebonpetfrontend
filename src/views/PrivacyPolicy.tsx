import { ROUTES } from '@/utils/constants'

const PrivacyPolicy = () => {
  return (
    <div className='mx-auto flex max-w-[100dvw] flex-col items-center lg:max-w-6xl'>
      <div className='flex w-[100dvw] flex-col px-4 sm:w-full md:w-3/4 lg:w-2/3'>
        <h1 className='text-dark-green py-8 text-center text-4xl font-bold'>
          Privacy policy
        </h1>

        <div className='text-dark-green space-y-6 pb-12'>
          <section className='space-y-4'>
            <p>
              The Bon Pet ("we", "our", or "us") is committed to protecting your
              privacy. This Privacy Policy explains how we collect, use,
              disclose, and safeguard your information when you visit our{' '}
              <a href={ROUTES.HOME} className='underline'>
                website
              </a>{' '}
              and make purchases through our Shopify store, whether one-time or
              by subscription.
            </p>
          </section>

          <section className='space-y-4'>
            <h2 className='text-xl font-bold'>1. Information We Collect</h2>
            <p>
              We collect personal information you provide directly to us, such
              as:
            </p>
            <ul className='list-disc space-y-2 pl-6'>
              <li>
                Contact Information: name, email address, phone number, shipping
                and billing address
              </li>
              <li>
                Order Information: items purchased, payment details (processed
                via Shopify), order history
              </li>
              <li>
                Account Information (if applicable): login credentials,
                preferences
              </li>
              <li>
                Subscription Information: frequency and details of recurring
                orders
              </li>
              <li>
                Automatically Collected Data: IP address, browser type, device
                info, pages visited (via cookies and analytics tools)
              </li>
            </ul>
          </section>

          <section className='space-y-4'>
            <h2 className='text-xl font-bold'>
              2. How We Use Your Information
            </h2>
            <p>We use your information to:</p>
            <ul className='list-disc space-y-2 pl-6'>
              <li>Fulfill and manage your orders</li>
              <li>Process payments and provide receipts</li>
              <li>Manage subscriptions and recurring deliveries</li>
              <li>
                Send order updates, marketing emails (only with your consent),
                and customer service communications
              </li>
              <li>Improve our products, services, and website</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className='space-y-4'>
            <h2 className='text-xl font-bold'>3. Sharing Your Information</h2>
            <p>We may share your data with:</p>
            <ul className='list-disc space-y-2 pl-6'>
              <li>Shopify: for e-commerce and payment processing</li>
              <li>
                Third-party service providers: such as delivery couriers, email
                marketing platforms, analytics tools
              </li>
              <li>
                Legal authorities: when required by law or to protect our rights
              </li>
            </ul>
            <p>We do not sell your personal data to third parties.</p>
          </section>

          <section className='space-y-4'>
            <h2 className='text-xl font-bold'>4. Cookies & Tracking</h2>
            <p>We use cookies and similar technologies to:</p>
            <ul className='list-disc space-y-2 pl-6'>
              <li>Keep your shopping cart active</li>
              <li>Analyze website usage</li>
              <li>Customize your browsing experience</li>
            </ul>
            <p>You can control cookies through your browser settings.</p>
          </section>

          <section className='space-y-4'>
            <h2 className='text-xl font-bold'>5. Email Marketing</h2>
            <p>
              If you opt in, we may send promotional emails. You can unsubscribe
              at any time via the link in the email or by contacting us
              directly.
            </p>
          </section>

          <section className='space-y-4'>
            <h2 className='text-xl font-bold'>6. Data Retention</h2>
            <p>
              We retain your information as long as needed for legitimate
              business purposes or to comply with legal obligations.
            </p>
          </section>

          <section className='space-y-4'>
            <h2 className='text-xl font-bold'>7. Your Rights</h2>
            <p>Depending on your location, you may have the right to:</p>
            <ul className='list-disc space-y-2 pl-6'>
              <li>Access, correct, or delete your data</li>
              <li>Object to or restrict data processing</li>
              <li>Withdraw consent for marketing</li>
              <li>File a complaint with your data protection authority</li>
            </ul>
          </section>

          <section className='space-y-4'>
            <h2 className='text-xl font-bold'>8. Security</h2>
            <p>
              We implement reasonable safeguards to protect your personal data,
              but no method is 100% secure. Your use of our site assumes this
              risk.
            </p>
          </section>

          <section className='space-y-4'>
            <h2 className='text-xl font-bold'>9. Shopify</h2>
            <p>
              Our store is hosted on Shopify Inc. Your data is stored through
              Shopify's secure data storage and payment systems. For more
              details, see Shopify's Privacy Policy.
            </p>
          </section>

          <section className='space-y-4'>
            <h2 className='text-xl font-bold'>10. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy periodically. Changes will be
              posted on this page with an updated effective date.
            </p>
          </section>

          <section className='space-y-4'>
            <h2 className='text-xl font-bold'>11. Contact Us</h2>
            <p>
              If you have questions or requests regarding your privacy, please
              contact us{' '}
              <a href={ROUTES.CONTACT} className='underline'>
                here
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicy
