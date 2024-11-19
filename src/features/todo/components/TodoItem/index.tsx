import React from 'react'
import './index.css'
import EditLocationOutlinedIcon from '@mui/icons-material/EditLocationOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
interface TodoItemProps {
  id: number
  text: string
  completed: boolean
  onToggle: (id: number) => void
}

const TodoItem: React.FC<TodoItemProps> = ({ id, text, completed, onToggle }) => {
  return (
    <div className={`todo-item ${completed ? 'completed' : ''}`}>
      <label>
        <input type='checkbox' checked={completed} onChange={() => onToggle(id)} />
        <span className='todo-text'>{text}</span>
      </label>
      <div className='option'>
        <span className='option_edit'>
          <EditLocationOutlinedIcon />
        </span>
        <span className='option_del'>
          <DeleteOutlineOutlinedIcon />
        </span>
      </div>
    </div>
  )
}

export default TodoItem
