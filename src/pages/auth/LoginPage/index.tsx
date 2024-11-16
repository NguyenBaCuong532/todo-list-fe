import axios from 'axios'
import { useSetAtom } from 'jotai'
import Cookies from 'js-cookie'
import { ChangeEvent, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { atom } from 'jotai'

// Atom lưu thông tin người dùng (ban đầu là null)
export const userAtom = atom<string | null>(null)

const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [check, setCheck] = useState(false)
  const [loading, setLoading] = useState(false)
  const setUser = useSetAtom(userAtom) // Truy cập hàm cập nhật atom
  const navigate = useNavigate()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
      const loginResponse = await axios.post('http://localhost:4000/auth/login', {
        username,
        password
      })

      const token = loginResponse.data.token
      Cookies.set('auth', token, {
        expires: 1,
        secure: true,
        sameSite: 'Strict',
        path: '/'
      })
      sessionStorage.setItem('auth', JSON.stringify(token))

      axios.defaults.withCredentials = true // Cho phép gửi cookie trong request
      const userResponse = await axios.get('http://localhost:4000/users')

      console.log('Danh sách người dùng:', userResponse.data)
      setUser(userResponse.data.fullname) // Cập nhật trạng thái người dùng

      navigate('/todo')
    } catch (error) {
      console.error('Lỗi:', error)
      setCheck(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='username'>Username</label>
      <input
        type='text'
        id='username'
        value={username}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
        required
      />
      <label htmlFor='password'>Password</label>
      <input
        type='password'
        id='password'
        value={password}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
        required
      />
      <p>{check ? 'Tài khoản hoặc mật khẩu không chính xác!' : ''}</p>
      <button type='submit' disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  )
}

export default LoginPage
