import React, { useState, useEffect } from 'react'
import Calendar from './components/Calendar'
import HabitForm from './components/HabitForm'
import HabitSetup from './components/HabitSetup'

interface HabitData {
  [date: string]: boolean[]
}

function App() {
  const [habitData, setHabitData] = useState<HabitData>({})
  const [habits, setHabits] = useState<string[]>([])

  useEffect(() => {
    const storedData = localStorage.getItem('habitData')
    const storedHabits = localStorage.getItem('habits')
    if (storedData) {
      setHabitData(JSON.parse(storedData))
    }
    if (storedHabits) {
      setHabits(JSON.parse(storedHabits))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('habitData', JSON.stringify(habitData))
  }, [habitData])

  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits))
  }, [habits])

  const handleHabitSubmit = (completedHabits: boolean[]) => {
    const today = new Date().toISOString().split('T')[0]
    setHabitData(prevData => ({
      ...prevData,
      [today]: completedHabits
    }))
  }

  const handleHabitSetup = (newHabits: string[]) => {
    setHabits(newHabits)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 to-indigo-600 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-white mb-8">Habit Tracker</h1>
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        {habits.length === 0 ? (
          <HabitSetup onSubmit={handleHabitSetup} />
        ) : (
          <>
            <HabitForm habits={habits} onSubmit={handleHabitSubmit} />
            <Calendar habitData={habitData} habits={habits} />
          </>
        )}
      </div>
    </div>
  )
}

export default App