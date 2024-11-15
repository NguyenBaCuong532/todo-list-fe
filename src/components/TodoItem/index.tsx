interface Todo {
  title: string
}

const TodoItem = ({ todo }: { todo: Todo }) => <li>{todo.title}</li>

export default TodoItem
