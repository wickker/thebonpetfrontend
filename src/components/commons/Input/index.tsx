import { InputHTMLAttributes, MouseEvent, useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'
import { cn } from '@/utils/functions'

const Text = ({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      type='text'
      className={cn(
        'text-dark-gray focus:border-dark-green block h-[45px] w-full border border-[#90988F] px-3 py-2 outline-none hover:border-[2px] focus:border-[2px]',
        className
      )}
      {...props}
    />
  )
}

const Password = ({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) => {
  const [showPassword, setShowPassword] = useState(false)

  const toggleShowPassword = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setShowPassword((prev) => !prev)
  }

  return (
    <div
      className={cn(
        'text-dark-gray focus-within:border-dark-green flex h-[45px] w-full items-center gap-x-2 border border-[#90988F] px-3 py-2 outline-none focus-within:border-[2px] hover:border-[2px]',
        className
      )}
    >
      <input
        {...props}
        type={showPassword ? 'text' : 'password'}
        className='h-full w-full outline-none'
      />
      <button className='cursor-pointer' onClick={toggleShowPassword}>
        {showPassword ? (
          <FaRegEyeSlash className='text-dark-green h-6 w-6' />
        ) : (
          <FaRegEye className='text-dark-green h-6 w-6' />
        )}
      </button>
    </div>
  )
}

const Input = {
  Text,
  Password,
}

export default Input
