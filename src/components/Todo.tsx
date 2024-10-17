'use client';
import { useState } from 'react'
import { Check, Plus, X } from 'lucide-react'

export default function Todo() {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')
  const [error, setError] = useState('')

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }])
      setNewTask('')
      setError('')
    } else {
      setError('Please enter a task')
    }
  }

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTask()
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-6">Today's tasks</h1>
          <div className="space-y-4">
            {tasks.map(task => (
              <div key={task.id} className="flex items-center bg-white rounded-lg shadow p-4">
                <button
                  onClick={() => toggleTask(task.id)}
                  className={`w-6 h-6 rounded ${task.completed ? 'bg-blue-500' : 'bg-blue-100'} mr-4 flex items-center justify-center`}
                >
                  {task.completed && <Check className="w-4 h-4 text-white" />}
                </button>
                <span className={`flex-grow ${task.completed ? 'line-through text-gray-500' : 'text-grey'}`}>
                    {task.text}
                </span>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                >
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            ))}
          </div>
          {tasks.length === 0 && (
            <p className="text-gray-500 text-center mt-4">No tasks yet. Add a task to get started!</p>
          )}
        </div>
        <div className="px-8 py-4 bg-gray-50 flex items-center">
          <input
            type="text"
            placeholder="Write a task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-grow bg-transparent outline-none placeholder-black"
          />
          <button
            onClick={addTask}
            className="ml-4 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
          >
            <Plus className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        {error && <p className="text-red-500 text-sm text-center pb-2">{error}</p>}
      </div>
    </div>
  )
}
