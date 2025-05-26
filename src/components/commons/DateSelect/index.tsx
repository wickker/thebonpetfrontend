import { useCallback, useState } from 'react'
import {
  Popover,
  PopoverContent,
  PopoverPortal,
  PopoverTrigger,
} from '@radix-ui/react-popover'
import { DateTime } from 'luxon'
import { FaChevronDown } from 'react-icons/fa6'
import { IoCalendarOutline } from 'react-icons/io5'
import { cn } from '@/utils/functions'
import CalendarCells from './CalendarCells'
import { DATE_FORMAT } from './dateSelect'
import MonthToggler from './MonthToggler'

type DateSelectProps = {
  date?: string
  onSelectDate?: (date: string) => void
}

const DateSelect = ({ date, onSelectDate }: DateSelectProps) => {
  const now = DateTime.now().plus({ day: 8 }).toFormat(DATE_FORMAT)
  const [selectedDate, setSelectedDate] = useState(date || now)
  const selectedDateTime = DateTime.fromFormat(selectedDate, DATE_FORMAT)
  const [month, setMonth] = useState(selectedDateTime.month)
  const [year, setYear] = useState(selectedDateTime.year)
  const [isOpen, setIsOpen] = useState(false)

  const handleGoToNextMonth = useCallback(() => {
    if (month + 1 > 12) {
      setMonth(1)
      setYear((prev) => prev + 1)
      return
    }
    setMonth((prev) => prev + 1)
  }, [month])

  const handleGoToPreviousMonth = useCallback(() => {
    if (month - 1 < 1) {
      setMonth(12)
      setYear((prev) => prev - 1)
      return
    }
    setMonth((prev) => prev - 1)
  }, [month])

  const handleSelectDate = (date: DateTime) => {
    setSelectedDate(date.toFormat(DATE_FORMAT))
    onSelectDate?.(date.toFormat(DATE_FORMAT))
    setIsOpen(false)
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger>
        <button
          className={cn(
            'text-dark-gray focus:border-dark-green grid h-[45px] w-full cursor-pointer grid-cols-[auto_1fr_auto] items-center gap-x-2 border border-[#90988F] px-3 py-2 text-left outline-none hover:border-[2px] focus:border-[2px]',
            isOpen && 'border-dark-green border-[2px]'
          )}
        >
          <IoCalendarOutline className='text-dark-green' />
          <p className='truncate text-sm'>{selectedDate}</p>
          <FaChevronDown className='text-dark-green' />
        </button>
      </PopoverTrigger>

      <PopoverPortal>
        <PopoverContent sideOffset={6} align='start' className='z-20'>
          <div
            className='text-dark-green flex w-fit flex-col gap-y-2 rounded p-4 shadow-lg'
            style={{
              backgroundImage: `linear-gradient(var(--color-beige-95), var(--color-beige-95)), url('/background.png')`,
            }}
          >
            <MonthToggler
              month={month}
              year={year}
              onNext={handleGoToNextMonth}
              onPrevious={handleGoToPreviousMonth}
            />

            <CalendarCells
              month={month}
              year={year}
              selectedDate={selectedDate}
              onSelectDate={handleSelectDate}
            />
          </div>
        </PopoverContent>
      </PopoverPortal>
    </Popover>
  )
}

export default DateSelect
