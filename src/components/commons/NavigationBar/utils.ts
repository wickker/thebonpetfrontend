import { ROUTES } from '@/utils/constants'

export const desktopNavigationItems = [
  {
    label: 'Dogs',
    route: ROUTES.DOGS,
  },
  {
    label: 'Cats',
    route: ROUTES.CATS,
  },
  {
    label: 'Feeding Guide',
    route: ROUTES.FEEDING_GUIDE,
  },
  {
    label: 'Pet Food Calculator',
    route: ROUTES.PET_FOOD_CALCULATOR,
  },
  {
    label: 'Donate',
    route: ROUTES.DONATE,
  },
  {
    label: 'Blog',
    route: ROUTES.BLOG,
  },
  {
    label: 'Contact',
    route: ROUTES.CONTACT,
  },
] as const
