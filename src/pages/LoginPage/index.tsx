import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined'
import axios from 'axios'
import { useSetAtom } from 'jotai'
import cookies from 'js-cookie'
import { ChangeEvent, FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { API_URL } from '../../config/constant'
import { routes } from '../../config/routes'
import { userAtom } from '../../features/auth/stores'
import { api } from '../../utils/axios'
import './index.css'

const LoginPage = () => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [check, setCheck] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  // const [cookies, setCookie] = useCookies(['auth'])
  // console.log(cookies.get('auth'))
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const setUser = useSetAtom(userAtom)
  const navigate = useNavigate()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const loginResponse = await axios.post(`${API_URL}/auth/login`, {
        username,
        password
      })

      const token = loginResponse.data.token
      cookies.set('auth', token, {
        expires: 1,
        secure: true,
        sameSite: 'Strict',
        path: '/'
      })

      sessionStorage.setItem('auth', JSON.stringify(token))

      const userResponse = await api.get(`/users/me`)

      console.log('Danh sách người dùng:', userResponse.data)
      setUser(userResponse.data) // Cập nhật trạng thái người dùng

      navigate('/todo')
    } catch (error) {
      console.error('Lỗi:', error)
      setCheck(true)
    }
  }

  return (
    <form className='form-login' onSubmit={handleSubmit}>
      <div className='container'>
        <h1 className='title-login'>Log in to your CM Account</h1>
        <div className='input-login'>
          <input
            className='input-group_login'
            type='text'
            id='username'
            value={username}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
            required
          />
          <p className='icon'>
            <PersonOutlinedIcon />
          </p>
          <label htmlFor='username'>Username</label>
        </div>
        <div className='input-login'>
          <input
            className='input-group_login'
            type={showPassword ? 'text' : 'password'}
            id='password'
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            required
          />
          <p onClick={togglePasswordVisibility} className='icon'>
            {showPassword ? '👁️' : '🙈'}
          </p>
          <label htmlFor='password'>Password</label>
        </div>
        <p className=' relative h-1'>{check ? 'Tài khoản hoặc mật khẩu không chính xác!' : ''}</p>

        <div className='btn'>
          <button className='btn-login' type='submit'>
            Login
          </button>
        </div>

        <p className='address'>
          Log in or<Link to={`/${routes.REGISTER}`}> create an account</Link>
        </p>
      </div>
    </form>
  )
}
export default LoginPage
