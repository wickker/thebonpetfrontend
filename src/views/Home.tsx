import useCart from '@/hooks/queries/useCart'
import useCustomer from '@/hooks/queries/useCustomer'

const Home = () => {
  const { useGetCartQuery } = useCart()
  const getCart = useGetCartQuery(
    'gid://shopify/Cart/Z2NwLWFzaWEtc291dGhlYXN0MTowMUpWN0hHNkI4UEZCTVJLWDNFOTlSSDg2RA?key=176615d9b06035a18315159ebed9fca7'
  )
  const { useGetCustomerQuery } = useCustomer()
  const getCustomer = useGetCustomerQuery('c3ab4db65a6e17423310fbc1aee5b1b9', {
    first: 100,
  })

  console.log('cart : ', getCart.data)
  console.log('customer : ', getCustomer.data)

  const { useCustomerResetByUrlMutation } = useCustomer()
  const resetPasswordByUrl = useCustomerResetByUrlMutation((data) => {
    console.log('res : ', data)
  })

  return (
    <div className='mx-auto max-w-[100dvw] lg:max-w-6xl'>
      <div className='flex flex-col p-4'>
        <button
          onClick={() =>
            resetPasswordByUrl.mutate({
              password: '123456',
              resetUrl:
                'https://thebonpet.com/account/reset/7456705740857/84684078e1fe7fa507abb28bc8d7ba26-1747716173?syclid=0124f337-9433-4754-a652-1f368e9f9008',
            })
          }
        >
          Reset password
        </button>
        <p className='text-[400px] break-words'>Hello World</p>
      </div>
    </div>
  )
}

export default Home
