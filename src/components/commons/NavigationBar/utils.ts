import { ROUTES } from '@/utils/constants'

export const DESKTOP_NAVIGATION_ITEMS = [
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
  // TODO:
  // {
  //   label: 'Pet Food Calculator',
  //   route: ROUTES.PET_FOOD_CALCULATOR,
  // },
  // {
  //   label: 'Donate',
  //   route: ROUTES.DONATE,
  // },
  {
    label: 'Blog',
    route: ROUTES.BLOG,
  },
  {
    label: 'Contact',
    route: ROUTES.CONTACT,
  },
  {
    label: 'FAQs',
    route: ROUTES.FAQS,
  },
] as const
