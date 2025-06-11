import { useState } from 'react'
import { FaChevronDown } from 'react-icons/fa6'
import { IconType } from 'react-icons/lib'
import { cn } from '@/utils/functions'

type AccordianProps = {
  title: string
  Icon: IconType
  content: string
}

const Accordian = ({ title, Icon, content }: AccordianProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleToggleOpen = () => setIsOpen((prev) => !prev)

  return (
    <>
      <div className='text-dark-brown grid grid-cols-[auto_1fr_auto] items-center gap-x-2 py-4'>
        <Icon className='h-6 w-6' />
        <h3 className='text-dark-brown text-xl font-bold'>{title}</h3>
        <button onClick={handleToggleOpen} className='cursor-pointer'>
          <FaChevronDown
            className={cn(
              'h-4 w-4 transition-transform',
              isOpen && 'rotate-180'
            )}
          />
        </button>

        <div
          className={cn(
            'col-span-full max-h-0 overflow-hidden transition-[max-height]',
            isOpen && 'max-h-[300px]'
          )}
        >
          <div className='mt-4' />
          <div
            dangerouslySetInnerHTML={{ __html: content }}
            className='flex flex-col gap-4'
          />
        </div>
      </div>

      <div className='h-[1px] w-full bg-[#CCBC9E]' />
    </>
  )
}

export default Accordian
