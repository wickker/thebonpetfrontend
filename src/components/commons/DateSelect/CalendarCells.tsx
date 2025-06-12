import { DateTime } from 'luxon'
import { cn } from '@/utils/functions'
import { DATE_SELECT_FORMAT, DatePickerHandler } from './dateSelect'

const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'] as const

type CalendarCells = {
  month: number
  year: number
  selectedDate: string
  onSelectDate: (date: DateTime) => void
}

const CalendarCells = ({
  month,
  year,
  selectedDate,
  onSelectDate,
}: CalendarCells) => {
  const { cells: cellRows } = new DatePickerHandler(month, year, selectedDate)
  const cells = cellRows.flatMap((row) => row)

  return (
    <div className='grid grid-cols-7 justify-items-center gap-1 text-sm'>
      {daysOfWeek.map((day) => (
        <div key={day} className='font-bold'>
          {day}
        </div>
      ))}

      {cells.map((cell) => (
        <button
          key={cell.dateTime.toFormat(DATE_SELECT_FORMAT)}
          onClick={() => onSelectDate(cell.dateTime)}
          className={cn(
            'hover:bg-green/20 grid h-7 w-7 cursor-pointer place-items-center text-center transition-all hover:rounded-full disabled:cursor-not-allowed disabled:text-neutral-400 disabled:hover:bg-transparent',
            cell.isMonth && 'font-bold',
            cell.isToday && 'underline',
            cell.isSelected && 'bg-green rounded-full font-bold text-white'
          )}
          disabled={
            cell.isSunday || !cell.isAfterOneWeek || cell.isPublicHoliday
          }
        >
          {cell.dateTime.day}
        </button>
      ))}
    </div>
  )
}

export default CalendarCells
