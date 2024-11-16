import Homepage from '../pages/HomePage'
import Layout from '../components/Layout'
import { ROUTES } from '../config/constant'
import Todo from '../pages/Todo'
import { Route, Routes } from 'react-router-dom'
import LoginPage from '../pages/auth/LoginPage'

export const UserRouter = () => {
  const Routers = [
    { path: ROUTES.HOME, component: <Homepage /> },
    { path: ROUTES.TODO_CONTENT, component: <Todo /> },
    { path: ROUTES.LOGIN, component: <LoginPage /> }

  ]
  return (
    <Layout>
      <Routes>
        {Routers.map((route, index) => (
          <Route key={index} path={route.path} element={route.component} />
        ))}
      </Routes>
    </Layout>
  )
}
