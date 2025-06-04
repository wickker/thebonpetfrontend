import { useState } from 'react'
import {
  CartCreatePayload,
  CartLinesAddPayload,
} from '@shopify/hydrogen-react/storefront-api-types'
import { useQueryClient } from '@tanstack/react-query'
import { DateTime } from 'luxon'
import { useToastContext } from '@/contexts/useToastContext/context'
import useCart from '@/hooks/queries/useCart'
import useProduct from '@/hooks/queries/useProduct'
import { useCartActions } from '@/store/useCartStore'
import { LOCAL_STORAGE_KEYS } from '@/utils/constants'
import { getCartJsonFromLocalStorage } from '@/utils/functions'
import CalculatorTile from './CalculatorTile'
import Tabs from './Tabs'
import TrialPack from './TrialPack'
import { Tab } from './utils'

const Section5Meals = () => {
  const [selectedTab, setSelectedTab] = useState<Tab>(Tab.DOGS)
  const queryClient = useQueryClient()
  const { toast } = useToastContext()
  const { openCart } = useCartActions()
  const { useGetProductsQuery } = useProduct()
  const getProducts = useGetProductsQuery({
    first: 100,
  })
  const cart = getCartJsonFromLocalStorage()
  const { useGetCartQuery, useAddItemToCartMutation, useCreateCartMutation } =
    useCart()
  const getCart = useGetCartQuery(cart?.cartId)
  const addToCart = useAddItemToCartMutation(handleAddToCartSuccess)
  const createCart = useCreateCartMutation(handleCreateCartSuccess)

  // derived state
  const cartExistsWithItems =
    getCart.isSuccess &&
    getCart.data &&
    getCart.data.lines.edges.length > 0 &&
    DateTime.now() < DateTime.fromISO(cart?.expiresAt || '')
  const products = getProducts.data?.nodes || []
  const trialPackProducts = products.filter(
    (product) =>
      product.title.includes('Trial') &&
      product.title.toLowerCase().includes(selectedTab)
  )

  function handleAddToCartSuccess(data: CartLinesAddPayload) {
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
    openCart()
  }

  function handleCreateCartSuccess(data: CartCreatePayload) {
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
      openCart()
    }
  }

  const addItemToCart = (
    variantId: string,
    quantity: number,
    sellingPlanId?: string
  ) => {
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

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(var(--color-cream-98), var(--color-cream-98)), url('/background.png')`,
      }}
    >
      <div className='mx-auto flex w-full flex-col items-center px-4 py-8 lg:w-[90%]'>
        <p className='text-lg font-bold tracking-wider text-[#443928] uppercase'>
          Our Meals Are
        </p>

        <h1 className='mt-4 mb-8 text-center text-5xl font-bold text-[#443928]'>
          A Different Breed
        </h1>

        <div className='mb-6 grid w-full grid-cols-[1fr_1fr] items-center text-[#443928] lg:w-[30%] lg:max-w-[380px]'>
          <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        </div>

        <div className='grid gap-6 lg:grid-cols-[5fr_1fr]'>
          {getProducts.isFetching ? (
            <TrialPack.Skeleton />
          ) : (
            <TrialPack
              products={trialPackProducts}
              packWeight={selectedTab === Tab.DOGS ? '300g' : '200g'}
              onAddToCart={addItemToCart}
            />
          )}

          <CalculatorTile />
        </div>

        {/* TODO: */}
      </div>
    </div>
  )
}

export default Section5Meals
