import useCart from '@/hooks/queries/useCart'
import useCustomer from '@/hooks/queries/useCustomer'

const Home = () => {
  const { useGetCartQuery } = useCart()
  const getCart = useGetCartQuery(
    'gid://shopify/Cart/Z2NwLWFzaWEtc291dGhlYXN0MTowMUpWN0hHNkI4UEZCTVJLWDNFOTlSSDg2RA?key=176615d9b06035a18315159ebed9fca7'
  )
  const { useGetCustomerQuery } = useCustomer()
  const getCustomer = useGetCustomerQuery('', {
    first: 100,
  })

  console.log('Cart : ', getCart.data)
  console.log('Customer : ', getCustomer.data)

  return (
    <div className='mx-auto max-w-[100dvw] lg:max-w-6xl'>
      <div className='flex flex-col p-4'>
        <p className='text-[400px] break-words'>Hello World</p>
      </div>
    </div>
  )
}

export default Home
