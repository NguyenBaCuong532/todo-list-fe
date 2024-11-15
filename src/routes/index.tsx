import Homepage from '../pages/user/Homepage'
import Layout from '../components/Layout'
import { ROUTES } from '../config/constant'
import Todo from '../pages/user/Todo'
import { Route, Routes } from 'react-router-dom'

export const UserRouter = () => {
  const Routers = [
    { path: ROUTES.HOME, component: <Homepage /> },
    { path: ROUTES.TODO_CONTENT, component: <Todo /> }
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
