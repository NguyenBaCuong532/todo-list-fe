import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/ResgiterPage'
import TodoPage from '../pages/TodoPage'

export const routes = {
  HOME: 'todo',
  TODO_CONTENT: 'todo',
  REGISTER: 'register',
  LOGIN: 'login'
}
export const ROUTERS = [
  { isProtected: true, path: routes.HOME, component: TodoPage },
  { isProtected: true, path: routes.TODO_CONTENT, component: TodoPage },
  { isProtected: false, path: routes.LOGIN, component: LoginPage },
  { isProtected: false, path: routes.REGISTER, component: RegisterPage }
]
