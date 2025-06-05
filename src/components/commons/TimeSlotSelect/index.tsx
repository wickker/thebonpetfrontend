import { useState } from 'react'
import {
  Popover,
  PopoverContent,
  PopoverPortal,
  PopoverTrigger,
} from '@radix-ui/react-popover'
import { FaChevronDown } from 'react-icons/fa6'
import { IoTimeOutline } from 'react-icons/io5'
import { TIME_SLOTS } from '@/components/commons/Cart/utils'
import { cn } from '@/utils/functions'

type TimeSlotSelectProps = {
  selectedTimeSlot: string
  onSelectTimeSlot: (timeSlot: string) => void
}

const TimeSlotSelect = ({
  selectedTimeSlot,
  onSelectTimeSlot,
}: TimeSlotSelectProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleSelectTimeSlot = (timeSlot: string) => {
    onSelectTimeSlot(timeSlot)
    setIsOpen(false)
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button
          className={cn(
            'text-dark-gray focus:border-dark-green grid h-[45px] w-full cursor-pointer grid-cols-[auto_1fr_auto] items-center gap-x-2 border border-[#90988F] px-3 py-2 text-left outline-none hover:border-[2px] focus:border-[2px]',
            isOpen && 'border-dark-green border-[2px]'
          )}
        >
          <IoTimeOutline className='text-dark-green' />
          <p className='truncate text-sm'>{selectedTimeSlot}</p>
          <FaChevronDown className='text-dark-green' />
        </button>
      </PopoverTrigger>

      <PopoverPortal>
        <PopoverContent sideOffset={6} align='start' side='top'>
          <div
            className='text-dark-green flex w-[var(--radix-popover-trigger-width)] flex-col rounded py-2 shadow-lg'
            style={{
              backgroundImage: `linear-gradient(var(--color-beige-95), var(--color-beige-95)), url('/background.png')`,
            }}
          >
            {TIME_SLOTS.map((timeSlot) => (
              <button
                key={timeSlot}
                className={cn(
                  'text-dark-green cursor-pointer px-4 py-2 text-left text-sm',
                  timeSlot === selectedTimeSlot && 'bg-dark-green/20 font-bold'
                )}
                onClick={() => handleSelectTimeSlot(timeSlot)}
              >
                {timeSlot}
              </button>
            ))}
          </div>
        </PopoverContent>
      </PopoverPortal>
    </Popover>
  )
}

export default TimeSlotSelect
