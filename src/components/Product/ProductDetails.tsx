import { useNavigate } from 'react-router-dom'
import { Product } from '@shopify/hydrogen-react/storefront-api-types'
import { BiDish } from 'react-icons/bi'
import { IoFishOutline } from 'react-icons/io5'
import { PiCarrot } from 'react-icons/pi'
import { ROUTES } from '@/utils/constants'
import { MeatType } from '@/utils/enums'
import Accordian from './Accordian'
import { PRODUCT_DETAILS } from './data'

type ProductDetailsProps = {
  animal: 'dog' | 'cat'
  product: Product
  suggestedProduct: Product
}

const ProductDetails = ({
  product,
  suggestedProduct,
  animal,
}: ProductDetailsProps) => {
  const navigate = useNavigate()
  const baseRoute = animal === 'dog' ? ROUTES.DOGS : ROUTES.CATS
  const suggestedProductPrice = `${suggestedProduct.variants.edges[0].node.price.amount || ''} ${suggestedProduct.variants.edges[0].node.price.currencyCode || ''}`
  const suggestedProductLabel = suggestedProduct.title.replace(
    'Gently Cooked Free Range ',
    ''
  )
  const meatType = product.title.includes(MeatType.BEEF)
    ? MeatType.BEEF
    : MeatType.CHICKEN
  const dataKey =
    `${animal.toUpperCase()}_${meatType.toUpperCase()}` as keyof typeof PRODUCT_DETAILS

  const accordianItems = [
    {
      title: 'Supplements',
      content: PRODUCT_DETAILS[dataKey].supplements,
      icon: IoFishOutline,
    },
    {
      title: 'Ingredients',
      content: PRODUCT_DETAILS[dataKey].ingredients,
      icon: BiDish,
    },
    {
      title: 'Nutrition',
      content: PRODUCT_DETAILS[dataKey].nutrition,
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

      <div className='grid w-full gap-8 lg:grid-cols-[3fr_1.6fr]'>
        <div className='flex flex-col'>
          <div
            dangerouslySetInnerHTML={{
              __html: PRODUCT_DETAILS[dataKey].details,
            }}
            className='text-dark-brown flex flex-col gap-4'
          />

          <div className='mt-4 h-[1px] w-full bg-[#CCBC9E]' />

          {accordianItems.map((item) => (
            <Accordian
              key={item.title}
              title={item.title}
              Icon={item.icon}
              content={item.content}
            />
          ))}
        </div>

        <div className='flex flex-col items-center'>
          <p className='text-dark-brown mb-6 text-center text-2xl font-bold'>{`Your ${animal} may also like`}</p>

          <button
            className='flex aspect-square w-10/12 cursor-pointer flex-col items-center justify-between rounded-xl border border-[#CCBC9E] bg-[#FBEED1] p-4 text-center transition-transform hover:scale-102 lg:h-[300px] lg:w-[300px]'
            onClick={() =>
              navigate(`${baseRoute}?productId=${suggestedProduct.id}`)
            }
          >
            <div>
              <p className='text-brown'>Gently Cooked • Free-Range</p>
              <p className='text-dark-brown text-2xl font-bold'>
                {suggestedProductLabel}
              </p>
            </div>
            <img
              src={suggestedProduct.featuredImage?.url || ''}
              className='max-h-7/12 object-cover'
              alt='Suggested product image'
            />
            <p className='text-dark-brown text-xl font-bold'>
              ${suggestedProductPrice}
            </p>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
