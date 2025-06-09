import { useQuery } from '@tanstack/react-query'
import shopifyStorefrontApi from '@/services/api/shopifyStorefrontApi'
import { QUERY_KEYS } from '@/utils/queryKeys'

const useBlog = () => {
  const useGetArticlesQuery = () =>
    useQuery({
      queryKey: QUERY_KEYS.GET_ARTICLES,
      queryFn: shopifyStorefrontApi.getArticles,
      retry: false,
    })

  return {
    useGetArticlesQuery,
  }
}

export default useBlog
