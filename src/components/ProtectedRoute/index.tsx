import { Navigate } from 'react-router-dom'
import { IUser } from '../../types/user.interface'
interface Props {
  user: IUser | null
  redirectPath?: string
  children: React.ReactNode
}
export const ProtectedRoute = ({ user, redirectPath = '/login', children }: Props) => {
  if (!user) {
    return <Navigate to={redirectPath} replace />
  }

  return children
}
