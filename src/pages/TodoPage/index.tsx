import DarkModeIcon from '@mui/icons-material/DarkMode'
import SearchIcon from '@mui/icons-material/Search'
import { useState } from 'react'
import TodoItem from '../../features/todo/components/TodoItem'
import { ITodo } from '../../features/todo/interfaces'
import './index.css'
function TodoPage() {
  const [todos, setTodos] = useState<ITodo[]>([
    { id: 1, text: 'NOTE #1', completed: false },
    { id: 2, text: 'NOTE #2', completed: true },
    { id: 3, text: 'NOTE #3', completed: false }
  ])
  const [filter, setFilter] = useState<string>('all')

  const toggleTodo = (id: number) => {
    setTodos((prevTodos) => prevTodos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }
  const AddItem = () => {}

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'all') return true
    if (filter === 'completed') return todo.completed
    if (filter === 'incomplete') return !todo.completed
    return true
  })
  return (
    <>
      <h1 className='title'>ToDo List</h1>
      <div className='todo-content'>
        <div className='todo-header'>
          <div className='input-group'>
            <input className='todo-header_search' type='text' name='search' required />
            <label htmlFor='search'>Search note ...</label>
            <button className='btn-search'>
              <SearchIcon />
            </button>
          </div>
          <div className='filter'>
            <select value={filter} onChange={(e) => setFilter(e.target.value)} className='filter-select'>
              <option value='all'>All</option>
              <option value='completed'>Complete</option>
              <option value='incomplete'>Incomplete</option>
            </select>
          </div>
          <button className='theme'>
            <DarkModeIcon />
          </button>
        </div>
        <div className='todo-header todo-header__items'>
          <div className='todo-items'>
            {filteredTodos.length != 0
              ? filteredTodos.map((todo) => (
                  <TodoItem
                    key={todo.id}
                    id={todo.id}
                    text={todo.text}
                    completed={todo.completed}
                    onToggle={toggleTodo}
                  />
                ))
              : 'Add your first Todo'}
          </div>
        </div>
        <button className='add-button' onClick={AddItem}>
          <p>+</p>
        </button>
        <div className='additem'>1234</div>
      </div>
    </>
  )
}
export default TodoPage
