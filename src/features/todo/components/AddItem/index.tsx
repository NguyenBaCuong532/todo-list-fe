import { FormEvent, useState } from 'react'
import { api } from '../../../../utils/axios'
import './index.css'
import { useAtom } from 'jotai'
import { todosAtom } from '../../stores'
interface AddModal {
  isOpen: boolean
  onClose: () => void
}
const AddItems: React.FC<AddModal> = ({ isOpen, onClose }) => {
  const [addItem, setAddItem] = useState<string>('')
  const [, setTodos] = useAtom(todosAtom)
  const [error, setError] = useState<string | null>(null)
  if (!isOpen) return null
  const createTodo = async (addItem: string) => {
    try {
      const response = await api.post(`/todo/create`, {
        item: addItem
      })
      if (response.data) {
        console.log('Todo created:', response.data)

        setTodos((prevTodos) => [
          ...prevTodos,
          { id: response.data.id, item: response.data.item, checked: response.data.checked }
        ])
      }
    } catch (err) {
      setError(`Failed to fetch todos. Error: ${err}`)
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    console.log(addItem)
    await createTodo(addItem)
    setAddItem('')
    onClose()
  }

  return (
    <>
      <div className='modal-overlay'>
        <form className='modal-content' onSubmit={handleSubmit}>
          <img className='bgr' src='/src/assets/image/newtodo.jpg' alt='' />
          <h2>New Note</h2>
          {error && <p style={{ color: 'red' }}>ERROR:{error}</p>}

          <div className='new-item'>
            <input
              className=''
              type='text'
              placeholder='Input your note...'
              required
              value={addItem}
              autoFocus
              onChange={(e) => setAddItem(e.target.value)}
            />
          </div>
          <div className='option'>
            <button onClick={onClose} className='close-button'>
              Cancel
            </button>
            <button type='submit' className='apply-button'>
              Apply
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
export default AddItems
