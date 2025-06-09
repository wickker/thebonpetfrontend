import { FAQS } from '@/components/Home/Section7Faqs/data'
import { ROUTES } from '@/utils/constants'

const Faqs = () => {
  return (
    <div className='mx-auto flex max-w-[100dvw] flex-col items-center lg:max-w-6xl'>
      <div className='flex w-[100dvw] flex-col px-4 sm:w-full md:w-3/4 lg:w-2/3'>
        <h1 className='text-dark-green py-8 text-center text-4xl font-bold'>
          Frequently Asked Questions
        </h1>

        <div className='text-dark-green space-y-6 pb-12'>
          {FAQS.map((faq, index) => (
            <section key={index} className='space-y-4'>
              <h2 className='text-xl font-bold'>
                {index + 1}. {faq.question}
              </h2>
              <div className='pl-0'>{faq.answer}</div>
            </section>
          ))}

          <div className='my-2 mb-6 h-[2px] w-full rounded-full bg-[#CCBC9E]' />

          <section className='space-y-4'>
            <h2 className='text-2xl font-bold'>Need More Help?</h2>
            <p>
              If you have additional questions, please feel free to{' '}
              <a href={ROUTES.CONTACT} className='underline'>
                contact us
              </a>
              . We're here to help!
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Faqs
