import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined'
import axios from 'axios'
import { useSetAtom } from 'jotai'
import cookies from 'js-cookie'
import { ChangeEvent, FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { API_URL, routes } from '../../config/constant'
import { userAtom } from '../../features/auth/stores'
import './index.css'

const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [check, setCheck] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const setUser = useSetAtom(userAtom) // Truy cập hàm cập nhật atom
  const navigate = useNavigate()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

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

      axios.defaults.withCredentials = true // Cho phép gửi cookie trong request
      const userResponse = await axios.get(`${API_URL}/users`)

      console.log('Danh sách người dùng:', userResponse.data)
      setUser(userResponse.data) // Cập nhật trạng thái người dùng

      navigate('/todo')
    } catch (error) {
      console.error('Lỗi:', error)
      setCheck(true)
    } finally {
      setLoading(false)
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
          <button className='btn-login' type='submit' disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
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
