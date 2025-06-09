import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Article, ArticlesGrid } from '@/components/Blog'
import useBlog from '@/hooks/queries/useBlog'

const Blog = () => {
  const { useGetArticlesQuery } = useBlog()
  const getArticles = useGetArticlesQuery()
  const articles = getArticles.data?.slice().reverse() || []
  const [searchParams] = useSearchParams()
  const articleId = searchParams.get('articleId')

  const renderBlog = () => {
    if (articleId) {
      return (
        <Article
          articleId={articleId}
          articles={articles}
          isLoading={getArticles.isLoading}
        />
      )
    }

    return (
      <ArticlesGrid articles={articles} isLoading={getArticles.isLoading} />
    )
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [articleId])

  return (
    <div className='mx-auto flex max-w-[100dvw] flex-col items-center lg:max-w-6xl'>
      <div className='flex w-[100dvw] flex-col px-4 sm:w-full md:w-3/4 lg:w-2/3'>
        {renderBlog()}
      </div>
    </div>
  )
}

export default Blog
