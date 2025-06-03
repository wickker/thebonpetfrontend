import useProduct from '@/hooks/queries/useProduct'

const Section5Meals = () => {
  const { useGetProductsQuery } = useProduct()
  const { data: products } = useGetProductsQuery({
    first: 100,
  })
  console.log('products : ', products)

  return <div></div>
}

export default Section5Meals
