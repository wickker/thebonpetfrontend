import {
  Attribute,
  Cart,
  CartLine,
  ComponentizableCartLine,
} from '@shopify/hydrogen-react/storefront-api-types'
import { DateTime } from 'luxon'
import { DATE_FORMAT } from '@/components/commons/DateSelect/dateSelect'

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
    if (attribute.key === 'Delivery Date') {
      return DateTime.fromJSDate(new Date(attribute.value as string)).toFormat(
        DATE_FORMAT
      )
    }
  }
  return ''
}

export const getTimeSlot = (attributes: Array<Attribute> = []) => {
  for (const attribute of attributes) {
    if (attribute.key === 'Delivery Time') {
      return attribute.value as string
    }
  }
  return ''
}
