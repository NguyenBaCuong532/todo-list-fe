import { ChangeEvent, FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined'
import { routes } from '../../config/routes'
import { api } from '../../utils/axios'

function RegisterPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [fullname, setFullname] = useState('')
  const [, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }
  const createTodo = async (username: string, password: string, fullname: string) => {
    try {
      const response = await api.post(`/auth/signup`, {
        username: username,
        password: password,
        fullname: fullname
      })
      if (response.data) {
        console.log('Todo created:', response.data)
      }
    } catch (error) {
      setError(`Failed to fetch todos. Error: ${error}`)
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    await createTodo(username, password, fullname)
    navigate('/login')
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
              value={fullname}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setFullname(e.target.value)}
              required
            />
            <label htmlFor='fullname'>Fullname</label>
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
          </div>
          <div className='btn'>
            <button className='btn-login' type='submit'>
              Register
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
