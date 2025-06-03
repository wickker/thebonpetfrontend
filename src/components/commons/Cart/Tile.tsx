import { MouseEvent, useRef } from 'react'
import {
  CartLine,
  CartLinesUpdatePayload,
  ComponentizableCartLine,
} from '@shopify/hydrogen-react/storefront-api-types'
import { useQueryClient } from '@tanstack/react-query'
import { IoTrashOutline } from 'react-icons/io5'
import { RiLoader4Fill } from 'react-icons/ri'
import { Button } from '@/components/commons'
import { useToastContext } from '@/contexts/useToastContext/context'
import useCart from '@/hooks/queries/useCart'
import { QUERY_KEYS } from '@/utils/queryKeys'
import { getUnitPrice, fixVariantName } from './utils'

type TileProps = {
  line: CartLine | ComponentizableCartLine
  cartId: string
}

const Tile = ({ line, cartId }: TileProps) => {
  const queryClient = useQueryClient()
  const { toast } = useToastContext()
  const { useUpdateCartQuantityMutation } = useCart()
  const updateCartQuantity = useUpdateCartQuantityMutation(
    handleUpdateCartQuantitySuccess
  )
  const buttonClickedRef = useRef<'add' | 'minus' | 'delete' | ''>('')
  const { unitPrice, originalUnitPrice } = getUnitPrice(line)
  const variantName = fixVariantName(line.merchandise.title)
  const subscriptionName = line.sellingPlanAllocation
    ? ` | ${line.sellingPlanAllocation.sellingPlan.name}`
    : ''
  const isDeletePending =
    buttonClickedRef.current === 'delete' && updateCartQuantity.isPending

  function handleUpdateCartQuantitySuccess(data: CartLinesUpdatePayload) {
    buttonClickedRef.current = ''
    if (data.userErrors.length > 0) {
      toast.error({ message: data.userErrors[0].message })
      return
    }
    queryClient.invalidateQueries({
      queryKey: QUERY_KEYS.GET_CART(cartId),
    })
  }

  const handleDelete = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    buttonClickedRef.current = 'delete'
    updateCartQuantity.mutate({
      cartId,
      lines: [{ id: line.id, quantity: 0 }],
    })
  }

  const handleClickAdd = () => {
    buttonClickedRef.current = 'add'
    const newQuantity = line.quantity + 1
    updateCartQuantity.mutate({
      cartId,
      lines: [{ id: line.id, quantity: newQuantity }],
    })
  }

  const handleClickMinus = () => {
    buttonClickedRef.current = 'minus'
    const newQuantity = line.quantity - 1
    updateCartQuantity.mutate({
      cartId,
      lines: [{ id: line.id, quantity: newQuantity }],
    })
  }

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
              {subscriptionName}
            </p>
          </div>
          <button
            className='hover:text-green text-dark-green cursor-pointer transition-colors disabled:cursor-not-allowed'
            onClick={handleDelete}
            disabled={isDeletePending}
          >
            {isDeletePending ? (
              <RiLoader4Fill className='h-5 w-5 animate-spin' />
            ) : (
              <IoTrashOutline className='h-5 w-5' />
            )}
          </button>
        </div>

        <div className='flex items-center justify-between'>
          <p className='text-dark-green text-sm'>
            <span className='text-neutral-400 line-through'>
              {originalUnitPrice ? `$${originalUnitPrice}` : ''}
            </span>{' '}
            ${unitPrice}
          </p>
          <Button.CartQuantity
            quantity={line.quantity}
            onAdd={handleClickAdd}
            onMinus={handleClickMinus}
            isAddLoading={
              updateCartQuantity.isPending && buttonClickedRef.current === 'add'
            }
            isMinusLoading={
              updateCartQuantity.isPending &&
              buttonClickedRef.current === 'minus'
            }
          />
        </div>
      </div>
    </div>
  )
}

export default Tile
