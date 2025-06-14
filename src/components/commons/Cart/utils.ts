import {
  Attribute,
  AttributeInput,
  Cart,
  CartLine,
  ComponentizableCartLine,
} from '@shopify/hydrogen-react/storefront-api-types'
import { DateTime } from 'luxon'
import { DeliveryDetails, OrderItem } from '@/@types/carts'
import { DATE_SELECT_FORMAT } from '@/components/commons/DateSelect/dateSelect'
import { ATTRIBUTE_KEYS } from '@/utils/constants'
import { jsonSafeParse } from '@/utils/functions'

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
    if (attribute.key === ATTRIBUTE_KEYS.DELIVERY_DETAILS) {
      const deliveryDetails = jsonSafeParse<DeliveryDetails>(
        attribute.value as string
      )
      return deliveryDetails?.date
        ? DateTime.fromJSDate(new Date(deliveryDetails.date)).toFormat(
            DATE_SELECT_FORMAT
          )
        : ''
    }
  }
  return ''
}

export const getTimeSlot = (attributes: Array<Attribute> = []) => {
  for (const attribute of attributes) {
    if (attribute.key === ATTRIBUTE_KEYS.DELIVERY_DETAILS) {
      const deliveryDetails = jsonSafeParse<DeliveryDetails>(
        attribute.value as string
      )
      return deliveryDetails?.time_slot || ''
    }
  }
  return ''
}

export const getWeekInterval = (frequency: string) => {
  if (frequency.includes('2')) return 2
  if (frequency.includes('3')) return 3
  if (frequency.includes('4')) return 4
  if (frequency.includes('5')) return 5
  if (frequency.includes('6')) return 6
  return 1
}

export const composeAttributes = (
  timeSlot: string,
  date: string,
  cart: Cart
): Array<AttributeInput> => {
  const dt = DateTime.fromFormat(date, DATE_SELECT_FORMAT)
  const deliveryDetails: DeliveryDetails = {
    date: dt.toFormat('LLL d, yyyy'),
    day: dt.toFormat('EEEE'),
    time_slot: timeSlot,
    customer_time_zone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  }

  const orderItems: Array<OrderItem> = []
  for (const line of cart.lines.edges) {
    const variantName = fixVariantName(line.node.merchandise.title)
    const frequency =
      line.node.sellingPlanAllocation?.sellingPlan.name.replace(
        ', 10% off',
        ''
      ) || 'Once-off'
    const weekInterval = getWeekInterval(frequency)

    const item: OrderItem = {
      name: `${line.node.merchandise.product.title} - ${variantName}`,
      quantity: line.node.quantity,
      frequency,
      delivery_date: date,
      time_slot: timeSlot,
      next_delivery_date:
        frequency === 'Once-off'
          ? ''
          : dt.plus({ days: 7 * weekInterval }).toFormat(DATE_SELECT_FORMAT),
      variant_id: line.node.merchandise.id,
    }

    orderItems.push(item)
  }

  return [
    {
      key: ATTRIBUTE_KEYS.DELIVERY_DETAILS,
      value: JSON.stringify(deliveryDetails),
    },
    {
      key: ATTRIBUTE_KEYS.ITEMS,
      value: JSON.stringify(orderItems),
    },
  ]
}

export const TIME_SLOTS = ['9:00 AM - 10:00 PM'] as const

export const fixVariantName = (variantName: string) => {
  if (parseInt(variantName) && !variantName.includes('g')) {
    return `${variantName}g`
  }
  return variantName
}
