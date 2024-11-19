import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/ResgiterPage'
import TodoPage from '../pages/TodoPage'

export const routes = {
  HOME: '',
  TODO_CONTENT: 'todo',
  REGISTER: 'register',
  LOGIN: 'login'
}
export const ROUTERS = [
  { path: routes.HOME, component: HomePage },
  { path: routes.TODO_CONTENT, component: TodoPage },
  { path: routes.LOGIN, component: LoginPage },
  { path: routes.REGISTER, component: RegisterPage }
]
export const API_URL = 'http://localhost:4000'
