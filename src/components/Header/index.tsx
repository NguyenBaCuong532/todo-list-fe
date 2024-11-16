import { Link, useNavigate } from 'react-router-dom'
import { useAtom } from 'jotai'
import Cookies from 'js-cookie'
import { userAtom } from '../../pages/auth/LoginPage'

const Header = () => {
  const [user, setUser] = useAtom(userAtom) // Truy cập trạng thái người dùng
  const navigate = useNavigate()
  console.log(user)
  const handleLogout = () => {
    setUser(null) // Xóa thông tin người dùng
    Cookies.remove('auth') // Xóa cookie
    sessionStorage.removeItem('auth') // Xóa token trong session
    navigate('/')
  }

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to='/'>
              <img src='../../assets/image/white.png' alt='' width={'100px'} height={'100px'} />
            </Link>
          </li>
          {user ? (
            <>
              <li>Welcome, {user}!</li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </>
          ) : (
            <li>
              <Link to='/login'>Login</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  )
}

export default Header
