export const MeatType = {
  BEEF: 'Beef',
  CHICKEN: 'Chicken',
}

export type MeatType = (typeof MeatType)[keyof typeof MeatType]
