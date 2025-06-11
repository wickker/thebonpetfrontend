import { useNavigate } from 'react-router-dom'
import { MdOutlineArticle } from 'react-icons/md'
import useBlog from '@/hooks/queries/useBlog'
import { ROUTES } from '@/utils/constants'
import Accordian from './Accordian'
import ArticleSkeleton from './ArticleSkeleton'
import { FAQS } from './data'

const Section7Faqs = () => {
  const { useGetArticlesQuery } = useBlog()
  const getArticles = useGetArticlesQuery()
  const article = getArticles.data?.slice().reverse()?.[0]?.node
  const navigate = useNavigate()

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(var(--color-cream-98), var(--color-cream-98)), url('/background.png')`,
      }}
    >
      <div className='mx-auto flex w-full max-w-[1650px] flex-col items-center px-4 py-8 lg:w-[90%]'>
        <div className='grid w-full items-start gap-10 lg:grid-cols-[3fr_auto_1.6fr]'>
          <h1 className='text-dark-brown col-span-full mt-4 text-left text-5xl font-bold'>
            Frequently Asked Questions
          </h1>

          <div className='flex flex-col'>
            <div className='flex flex-col gap-y-6'>
              {FAQS.slice(0, 5).map((faq) => (
                <Accordian
                  key={faq.question}
                  question={faq.question}
                  answer={faq.answer}
                />
              ))}
            </div>

            <p className='text-brown mt-8 text-center text-lg'>
              Still have questions?{' '}
              <a
                className='text-dark-brown font-bold underline'
                href={ROUTES.FAQS}
              >
                Learn More
              </a>
            </p>
          </div>

          <div className='hidden h-full w-[2px] rounded-full bg-[#E9D9BD] lg:block' />

          <div className='flex flex-col'>
            {getArticles.isLoading ? (
              <ArticleSkeleton />
            ) : (
              <div className='bg-beige relative flex h-fit flex-col gap-4 rounded-xl border border-[#CCBC9E] p-4'>
                <img
                  src={article?.image?.url || ''}
                  className='object-start max-h-[220px] rounded-xl object-cover'
                />

                <h1 className='text-dark-brown text-xl font-bold'>
                  {article?.title}
                </h1>

                <p className='text-brown line-clamp-3'>{article?.excerpt}</p>

                <div className='absolute top-[-24px] left-1/2 flex w-fit -translate-x-1/2 transform items-center gap-x-2 rounded-xl border border-[#7B6D57] bg-[#443928] px-4 py-2 text-lg font-bold whitespace-nowrap text-white'>
                  <MdOutlineArticle />
                  Featured Article
                </div>
              </div>
            )}

            <a
              className='text-dark-brown mt-8 text-center text-lg font-bold underline'
              href={ROUTES.BLOG}
            >
              View More
            </a>
          </div>

          <div
            className='col-span-full flex w-full flex-col items-center rounded-xl bg-[#03443C] bg-auto bg-bottom px-4 py-14'
            style={{
              backgroundImage: `linear-gradient(180deg, rgba(255, 255, 255, 0.12) 0%, rgba(0, 0, 0, 0.12) 100%), conic-gradient(#02443CCC, #02443CCC), url('/background-feeding-guide.png')`,
            }}
          >
            <h1 className='text-center text-5xl font-bold text-white'>
              Ready To Elevate Your Pet's Diet?
            </h1>

            <div className='mt-8 flex flex-wrap items-center justify-center gap-10'>
              <button
                className='text-dark-brown flex cursor-pointer items-center gap-x-2 rounded-xl border-[2px] border-[#CCBC9E] px-4 py-2 text-xl font-bold transition-all hover:scale-x-102 hover:shadow-[0_0_10px_rgba(0,0,0,0.3)]'
                style={{
                  background:
                    'linear-gradient(180deg, #FFF3DF 0%, #E9D9BD 100%)',
                }}
                onClick={() => navigate(ROUTES.DOGS)}
              >
                <img src='/icons/dog.png' alt='Dog icon' className='h-7 w-7' />
                Meals for Dogs
              </button>

              <button
                className='text-dark-brown flex cursor-pointer items-center gap-x-2 rounded-xl border-[2px] border-[#CCBC9E] px-4 py-2 text-xl font-bold transition-all hover:scale-x-102 hover:shadow-[0_0_10px_rgba(0,0,0,0.3)]'
                style={{
                  background:
                    'linear-gradient(180deg, #FFF3DF 0%, #E9D9BD 100%)',
                }}
                onClick={() => navigate(ROUTES.CATS)}
              >
                <img src='/icons/cat.png' alt='Cat icon' className='h-7 w-7' />
                Meals for Cats
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Section7Faqs
