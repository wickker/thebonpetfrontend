import { useState } from 'react'
import { IoBag } from 'react-icons/io5'
import { Button } from '@/components/commons'
import useAddItemToCart, { AddToCartButton } from '@/hooks/useAddItemToCart'

type StandardProductTileProps = {
  productTitle: string
  unitPrice: string
  variantId: string
  imageUrl: string
}

const StandardProductTile = ({
  productTitle,
  unitPrice,
  variantId,
  imageUrl,
}: StandardProductTileProps) => {
  const [quantity, setQuantity] = useState(1)
  const productLabel: AddToCartButton = productTitle
    .toLowerCase()
    .includes('chicken')
    ? 'Chicken'
    : 'Beef'
  const { addItemToCart, addToCartButtonRef, isLoading } = useAddItemToCart()

  const handleAddToCart = () => addItemToCart(productLabel, variantId, quantity)

  return (
    <div className='flex flex-col items-center gap-y-2 text-center'>
      <button className='bg-beige group grid h-[340px] w-[340px] cursor-pointer grid-rows-[auto_1fr_auto] items-center justify-items-center gap-y-2 rounded-xl border border-[#CCBC9E] p-4 text-lg text-[#7B6D57]'>
        <p className='opacity-0 transition-opacity group-hover:opacity-100'>
          Learn about ingredients, supplements, nutrition and more
        </p>
        <div
          className='bg-dark-gray h-[160px] w-[86%] rounded-xl bg-contain bg-center bg-no-repeat transition-transform group-hover:scale-110'
          style={{
            backgroundImage: `url('${imageUrl}')`,
          }}
        />
        <p className='opacity-0 transition-opacity group-hover:opacity-100'>
          <br />
          View Product Page
        </p>
      </button>

      <p className='text-sm text-[#7B6D57]'>Free-Range</p>

      <h1 className='mb-1 text-3xl font-bold text-[#443928]'>
        {productLabel} Ragu
      </h1>

      <p className='text-lg text-[#7B6D57]'>${unitPrice} / Pack</p>

      <div className='flex items-center gap-x-4'>
        <Button.Quantity
          quantity={quantity}
          onMinus={() => setQuantity((prev) => prev - 1)}
          onAdd={() => setQuantity((prev) => prev + 1)}
        />

        <Button.Cta
          icon={<IoBag className='h-6 w-6' />}
          onClick={handleAddToCart}
          isLoading={addToCartButtonRef.current === productLabel && isLoading}
        >
          Add
        </Button.Cta>
      </div>
    </div>
  )
}

const Skeleton = () => {
  return (
    <div className='flex flex-col items-center gap-y-3.5 text-center'>
      <div className='bg-beige grid h-[340px] w-[340px] animate-pulse place-items-center gap-y-2 rounded-xl border border-[#CCBC9E] p-4'>
        <div className='h-[160px] w-[86%] animate-pulse rounded-xl bg-neutral-300' />
      </div>
      <div className='h-4 w-24 animate-pulse rounded-full bg-neutral-300' />
      <div className='mb-1 h-7 w-[40%] animate-pulse rounded-full bg-neutral-300' />
      <div className='h-6 w-26 animate-pulse rounded-full bg-neutral-300' />
      <div className='h-12 w-[80%] animate-pulse rounded-full bg-neutral-300' />
    </div>
  )
}

StandardProductTile.Skeleton = Skeleton

export default StandardProductTile
