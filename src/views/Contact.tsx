import { FaInstagram, FaTelegram, FaWhatsapp } from 'react-icons/fa'
import { MdEmail, MdLocationOn } from 'react-icons/md'
import { LINKS } from '@/utils/constants'

const Contact = () => {
  return (
    <div className='mx-auto flex max-w-[100dvw] flex-col items-center lg:max-w-6xl'>
      <div className='flex w-[100dvw] flex-col px-4 sm:w-full md:w-3/4 lg:w-2/3'>
        <h1 className='text-dark-green py-8 text-center text-4xl font-bold'>
          Contact
        </h1>

        <div className='text-dark-green space-y-6 pb-12'>
          <section className='space-y-4'>
            <p>
              Have questions about our products, your pet's nutrition, or
              anything else? Reach out to us on Instagram or Telegram and our
              team of experts will be happy to assist you.
            </p>
            <p>
              Follow us on Instagram for updates on new product launches,
              exclusive discounts, giveaways, and expert tips on feline / canine
              nutrition and wellness.
            </p>
          </section>

          <section className='space-y-4'>
            <p>
              <FaInstagram className='mr-2 inline-block text-xl' />
              <span className='font-bold'>Instagram:</span>{' '}
              <a href={LINKS.INSTAGRAM} className='underline'>
                @thebonpet
              </a>
            </p>
            <p>
              <FaTelegram className='mr-2 inline-block text-xl' />
              <span className='font-bold'>Telegram:</span>{' '}
              <a href={LINKS.TELEGRAM} className='underline'>
                @thebonpet
              </a>
            </p>
            <p>
              <FaWhatsapp className='mr-2 inline-block text-xl' />
              <span className='font-bold'>WhatsApp:</span>{' '}
              <a href={LINKS.WHATSAPP} className='underline'>
                The Bon Pet
              </a>
            </p>
            <p>
              <MdEmail className='mr-2 inline-block text-xl' />
              <span className='font-bold'>Email:</span>{' '}
              <a href={LINKS.MAIL} className='underline'>
                hello@thebonpet.com
              </a>
            </p>
            <p>
              <MdLocationOn className='mr-2 inline-block text-xl' />
              <span className='font-bold'>Address:</span> The Promenade @
              Pelikat, B1-13, Singapore 537643
            </p>
          </section>

          <section className='space-y-4'>
            <p>
              We're here to help you make the best choices for your pet's health
              and happiness.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Contact
