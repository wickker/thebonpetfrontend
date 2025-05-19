import { ButtonHTMLAttributes, ReactNode } from 'react'
import { RiLoader4Fill } from 'react-icons/ri'
import { cn } from '@/utils/functions'

interface PlainProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  className?: string
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
        'bg-dark-green flex w-fit items-center gap-2 px-8 py-2 text-white hover:cursor-pointer',
        disabled && 'opacity-75 hover:cursor-not-allowed',
        className
      )}
      disabled={disabled}
      {...props}
    >
      {isLoading && <RiLoader4Fill className='h-5 w-5 animate-spin' />}
      {children}
    </button>
  )
}

const Button = {
  Plain,
}

export default Button
