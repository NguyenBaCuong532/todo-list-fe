import { atomWithStorage } from 'jotai/utils'
import { IUser } from '../../../types/user.interface'

// Atom lưu thông tin người dùng (ban đầu là null)
export const userAtom = atomWithStorage<IUser | null>('user', null)
