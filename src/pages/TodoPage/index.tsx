import DarkModeIcon from '@mui/icons-material/DarkMode'
import SearchIcon from '@mui/icons-material/Search'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import AddItems from '../../features/todo/components/AddItem'
import TodoItem from '../../features/todo/components/TodoItem'
import { todosAtom } from '../../features/todo/stores'
import { api } from '../../utils/axios'
import './index.css'
function TodoPage() {
  const [todos, setTodos] = useAtom(todosAtom)

  const [error, setError] = useState<string | null>(null) // State lỗi
  const [filter, setFilter] = useState<string>('all')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev)
  }

  //additem
  const [isModalOpen, setModalOpen] = useState(false)

  const handleOpenModal = () => setModalOpen(true)
  const handleCloseModal = () => setModalOpen(false)

  const toggleTodo = async (id: number) => {
    setTodos((prevTodos) => prevTodos.map((todo) => (todo.id === id ? { ...todo, checked: !todo.checked } : todo)))
    const checkItem = todos?.filter((todo) => todo.id === id)
    try {
      const response = await api.patch(`todo/${id}/item`, {
        item: checkItem[0].item,
        checked: !checkItem[0].checked
      })
      console.log('Todo Updated:', response.data)
    } catch (error) {
      setError(`Failed to delete todo. Error: ${error}`)
    }
  }

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'all') return true
    if (filter === 'completed') return todo.checked
    if (filter === 'incomplete') return !todo.checked
    return true
  })
  console.log(todos)

  // Hàm lấy Todo list từ API
  const fetchTodos = async () => {
    try {
      const response = await api.get(`/todo/me`)
      setTodos(response.data)
    } catch (err) {
      setError(`Failed to fetch todos.Error :${err}`)
    }
  }

  // Dùng useEffect để gọi API khi component được mount
  useEffect(() => {
    ;(async () => await fetchTodos())()
  }, [])

  return (
    <>
      <h1 className='title'>ToDo List</h1>
      <div className='todo-content '>
        <div className='todo-header '>
          <div className='input-group'>
            <input className='todo-header_search' type='text' name='search' required />
            <label htmlFor='search'>Search note ...</label>
            <button className='btn-search'>
              <SearchIcon />
            </button>
          </div>
          <div className='custom-dropdown'>
            <button id='filler-option' onClick={() => toggleDropdown()} className='dropdown-button'>
              {filter === 'all' ? 'ALL' : filter === 'completed' ? 'Complete' : 'Incomplete'}
            </button>
            {isDropdownOpen ? (
              <>
                <ul className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`}>
                  <li
                    onClick={() => {
                      setIsDropdownOpen(false)
                      setFilter('all')
                    }}
                    data-value='all'
                  >
                    ALL
                  </li>
                  <li
                    onClick={() => {
                      setIsDropdownOpen(false)
                      setFilter('completed')
                    }}
                    data-value='completed'
                  >
                    Complete
                  </li>
                  <li
                    onClick={() => {
                      setFilter('incomplete')
                      setIsDropdownOpen(false)
                    }}
                    data-value='incomplete'
                  >
                    Incomplete
                  </li>
                </ul>
              </>
            ) : (
              ''
            )}
          </div>
          <button className='theme'>
            <DarkModeIcon />
          </button>
        </div>
        <div className='todo-header todo-header__items todo-container'>
          <div className='todo-items'>
            {error && <p style={{ color: 'red' }}>ERROR:{error}</p>}
            {!error ? (
              todos.length != 0 ? (
                filteredTodos.map((todo) => (
                  <TodoItem
                    key={todo.id}
                    id={todo.id}
                    text={todo.item}
                    completed={todo.checked}
                    onToggle={toggleTodo}
                  />
                ))
              ) : (
                <>
                  <div className='no-todo-item'>
                    <img className='' src='/src/assets/image/add-first.jpg' alt='' width={'250px'} height={'280px'} />
                  </div>
                  <p style={{ textAlign: 'center', fontSize: '30px' }}> Add your first Todo</p>
                </>
              )
            ) : (
              ''
            )}
          </div>
        </div>
        <button className='add-button' onClick={handleOpenModal}>
          <p>+</p>
        </button>
        <AddItems isOpen={isModalOpen} onClose={handleCloseModal} />
      </div>
    </>
  )
}
export default TodoPage
