import React from 'react'
import { Check } from 'lucide-react'

interface CalendarProps {
  habitData: {
    [date: string]: boolean[]
  }
  habits: string[]
}

const Calendar: React.FC<CalendarProps> = ({ habitData, habits }) => {
  const today = new Date()
  const currentMonth = today.getMonth()
  const currentYear = today.getFullYear()

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-semibold mb-4">
        {today.toLocaleString('default', { month: 'long' })} {currentYear}
      </h2>
      <div className="grid grid-cols-7 gap-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center font-medium text-gray-500">
            {day}
          </div>
        ))}
        {Array(firstDayOfMonth)
          .fill(null)
          .map((_, index) => (
            <div key={`empty-${index}`} className="h-10" />
          ))}
        {days.map(day => {
          const date = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
          const dayHabits = habitData[date] || []

          return (
            <div
              key={day}
              className="h-20 border border-gray-200 p-1 flex flex-col"
            >
              <span className="text-sm font-medium">{day}</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {habits.slice(0, 4).map((habit, index) => (
                  <div
                    key={habit}
                    className={`w-4 h-4 flex items-center justify-center text-xs rounded-sm border ${
                      dayHabits[index] === undefined
                        ? 'border-gray-300'
                        : dayHabits[index]
                        ? 'bg-green-500 border-green-500'
                        : 'bg-red-500 border-red-500'
                    }`}
                  >
                    {dayHabits[index] === true && (
                      <Check className="w-3 h-3 text-white" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Calendar