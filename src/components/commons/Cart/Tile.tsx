import { IoTrashOutline } from 'react-icons/io5'
import { Button } from '@/components/commons'

const Tile = () => {
  return (
    <div className='grid grid-cols-[auto_1fr] gap-x-3'>
      <div
        className='bg-dark-gray h-18 w-18 rounded bg-contain bg-center bg-no-repeat'
        style={{
          backgroundImage: `url('https://placehold.co/160x200')`,
        }}
      />

      <div className='flex flex-col gap-y-1'>
        <div className='text-dark-green flex items-start justify-between gap-x-2 font-bold'>
          <h1>Gently Cooked Free Range Chicken for Dogs</h1>
          <h1 className='text-xl'>$9.10</h1>
        </div>

        <div className='flex items-center justify-between gap-x-2'>
          <div className='text-dark-green flex flex-col text-sm'>
            <p>300g | Deliver every week, 10% off</p>
          </div>
          <button>
            <IoTrashOutline className='text-dark-green h-5 w-5' />
          </button>
        </div>

        <div className='flex items-center justify-between'>
          <p className='text-dark-green text-sm'>
            <span className='text-neutral-400 line-through'>$10.00</span> $9.10
          </p>
          <Button.Quantity
            quantity={0}
            onAdd={() => {}}
            onRemove={() => {}}
            isAddLoading={false}
            isRemoveLoading={false}
          />
        </div>
      </div>
    </div>
  )
}

export default Tile
