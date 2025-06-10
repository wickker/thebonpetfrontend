import { useState } from 'react'
import { Product } from '@shopify/hydrogen-react/storefront-api-types'
import { AnimatePresence, motion } from 'motion/react'
import { IoBag } from 'react-icons/io5'
import { Button } from '@/components/commons'
import useAddItemToCart from '@/hooks/useAddItemToCart'
import { MeatType } from '@/utils/enums'

const RadioOption = {
  ONE_TIME: 'one-time',
  SUBSCRIBE: 'subscribe',
} as const

type RadioOption = (typeof RadioOption)[keyof typeof RadioOption]

type ProductPageProps = {
  animal: 'dog' | 'cat'
  product: Product
}

const ProductPage = ({ animal, product }: ProductPageProps) => {
  const [quantity, setQuantity] = useState(1)
  const [weeks, setWeeks] = useState(1)
  const [selectedRadio, setSelectedRadio] = useState<RadioOption>(
    RadioOption.ONE_TIME
  )
  const { addItemToCart, isLoading } = useAddItemToCart()

  // derived state
  const meatType = product.title.includes(MeatType.CHICKEN)
    ? MeatType.CHICKEN
    : MeatType.BEEF
  const price = `${product.variants.edges[0].node.price.amount || ''} ${product.variants.edges[0].node.price.currencyCode || ''}`
  const packWeight = animal === 'dog' ? '300g' : '200g'

  const handleAddToCart = () => {
    const variantId = product.variants.edges[0].node.id
    const sellingPlanId =
      selectedRadio === RadioOption.SUBSCRIBE
        ? product.variants.edges[0].node.sellingPlanAllocations.nodes[weeks - 1]
            .sellingPlan.id
        : undefined
    addItemToCart('', variantId, quantity, sellingPlanId)
  }

  return (
    <div className='grid w-full grid-cols-[3fr_1.6fr] gap-6'>
      <div className='flex flex-col gap-y-4'>
        <div className='flex items-center gap-x-2'>
          <img src={`/icons/${animal}.png`} alt={animal} className='h-8 w-8' />
          <p className='text-brown text-lg'>Gently Cooked • Free-Range</p>
        </div>

        <h1 className='text-dark-brown mb-4 text-5xl font-bold'>
          {meatType} Ragu
        </h1>

        <p className='text-dark-brown mb-4 flex flex-col gap-4'>
          Our Signature Ragu collection offers gently cooked gourmet meals
          crafted with ethically sourced proteins like free-range chicken and
          pasture-raised beef. Cooked sous vide to retain moisture, nutrients
          and flavour, each recipe is formulated by PhD nutrionists to meet
          AAFCO standards. Treat your {animal} to a meal that's as nourishing as
          it is delicious.
        </p>

        <div className='text-dark-brown flex items-start gap-x-8 text-lg font-bold'>
          <label className='flex items-center gap-x-2'>
            <input
              type='radio'
              value='one-time'
              checked={selectedRadio === 'one-time'}
              onChange={() => setSelectedRadio('one-time')}
              className='accent-green h-4 w-4'
            />
            One-Time Purchase
          </label>
          <label className='grid grid-cols-[auto_1fr] items-center gap-x-2'>
            <input
              type='radio'
              value='subscribe'
              checked={selectedRadio === 'subscribe'}
              onChange={() => setSelectedRadio('subscribe')}
              className='accent-green h-4 w-4'
            />
            <div className='flex items-center gap-x-2'>
              Subscribe & Save
              <div className='rounded bg-[#E12B65] px-2 py-0.5 text-[10px] text-white uppercase'>
                Saves 10%
              </div>
            </div>
            <p className='text-brown col-start-2 text-xs font-normal'>
              Cancel or Skip any time!
            </p>
          </label>
        </div>

        <div className='flex flex-wrap items-center gap-4'>
          <Button.Quantity
            quantity={quantity}
            onMinus={() => setQuantity((prev) => prev - 1)}
            onAdd={() => setQuantity((prev) => prev + 1)}
          />

          <p className='flex items-center text-xl font-bold'>
            {price}
            <span className='text-brown mx-2 text-sm font-normal'>/</span>
            <span className='text-brown text-sm font-normal'>
              3 x {packWeight} packs
            </span>
          </p>
        </div>

        <AnimatePresence>
          {selectedRadio === RadioOption.SUBSCRIBE && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Button.Weeks
                weeks={weeks}
                onMinus={() => setWeeks((prev) => prev - 1)}
                onAdd={() => setWeeks((prev) => prev + 1)}
                maxWeeks={
                  product.variants.edges[0].node.sellingPlanAllocations.nodes
                    .length || 0
                }
              />
            </motion.div>
          )}
        </AnimatePresence>

        <Button.Cta
          icon={<IoBag className='h-6 w-6' />}
          className='mt-4'
          onClick={handleAddToCart}
          isLoading={isLoading}
        >
          Add to Cart
        </Button.Cta>
      </div>
    </div>
  )
}

export default ProductPage
