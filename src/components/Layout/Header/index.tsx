import { useAtom } from 'jotai'
import Cookies from 'js-cookie'
import { Link, useNavigate } from 'react-router-dom'
import { routes } from '../../../config/routes'
import { userAtom } from '../../../features/auth/stores'
import { IUser } from '../../../types/user.interface'
import './index.css'

const Header = () => {
  const [user, setUser] = useAtom<IUser | null>(userAtom)
  const navigate = useNavigate()
  console.log(user)
  const handleLogout = () => {
    setUser(null)
    Cookies.remove('auth')
    sessionStorage.removeItem('auth')
    navigate('/login')
  }

  return (
    <header>
      <div className='header-detail'>
        <Link to={routes.HOME}>
          <img className='header_logo' src='/src/assets/image/log-minions.jpg' alt='' />
        </Link>
        {user ? (
          <div className='header_name'>
            Welcome,<p style={{ color: 'yellow', fontWeight: '600' }}>{user.fullname}!</p>
            <button className='header_name-btn' onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <div className='header_name'>
            <Link className='header_btn-login' to='/login'>
              Login
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
