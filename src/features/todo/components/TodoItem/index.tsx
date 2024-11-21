import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import EditLocationOutlinedIcon from '@mui/icons-material/EditLocationOutlined'
import React, { useState } from 'react'
import { api } from '../../../../utils/axios'
import './index.css'
import { useAtom } from 'jotai'
import { todosAtom } from '../../stores'

interface TodoItemProps {
  id: number
  text: string
  completed: boolean
  onToggle: (id: number) => void
}

const TodoItem: React.FC<TodoItemProps> = ({ id, text, completed, onToggle }) => {
  const [, setError] = useState<string | null>(null)
  const [isEdit, setEdit] = useState(false)
  const [newText, setNewText] = useState(text)
  const [todos, setTodos] = useAtom(todosAtom)

  const handleEditToggle = async () => {
    setEdit((prev) => !prev)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewText(e.target.value)
  }

  const handleSave = async () => {
    try {
      const response = await api.patch(`todo/${id}/item`, {
        item: newText
      })
      console.log('Todo Updated:', response.data)
      const newTodos = todos.map((todo) => {
        if (todo.id === id) {
          todo.item = newText
        }
        return todo
      })

      setTodos(newTodos)
    } catch (error) {
      setError(`Failed to delete todo. Error: ${error}`)
    }
    setEdit(false)
  }

  const handleDelItem = async () => {
    try {
      const response = await api.delete(`todo/${id}/item`)
      console.log('Todo deleted:', response.data)
      if (response.data) {
        setTodos((prevTodos) => [...prevTodos].filter((todo) => todo.id !== id))
      }
    } catch (error) {
      setError(`Failed to delete todo. Error: ${error}`)
    }
  }

  return (
    <div className={`todo-item  ${completed ? 'completed' : ''}`}>
      <label>
        <input type='checkbox' checked={completed} onChange={() => onToggle(id)} />
        {isEdit ? (
          <>
            <input type='text' value={newText} onChange={handleInputChange} onBlur={handleSave} autoFocus />
            <button onClick={handleSave}>Save</button>
          </>
        ) : (
          <span className='todo-text'>{text}</span>
        )}
      </label>
      <div className='option'>
        <span className='option_edit' onClick={handleEditToggle}>
          <EditLocationOutlinedIcon />
        </span>
        <span className='option_del' onClick={handleDelItem}>
          <DeleteOutlineOutlinedIcon />
        </span>
      </div>
    </div>
  )
}

export default TodoItem
