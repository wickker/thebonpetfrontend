export const Tab = {
  DOGS: 'dogs',
  CATS: 'cats',
}

export type Tab = (typeof Tab)[keyof typeof Tab]

export const MeatType = {
  BEEF: 'Beef',
  CHICKEN: 'Chicken',
}

export type MeatType = (typeof MeatType)[keyof typeof MeatType]

export const TABS = [
  {
    label: 'Dogs',
    tab: Tab.DOGS,
    icon: '/icons/dog.png',
  },
  {
    label: 'Cats',
    tab: Tab.CATS,
    icon: '/icons/cat.png',
  },
] as const

export const AddToCartButton = {
  TRIAL_PACK: 'Trial Pack',
  CHICKEN: 'Chicken',
  BEEF: 'Beef',
} as const

export type AddToCartButton =
  (typeof AddToCartButton)[keyof typeof AddToCartButton]
