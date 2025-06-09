import { Link } from 'react-router-dom'
import { ArticleEdge } from '@shopify/hydrogen-react/storefront-api-types'
import { ROUTES } from '@/utils/constants'

type ArticlesGridProps = {
  articles: ArticleEdge[]
  isLoading: boolean
}

const ArticlesGrid = ({ articles, isLoading }: ArticlesGridProps) => {
  return (
    <>
      <h1 className='text-dark-green py-8 text-center text-4xl font-bold'>
        Our Blog
      </h1>

      {isLoading ? (
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className='bg-beige relative flex h-fit flex-col gap-4 rounded-xl border border-[#CCBC9E] p-4'
            >
              <div className='aspect-video max-h-[220px] w-full animate-pulse rounded-xl bg-neutral-300' />
              <div className='h-[32px] w-[70%] animate-pulse rounded-full bg-neutral-300' />
              <div className='flex flex-col gap-2'>
                <div className='h-[16px] w-full animate-pulse rounded-full bg-neutral-300' />
                <div className='h-[16px] w-full animate-pulse rounded-full bg-neutral-300' />
                <div className='h-[16px] w-[80%] animate-pulse rounded-full bg-neutral-300' />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className='grid grid-cols-1 gap-6 pb-12 md:grid-cols-2'>
          {articles?.map((article) => (
            <Link
              key={article.node.id}
              to={`${ROUTES.BLOG}?articleId=${article.node.id}`}
              className='bg-beige flex h-fit flex-col gap-4 rounded-xl border border-[#CCBC9E] p-4 transition-transform hover:scale-[1.02]'
            >
              <img
                src={article.node.image?.url || ''}
                alt={article.node.title}
                className='max-h-[220px] w-full rounded-xl object-cover'
              />
              <h2 className='text-dark-brown text-xl font-bold'>
                {article.node.title}
              </h2>
              <p className='text-brown line-clamp-3'>{article.node.excerpt}</p>
            </Link>
          ))}
        </div>
      )}
    </>
  )
}

export default ArticlesGrid
