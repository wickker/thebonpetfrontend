import useCustomer from '@/hooks/queries/useCustomer'

const Home = () => {
  const { useGetCustomerQuery } = useCustomer()
  const getCustomer = useGetCustomerQuery('', {
    first: 100,
  })

  console.log('Customer : ', getCustomer.data)

  return <div className='mx-auto max-w-[100dvw] lg:max-w-6xl'></div>
}

export default Home
