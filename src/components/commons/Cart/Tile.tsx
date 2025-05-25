import {
  CartLine,
  ComponentizableCartLine,
} from '@shopify/hydrogen-react/storefront-api-types'
import { IoTrashOutline } from 'react-icons/io5'
import { Button } from '@/components/commons'
import { getUnitPrice } from './utils'
type TileProps = {
  line: CartLine | ComponentizableCartLine
}

const Tile = ({ line }: TileProps) => {
  const { unitPrice, originalUnitPrice } = getUnitPrice(line)
  console.log(unitPrice, originalUnitPrice)
  const variantName = line.merchandise.title.includes('g')
    ? line.merchandise.title
    : `${line.merchandise.title}g`
  const subscription = line.sellingPlanAllocation
    ? ` | ${line.sellingPlanAllocation.sellingPlan.name}`
    : ''

  return (
    <div className='grid grid-cols-[auto_1fr] gap-x-3'>
      <div
        className='bg-dark-gray h-18 w-18 rounded bg-contain bg-center bg-no-repeat'
        style={{
          backgroundImage: `url('${line.merchandise.image?.url || ''}')`,
        }}
      />

      <div className='flex flex-col gap-y-1'>
        <div className='text-dark-green flex items-start justify-between gap-x-2 font-bold'>
          <h1>{line.merchandise.product.title}</h1>
          <h1 className='text-dark-gray text-xl'>
            ${line.cost.totalAmount.amount}
          </h1>
        </div>

        <div className='flex items-center justify-between gap-x-2'>
          <div className='text-dark-green flex flex-col text-sm'>
            <p>
              {variantName}
              {subscription}
            </p>
          </div>
          <button className='cursor-pointer'>
            <IoTrashOutline className='text-dark-green h-5 w-5' />
          </button>
        </div>

        <div className='flex items-center justify-between'>
          <p className='text-dark-green text-sm'>
            <span className='text-neutral-400 line-through'>
              {originalUnitPrice ? `$${originalUnitPrice}` : ''}
            </span>{' '}
            ${unitPrice}
          </p>
          <Button.Quantity
            quantity={line.quantity}
            onAdd={() => {}}
            onRemove={() => {}}
            isAddLoading={false}
            isRemoveLoading={false}
          />
        </div>
      </div>
    </div>
  )
}

export default Tile
