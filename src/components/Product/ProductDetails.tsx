import { Product } from '@shopify/hydrogen-react/storefront-api-types'
import { BiDish } from 'react-icons/bi'
import { FaChevronDown } from 'react-icons/fa6'
import { IoFishOutline } from 'react-icons/io5'
import { PiCarrot } from 'react-icons/pi'

type ProductDetailsProps = {
  product: Product
  suggestedProduct: Product
}

const ProductDetails = ({ product, suggestedProduct }: ProductDetailsProps) => {
  const splits = product.descriptionHtml.split('<h2')
  const details = splits?.[0] || ''
  const splits2 = product.descriptionHtml.split('/h2>')
  const splits3 = splits2?.[1].split('<div')
  const ingredients = splits3?.[0] || ''

  console.log(suggestedProduct)

  const accordianItems = [
    {
      title: 'Supplements',
      content: '',
      icon: IoFishOutline,
    },
    {
      title: 'Ingredients',
      content: ingredients,
      icon: BiDish,
    },
    {
      title: 'Nutrition',
      content: '',
      icon: PiCarrot,
    },
  ]

  return (
    <div className='flex w-full flex-col'>
      <div className='my-8 flex items-center gap-2'>
        <p className='text-dark-brown text-2xl font-bold whitespace-nowrap'>
          Our craft is in the details
        </p>
        <div className='hidden h-[2px] w-full rounded-full bg-[#CCBC9E] lg:block' />
      </div>

      <div className='grid w-full gap-6 lg:grid-cols-[3fr_1.6fr]'>
        <div className='flex flex-col'>
          <div
            dangerouslySetInnerHTML={{ __html: details }}
            className='text-dark-brown flex flex-col gap-4'
          />

          <div className='mt-4 h-[1px] w-full bg-[#CCBC9E]' />

          {accordianItems.map((item) => (
            <>
              <div
                key={item.title}
                className='text-dark-brown grid grid-cols-[auto_1fr_auto] items-center gap-x-2 py-4'
              >
                <item.icon className='h-6 w-6' />
                <h3 className='text-dark-brown text-xl font-bold'>
                  {item.title}
                </h3>
                <button>
                  <FaChevronDown className='h-4 w-4' />
                </button>
              </div>

              <div className='h-[1px] w-full bg-[#CCBC9E]' />
            </>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
