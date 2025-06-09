import { ReactNode, useState } from 'react'
import { FaChevronDown } from 'react-icons/fa6'
import { cn } from '@/utils/functions'

type AccordianProps = {
  question: string
  answer: ReactNode
}

const Accordian = ({ question, answer }: AccordianProps) => {
  const [open, setOpen] = useState(false)

  const handleToggleOpen = () => setOpen((prev) => !prev)

  return (
    <div className='bg-beige rounded-xl border border-[#CCBC9E] p-4 text-xl font-bold text-[#443928]'>
      <div className='flex items-center justify-between gap-x-2'>
        {question}
        <button
          onClick={handleToggleOpen}
          className={cn('cursor-pointer transition-all', open && 'rotate-180')}
        >
          <FaChevronDown />
        </button>
      </div>
      <div
        className={cn(
          'h-full max-h-0 overflow-hidden text-base font-normal transition-all',
          open && 'max-h-[300px]'
        )}
      >
        <div className='mt-2' />
        {answer}
      </div>
    </div>
  )
}

export default Accordian
