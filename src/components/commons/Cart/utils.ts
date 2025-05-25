import {
  CartLine,
  ComponentizableCartLine,
} from '@shopify/hydrogen-react/storefront-api-types'

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
