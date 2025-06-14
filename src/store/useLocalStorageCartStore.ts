import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartStorage } from '@/@types/carts'
import { LOCAL_STORAGE_KEYS } from '@/utils/constants'
import { jsonSafeParse } from '@/utils/functions'

type LocalStorageCartStore = {
  cart?: string
  setCart: (cart: string) => void
}

const useLocalStorageCartStore = create(
  persist<LocalStorageCartStore>(
    (set) => ({
      cart: localStorage.getItem(LOCAL_STORAGE_KEYS.CART) || undefined,
      setCart: (cart: string) => set({ cart }),
    }),
    {
      name: LOCAL_STORAGE_KEYS.CART,
    }
  )
)

// Default hooks
const useLocalStorageCart = () =>
  useLocalStorageCartStore((state) => state.cart)
export const useSetLocalStorageCart = () =>
  useLocalStorageCartStore((state) => state.setCart)

// Derived hooks
export const useLocalStorageCartJson = () => {
  const cartStr = useLocalStorageCart()
  return cartStr ? jsonSafeParse<CartStorage>(cartStr) : undefined
}

export default useLocalStorageCartStore
