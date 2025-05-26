import { ROUTES } from '@/utils/constants'

export const footerItems = {
  Company: [
    {
      label: 'About',
      link: ROUTES.HOME, // TODO: Change this
    },
    {
      label: 'FAQs',
      link: `${ROUTES.HOME}#faqs`,
    },
    {
      label: 'Blog',
      link: ROUTES.BLOG,
    },
    {
      label: 'Contact',
      link: ROUTES.CONTACT,
    },
  ],
  Explore: [
    {
      label: 'Pickup & Shipping Policy',
      link: ROUTES.HOME,
    },
    {
      label: 'Refund Policy',
      link: ROUTES.REFUND_POLICY,
    },
    {
      label: 'Terms of Service',
      link: ROUTES.TERMS_OF_SERVICE,
    },
    {
      label: 'Privacy Policy',
      link: ROUTES.PRIVACY_POLICY,
    },
  ],
  'Work With Us': [
    {
      label: 'Creators',
      link: ROUTES.CONTACT,
    },
    {
      label: 'Professionals',
      link: ROUTES.CONTACT,
    },
    {
      label: 'Vets',
      link: ROUTES.CONTACT,
    },
  ],
} as const
