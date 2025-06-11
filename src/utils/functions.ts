import { CustomerAccessToken } from '@shopify/hydrogen-react/storefront-api-types'
import { clsx, type ClassValue } from 'clsx'
import { DateTime } from 'luxon'
import { twMerge } from 'tailwind-merge'
import { ZodSchema } from 'zod'
import { CartStorage } from '@/@types/carts'
import { LOCAL_STORAGE_KEYS } from './constants'

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

export const jsonSafeParse = <T>(s: string, schema?: ZodSchema) => {
  try {
    const json: T = JSON.parse(s)
    if (!schema) return json

    return schema.parse(json) as T
  } catch (e) {
    console.error(`Error parsing stringified json [string: ${s}]: ${e}`)
  }
}

export const getCartJsonFromLocalStorage = () => {
  const cartStr = localStorage.getItem(LOCAL_STORAGE_KEYS.CART)
  if (!cartStr) return
  return jsonSafeParse<CartStorage>(cartStr)
}

export const getTokenJsonFromLocalStorage = () => {
  const tokenStr = localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN)
  if (!tokenStr) return
  return jsonSafeParse<CustomerAccessToken>(tokenStr)
}

export const getShowPromoFromLocalStorage = () => {
  const expiryStr = localStorage.getItem(
    LOCAL_STORAGE_KEYS.PROMO_DISMISSED_EXPIRY
  )
  if (!expiryStr) return true
  const expiry = DateTime.fromISO(expiryStr)
  const now = DateTime.now()
  return now > expiry
}

export const capitalizeFirstLetter = (string: string) => {
  if (!string) return ''
  return string.charAt(0).toUpperCase() + string.slice(1)
}
