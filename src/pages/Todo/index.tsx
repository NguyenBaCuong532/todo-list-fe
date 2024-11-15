import { useEffect, useState } from 'react'
import TodoItem from '../../components/TodoItem'

function Todo() {
  const [todos, setTodos] = useState([
    { id: '1', title: 'Pen' },
    { id: '2', title: 'Tree' }
  ])

  useEffect(() => {}, [])

  return (
    <div>
      <h1>ToDo List</h1>
      <ul>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  )
}
export default Todo
