import { CustomerAccessToken } from '@shopify/hydrogen-react/storefront-api-types'
import { clsx, type ClassValue } from 'clsx'
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
