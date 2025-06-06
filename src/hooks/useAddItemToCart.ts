import { useRef } from 'react'
import {
  CartCreatePayload,
  CartLinesAddPayload,
} from '@shopify/hydrogen-react/storefront-api-types'
import { useQueryClient } from '@tanstack/react-query'
import { DateTime } from 'luxon'
import { useToastContext } from '@/contexts/useToastContext/context'
import useCart from '@/hooks/queries/useCart'
import { useCartActions } from '@/store/useCartStore'
import { LOCAL_STORAGE_KEYS } from '@/utils/constants'
import { getCartJsonFromLocalStorage } from '@/utils/functions'

export const AddToCartButton = {
  TRIAL_PACK: 'Trial Pack',
  CHICKEN: 'Chicken',
  BEEF: 'Beef',
  DONATION: 'Donation',
  DONATION_SUBSCRIPTION: 'Donation Subscription',
} as const

export type AddToCartButton =
  (typeof AddToCartButton)[keyof typeof AddToCartButton]

const useAddItemToCart = (successCb?: () => void) => {
  const queryClient = useQueryClient()
  const { toast } = useToastContext()
  const { openCart } = useCartActions()
  const cart = getCartJsonFromLocalStorage()
  const { useGetCartQuery, useAddItemToCartMutation, useCreateCartMutation } =
    useCart()
  const getCart = useGetCartQuery(cart?.cartId)
  const addToCart = useAddItemToCartMutation(handleAddToCartSuccess)
  const createCart = useCreateCartMutation(handleCreateCartSuccess)
  const addToCartButtonRef = useRef<AddToCartButton | ''>('')
  const cartExistsWithItems =
    getCart.isSuccess &&
    getCart.data &&
    getCart.data.lines.edges.length > 0 &&
    DateTime.now() < DateTime.fromISO(cart?.expiresAt || '')

  function handleAddToCartSuccess(data: CartLinesAddPayload) {
    addToCartButtonRef.current = ''

    if (data.userErrors.length > 0) {
      toast.error({
        title: 'Failed to add item to cart',
        message: data.userErrors[0].message,
      })
      return
    }

    queryClient.invalidateQueries({
      queryKey: ['cart'],
    })
    successCb?.()
    openCart()
  }

  function handleCreateCartSuccess(data: CartCreatePayload) {
    addToCartButtonRef.current = ''

    if (data.userErrors.length > 0) {
      toast.error({
        title: 'Failed to create cart',
        message: data.userErrors[0].message,
      })
      return
    }

    if (data.cart?.id) {
      const expiresAt = DateTime.now().plus({ days: 10 }).toISO()
      localStorage.setItem(
        LOCAL_STORAGE_KEYS.CART,
        JSON.stringify({
          cartId: data.cart.id,
          expiresAt,
        })
      )
      successCb?.()
      openCart()
    }
  }

  const addItemToCart = (
    buttonRef: AddToCartButton,
    variantId: string,
    quantity: number,
    sellingPlanId?: string
  ) => {
    if (buttonRef) {
      addToCartButtonRef.current = buttonRef
    }

    if (cartExistsWithItems) {
      addToCart.mutate({
        cartId: cart?.cartId || '',
        lines: [{ merchandiseId: variantId, quantity, sellingPlanId }],
      })
      return
    }

    createCart.mutate({
      lines: [{ merchandiseId: variantId, quantity, sellingPlanId }],
    })
  }

  return {
    addItemToCart,
    addToCartButtonRef,
    isLoading: addToCart.isPending || createCart.isPending,
  }
}

export default useAddItemToCart
