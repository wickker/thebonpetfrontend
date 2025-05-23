import { ROUTES } from '@/utils/constants'

const footerItems = {
  Company: [
    {
      label: 'About',
      link: ROUTES.HOME, // TODO: Change this
    },
    {
      label: 'FAQs',
      link: `${ROUTES.HOME}#faqs`,
    },
    {
      label: 'Blog',
      link: ROUTES.BLOG,
    },
    {
      label: 'Contact',
      link: ROUTES.CONTACT,
    },
  ],
  Explore: [
    {
      label: 'Pickup & Shipping Policy',
      link: ROUTES.HOME,
    },
    {
      label: 'Refund Policy',
      link: ROUTES.REFUND_POLICY,
    },
    {
      label: 'Terms of Service',
      link: ROUTES.TERMS_OF_SERVICE,
    },
    {
      label: 'Privacy Policy',
      link: ROUTES.PRIVACY_POLICY,
    },
  ],
  'Work With Us': [
    {
      label: 'Creators',
      link: ROUTES.CONTACT,
    },
    {
      label: 'Professionals',
      link: ROUTES.CONTACT,
    },
    {
      label: 'Vets',
      link: ROUTES.CONTACT,
    },
  ],
} as const

const Footer = () => {
  return (
    <div className='grid w-full grid-cols-[1fr_1fr_1fr_1fr_auto] gap-x-12 bg-[#03453D] p-12'>
      <div className='flex flex-col gap-y-2 text-2xl font-bold text-white'>
        TBP
        <div className='flex items-center gap-x-3'>
          <button className='cursor-pointer'>
            <img
              src='/icons/facebook.png'
              alt='Facebook icon'
              className='h-5 w-5'
            />
          </button>
          <button
            className='cursor-pointer'
            onClick={() =>
              window.open(
                'https://www.instagram.com/thebonpet/',
                '_blank',
                'noopener,noreferrer'
              )
            }
          >
            <img
              src='/icons/instagram.png'
              alt='Instagram icon'
              className='h-5 w-5'
            />
          </button>
          <button className='cursor-pointer'>
            <img src='/icons/x.png' alt='X icon' className='h-5 w-5' />
          </button>
        </div>
      </div>

      {Object.entries(footerItems).map(([key, items]) => (
        <div key={key} className='flex flex-col gap-y-2 text-white'>
          <p className='text-xl font-bold'>{key}</p>
          {items.map((item) => (
            <button key={item.label} className='text-left opacity-65'>
              {item.label}
            </button>
          ))}
        </div>
      ))}

      <div className='flex flex-col gap-y-1 text-white'>
        <p className='text-xl font-bold'>Subscribe to TheBonPet</p>

        <div className='text-sm'>
          Join our newsletter for exclusive offers and pet health tips.
        </div>

        <div className='mt-2 flex w-full items-center gap-x-2'>
          <div className='relative h-[40px] w-full rounded-full px-4 py-2 outline-none'>
            <div className='absolute top-0 left-0 z-0 h-full w-full rounded-full bg-white opacity-40' />
            <input
              type='text'
              placeholder='Email address'
              className='isolate w-full text-sm text-white outline-none'
            />
          </div>

          <button className='h-[40px] cursor-pointer rounded-full border border-[#ffffff33] px-4 py-2 text-white disabled:cursor-not-allowed'>
            Subscribe
          </button>
        </div>
      </div>

      <div className='col-span-full my-3 h-[2px] rounded-full bg-white opacity-20' />

      <div className='col-span-full text-center text-sm text-white opacity-65'>
        © TheBonPet 2025
      </div>
    </div>
  )
}

export default Footer
