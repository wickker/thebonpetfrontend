import {
  Attribute,
  AttributeInput,
  Cart,
  CartLine,
  ComponentizableCartLine,
} from '@shopify/hydrogen-react/storefront-api-types'
import { DateTime } from 'luxon'
import { DATE_SELECT_FORMAT } from '@/components/commons/DateSelect/dateSelect'

export const getUnitPrice = (line: CartLine | ComponentizableCartLine) => {
  if (
    line.sellingPlanAllocation &&
    line.sellingPlanAllocation.priceAdjustments.length > 0
  ) {
    return {
      unitPrice: line.sellingPlanAllocation.priceAdjustments[0].price.amount,
      originalUnitPrice:
        line.sellingPlanAllocation.priceAdjustments[0].compareAtPrice.amount,
      currency:
        line.sellingPlanAllocation.priceAdjustments[0].price.currencyCode,
    }
  }
  if (line.merchandise.compareAtPrice) {
    return {
      unitPrice: line.merchandise.price.amount,
      originalUnitPrice: line.merchandise.compareAtPrice.amount,
      currency: line.merchandise.compareAtPrice.currencyCode,
    }
  }
  return {
    unitPrice: line.merchandise.price.amount,
    originalUnitPrice: '',
    currency: line.merchandise.price.currencyCode,
  }
}

export const hasSubscription = (cart?: Cart) => {
  if (!cart) return false
  return cart.lines.edges.some((line) => line.node.sellingPlanAllocation)
}

export const getDeliveryDate = (attributes: Array<Attribute> = []) => {
  for (const attribute of attributes) {
    if (attribute.key === 'TBP Delivery Date') {
      return DateTime.fromJSDate(new Date(attribute.value as string)).toFormat(
        DATE_SELECT_FORMAT
      )
    }
  }
  return ''
}

export const getTimeSlot = (attributes: Array<Attribute> = []) => {
  for (const attribute of attributes) {
    if (attribute.key === 'TBP Delivery Time') {
      return attribute.value?.toString().trim()
    }
  }
  return ''
}

export const composeAttributes = (
  timeSlot: string,
  date: string
): Array<AttributeInput> => {
  const dt = DateTime.fromFormat(date, DATE_SELECT_FORMAT)
  return [
    {
      key: 'TBP Delivery Method',
      value: 'Delivery',
    },
    {
      key: 'TBP Delivery Date',
      value: dt.toFormat('LLL d, yyyy'),
    },
    {
      key: 'TBP Delivery Day',
      value: dt.toFormat('EEEE'),
    },
    {
      key: 'TBP Delivery Time',
      value: timeSlot,
    },
    {
      key: 'TBP Customer TimeZone',
      value: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
  ]
}

export const TIME_SLOTS = [
  '9:00 AM - 12:00 PM',
  '3:00 PM - 6:00 PM',
  '6:00 PM - 10:00 PM',
] as const
