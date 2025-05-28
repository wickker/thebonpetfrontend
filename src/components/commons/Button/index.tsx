import { ButtonHTMLAttributes, ReactNode } from 'react'
import { IoAddOutline, IoRemoveOutline } from 'react-icons/io5'
import { RiLoader4Fill } from 'react-icons/ri'
import { cn } from '@/utils/functions'

interface PlainProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  isLoading?: boolean
}

const Plain = ({
  children,
  className = '',
  isLoading = false,
  disabled,
  ...props
}: PlainProps) => {
  return (
    <button
      className={cn(
        'bg-dark-green flex w-fit cursor-pointer items-center gap-2 px-8 py-2 text-white disabled:opacity-75 disabled:hover:cursor-not-allowed',
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <RiLoader4Fill className='h-5 w-5 animate-spin' />}
      {children}
    </button>
  )
}

type QuantityProps = {
  quantity: number
  onMinus: () => void
  onAdd: () => void
  isMinusLoading?: boolean
  isAddLoading?: boolean
}

const Quantity = ({
  quantity,
  onMinus,
  onAdd,
  isAddLoading,
  isMinusLoading,
}: QuantityProps) => {
  return (
    <div className='border-dark-green text-dark-green flex items-center gap-x-4 border px-2 py-1 text-sm'>
      <button
        className='hover:text-green h-4 w-4 cursor-pointer transition-colors disabled:cursor-not-allowed'
        onClick={(e) => {
          e.preventDefault()
          onMinus()
        }}
        disabled={isMinusLoading}
      >
        {isMinusLoading ? (
          <RiLoader4Fill className='animate-spin' />
        ) : (
          <IoRemoveOutline className='h-4 w-4' />
        )}
      </button>
      <p>{quantity}</p>
      <button
        className='hover:text-green h-4 w-4 cursor-pointer transition-colors disabled:cursor-not-allowed'
        onClick={(e) => {
          e.preventDefault()
          onAdd()
        }}
        disabled={isAddLoading}
      >
        {isAddLoading ? (
          <RiLoader4Fill className='animate-spin' />
        ) : (
          <IoAddOutline className='h-4 w-4' />
        )}
      </button>
    </div>
  )
}

const Button = {
  Plain,
  Quantity,
}

export default Button
