import React, { useState } from 'react'

interface HabitSetupProps {
  onSubmit: (habits: string[]) => void
}

const HabitSetup: React.FC<HabitSetupProps> = ({ onSubmit }) => {
  const [habits, setHabits] = useState<string[]>([''])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const nonEmptyHabits = habits.filter(habit => habit.trim() !== '')
    if (nonEmptyHabits.length > 0) {
      onSubmit(nonEmptyHabits)
    }
  }

  const handleChange = (index: number, value: string) => {
    setHabits(prevHabits => {
      const newHabits = [...prevHabits]
      newHabits[index] = value
      return newHabits
    })
  }

  const addHabit = () => {
    if (habits.length < 4) {
      setHabits(prevHabits => [...prevHabits, ''])
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold mb-2">Set up your habits (max 4)</h2>
      {habits.map((habit, index) => (
        <input
          key={index}
          type="text"
          value={habit}
          onChange={(e) => handleChange(index, e.target.value)}
          placeholder={`Habit ${index + 1}`}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        />
      ))}
      {habits.length < 4 && (
        <button
          type="button"
          onClick={addHabit}
          className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition duration-300"
        >
          Add Habit
        </button>
      )}
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
      >
        Start Tracking
      </button>
    </form>
  )
}

export default HabitSetup