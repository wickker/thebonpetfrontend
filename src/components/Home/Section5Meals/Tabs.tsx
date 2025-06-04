import { cn } from '@/utils/functions'
import { Tab, TABS } from './utils'

type TabsProps = {
  selectedTab: Tab
  setSelectedTab: (tab: Tab) => void
}

const Tabs = ({ selectedTab, setSelectedTab }: TabsProps) =>
  TABS.map((tab) => {
    const isSelected = tab.tab === selectedTab

    return (
      <button
        className='flex cursor-pointer flex-col items-center gap-y-2 text-2xl font-bold'
        onClick={() => setSelectedTab(tab.tab)}
        key={tab.tab}
      >
        <p
          className={cn(
            'flex items-center gap-x-2 transition-colors',
            !isSelected && 'text-[#7B6D57]'
          )}
        >
          <img src={tab.icon} alt={`${tab.label} icon`} className='h-8 w-8' />
          {tab.label}
        </p>
        <div
          className={cn(
            'h-[2px] w-full max-w-0 rounded-full transition-all',
            isSelected && 'max-w-full bg-[#7B6D57]'
          )}
        />
      </button>
    )
  })

export default Tabs
