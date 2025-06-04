import { useState } from 'react'
import { Product } from '@shopify/hydrogen-react/storefront-api-types'
import { IoBag } from 'react-icons/io5'
import { Button } from '@/components/commons'
import { AddToCartButton, MeatType } from './utils'

type TrialPackProps = {
  products: Array<Product>
  packWeight: string
  onAddToCart: (
    buttonRef: AddToCartButton,
    variantId: string,
    quantity: number,
    sellingPlanId?: string
  ) => void
  isLoading?: boolean
}

const TrialPack = ({
  products,
  packWeight,
  onAddToCart,
  isLoading = false,
}: TrialPackProps) => {
  const [selectedMeat, setSelectedMeat] = useState<MeatType>(MeatType.BEEF)
  const [quantity, setQuantity] = useState(1)
  const product = products.find((product) =>
    product.title.includes(selectedMeat)
  )
  const imageUrl = product?.featuredImage?.url || ''
  const price = `${product?.variants.edges[0].node.price.amount || ''} ${product?.variants.edges[0].node.price.currencyCode || ''}`

  const handleSelectMeat = (meat: MeatType) => setSelectedMeat(meat)

  const handleAddToCart = () => {
    if (!product) return
    onAddToCart(
      AddToCartButton.TRIAL_PACK,
      product.variants.edges[0].node.id,
      quantity
    )
  }

  return (
    <div className='bg-beige grid grid-cols-[1fr] items-center gap-6 rounded-xl border-[2px] border-[#E9D9BD] p-6 text-[#443928] lg:grid-cols-[auto_1fr]'>
      <div
        className='bg-dark-gray h-[340px] w-[340px] rounded-xl bg-contain bg-center bg-no-repeat'
        style={{
          backgroundImage: `url('${imageUrl}')`,
        }}
      />

      <div className='flex flex-col'>
        <p className='text-lg text-[#7B6D57]'>Gently Cooked • Free-Range</p>

        <h1 className='mb-2 text-[42px] font-bold'>Trial Pack</h1>

        <div className='mb-2 flex items-center gap-x-8 text-lg font-bold'>
          {Object.values(MeatType).map((meat) => (
            <label className='flex items-center gap-x-2' key={meat}>
              <input
                type='radio'
                value={meat}
                checked={selectedMeat === meat}
                onChange={() => handleSelectMeat(meat)}
                className='accent-green h-4 w-4'
              />
              {meat}
            </label>
          ))}
        </div>

        <p className='mb-4 text-[#7B6D57]'>
          Curious about our meals but not ready to commit to a big batch? Or,
          just looking to transition to a new protein? Our Trial Pack is perfect
          for you! Featuring three {packWeight} portions, these conveniently
          sized packs make it easy to slowly transition your pet by mixing a
          little into their current food.
        </p>

        <div className='mb-5 flex flex-wrap items-center gap-4'>
          <Button.Quantity
            quantity={quantity}
            onMinus={() => setQuantity((prev) => prev - 1)}
            onAdd={() => setQuantity((prev) => prev + 1)}
          />

          <p className='flex items-center text-xl font-bold'>
            {price}
            <span className='mx-2 text-sm font-normal text-[#7B6D57]'>/</span>
            <span className='text-sm font-normal text-[#7B6D57]'>
              3 x {packWeight} packs
            </span>
          </p>
        </div>

        <Button.Cta
          icon={<IoBag className='h-6 w-6' />}
          onClick={handleAddToCart}
          isLoading={isLoading}
        >
          Add to Cart
        </Button.Cta>
      </div>
    </div>
  )
}

const Skeleton = () => {
  return (
    <div className='bg-beige grid grid-cols-[1fr] items-center gap-6 rounded-xl border-[2px] border-[#E9D9BD] p-6 text-[#443928] lg:grid-cols-[auto_1fr]'>
      <div className='h-[340px] w-[340px] animate-pulse rounded-xl bg-neutral-300' />

      <div className='flex flex-col'>
        <div className='mb-4 h-[20px] w-[36%] animate-pulse rounded-full bg-neutral-300' />
        <div className='mb-4 h-[42px] w-[30%] animate-pulse rounded-full bg-neutral-300' />
        <div className='mb-4 h-[20px] w-[30%] animate-pulse rounded-full bg-neutral-300' />
        <div className='mb-4 h-[16px] w-full animate-pulse rounded-full bg-neutral-300' />
        <div className='mb-4 h-[16px] w-full animate-pulse rounded-full bg-neutral-300' />
        <div className='mb-4 h-[16px] w-[70%] animate-pulse rounded-full bg-neutral-300' />
        <div className='mb-4 h-[36px] w-[50%] animate-pulse rounded-full bg-neutral-300' />
        <div className='h-[40px] w-[30%] animate-pulse rounded-full bg-neutral-300' />
      </div>
    </div>
  )
}

TrialPack.Skeleton = Skeleton

export default TrialPack
