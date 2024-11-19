import { ChangeEvent, FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { routes } from '../../config/constant'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined'

function RegisterPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [check, setCheck] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <>
      <form className='form-login' onSubmit={handleSubmit}>
        <div className='container'>
          <h1 className='title-login'>Log in to your CM Account</h1>
          <div className='input-login'>
            <input
              className='input-group_login'
              type='text'
              id='fullname'
              value={username}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
              required
            />
            <label htmlFor='username'>Fullname</label>
          </div>
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
            <p>{check ? 'Tài khoản hoặc mật khẩu không chính xác!' : ''}</p>
          </div>
          <div className='btn'>
            <button className='btn-login' type='submit' disabled={loading}>
              {loading ? 'Registering in...' : 'Register'}
            </button>
          </div>
          <p className='address'>
            Already have Account?<Link to={`/${routes.LOGIN}`}> Log in from here</Link>
          </p>
        </div>
      </form>
    </>
  )
}
export default RegisterPage
