import { ButtonHTMLAttributes, ReactNode } from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa6'
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

interface CtaProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  isLoading?: boolean
  icon?: ReactNode
}

const Cta = ({
  children,
  className = '',
  isLoading = false,
  disabled,
  icon,
  ...props
}: CtaProps) => {
  return (
    <button
      className={cn(
        'flex w-fit cursor-pointer items-center gap-2 rounded-xl border-[3px] border-white/60 px-4 py-2 text-2xl whitespace-nowrap text-white disabled:hover:cursor-not-allowed',
        className
      )}
      style={{
        background: 'linear-gradient(180deg, #39AB6D 0%, #10776B 100%)',
      }}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? <RiLoader4Fill className='h-6 w-6 animate-spin' /> : icon}
      {children}
    </button>
  )
}

type CartQuantityProps = {
  quantity: number
  onMinus: () => void
  onAdd: () => void
  isMinusLoading?: boolean
  isAddLoading?: boolean
}

const CartQuantity = ({
  quantity,
  onMinus,
  onAdd,
  isAddLoading,
  isMinusLoading,
}: CartQuantityProps) => {
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

type QuantityProps = {
  quantity: number
  onMinus: () => void
  onAdd: () => void
}

const Quantity = ({ quantity, onMinus, onAdd }: QuantityProps) => {
  return (
    <div className='bg-cream grid h-[30px] w-fit grid-cols-[30px_100px_30px] items-center rounded-full'>
      <button
        className='bg-dark-green ml-[2.5px] grid h-[25px] w-[25px] cursor-pointer place-items-center rounded-full text-white disabled:opacity-50 disabled:hover:cursor-not-allowed'
        onClick={onMinus}
        disabled={quantity <= 1}
      >
        <FaMinus className='h-3 w-3' />
      </button>

      <p className='text-dark-green justify-self-center text-sm'>
        <b className='mr-1'>{quantity}</b> Pack(s)
      </p>

      <button
        className='bg-dark-green mr-[2.5px] grid h-[25px] w-[25px] cursor-pointer place-items-center justify-self-end rounded-full text-white disabled:opacity-50 disabled:hover:cursor-not-allowed'
        onClick={onAdd}
      >
        <FaPlus className='h-3 w-3' />
      </button>
    </div>
  )
}

const Button = {
  Cta,
  Plain,
  CartQuantity,
  Quantity,
}

export default Button
