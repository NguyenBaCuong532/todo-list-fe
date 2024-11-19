import { Route, Routes } from 'react-router-dom'
import Layout from '../components/Layout'
import { ROUTERS } from '../config/constant'

export const Router = () => {
  return (
    <Layout>
      <Routes>
        {ROUTERS.map((route, index) => {
          const RouteComponent = route.component
          return <Route key={index} path={route.path} element={<RouteComponent />} />
        })}
      </Routes>
    </Layout>
  )
}
