import { Navigate } from 'react-router-dom'
import { ArticleEdge } from '@shopify/hydrogen-react/storefront-api-types'
import { ROUTES } from '@/utils/constants'

type ArticleProps = {
  articleId: string
  articles: ArticleEdge[]
  isLoading: boolean
}

const Article = ({ articleId, articles, isLoading }: ArticleProps) => {
  const article = articles.find((article) => article.node.id === articleId)

  if (!article) {
    return <Navigate to={ROUTES.BLOG} replace />
  }

  if (isLoading) {
    return (
      <div className='mb-8 flex flex-col gap-4'>
        <div className='my-8 h-[40px] w-full animate-pulse rounded-full bg-neutral-300' />
        <div className='mb-8 h-[400px] w-full animate-pulse rounded-xl bg-neutral-300' />
        <div className='h-[24px] w-full animate-pulse rounded-full bg-neutral-300' />
        <div className='h-[24px] w-full animate-pulse rounded-full bg-neutral-300' />
        <div className='h-[24px] w-full animate-pulse rounded-full bg-neutral-300' />
        <div className='h-[24px] w-[70%] animate-pulse rounded-full bg-neutral-300' />
      </div>
    )
  }

  return (
    <>
      <h1 className='text-dark-green py-8 text-center text-4xl font-bold'>
        {article.node.title}
      </h1>
      <img
        src={article.node.image?.url}
        alt='Article image'
        className='mb-8 max-h-[400px] w-full rounded-xl object-cover'
      />
      <div
        dangerouslySetInnerHTML={{ __html: article.node.contentHtml }}
        className='text-dark-gray mb-8 flex flex-col gap-4'
      />
      <a
        href={ROUTES.BLOG}
        className='text-dark-green mb-8 flex items-center gap-2 self-center text-lg underline'
      >
        Back to Blog
      </a>
    </>
  )
}

export default Article
