import { useAtom } from 'jotai'
import { Route, Routes } from 'react-router-dom'
import Layout from '../components/Layout'
import { ProtectedRoute } from '../components/ProtectedRoute'
import { ROUTERS } from '../config/routes'
import { userAtom } from '../features/auth/stores'

export const Router = () => {
  const [user] = useAtom(userAtom)
  console.log({user})
  return (
    <Layout>
      <Routes>
        {ROUTERS.map((route, index) => {
          const RouteComponent = route.component
          return (
            <Route
              key={index}
              path={route.path}
              element={
                route.isProtected ? (
                  <ProtectedRoute user={user}>
                    <RouteComponent />
                  </ProtectedRoute>
                ) : (
                  <RouteComponent />
                )
              }
            />
          )
        })}
      </Routes>
    </Layout>
  )
}
