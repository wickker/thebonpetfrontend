import { create } from 'zustand'

type CartStore = {
  isCartOpen: boolean

  actions: {
    closeCart: () => void
    openCart: () => void
  }
}

const useCartStore = create<CartStore>((set) => ({
  isCartOpen: false,

  actions: {
    closeCart: () => set({ isCartOpen: false }),
    openCart: () => set({ isCartOpen: true }),
  },
}))

// Default hooks
export const useIsCartOpen = () => useCartStore((state) => state.isCartOpen)
export const useCartActions = () => useCartStore((state) => state.actions)

export default useCartStore
