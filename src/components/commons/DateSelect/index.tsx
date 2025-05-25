import { DateTime } from 'luxon'
import { DATE_FORMAT, DatePickerHandler } from './dateSelect'

const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

const DateSelect = () => {
  const now = DateTime.now()
  const { cells: cellRows } = new DatePickerHandler(
    now.month,
    now.year,
    now.toFormat(DATE_FORMAT)
  )
  const cells = cellRows.flatMap((row) => row)

  return (
    <div>
      <div className='grid w-fit grid-cols-7 justify-items-center gap-2 bg-white p-4'>
        {daysOfWeek.map((day) => {
          return (
            <div key={day} className='font-bold'>
              {day}
            </div>
          )
        })}
        {cells.map((cell) => {
          return (
            <button key={cell.dateTime.toFormat(DATE_FORMAT)}>
              {cell.dateTime.day}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default DateSelect
