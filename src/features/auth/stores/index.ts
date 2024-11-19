import { atom } from 'jotai'
import { IUser } from '../../../types/user.interface'

// Atom lưu thông tin người dùng (ban đầu là null)
export const userAtom = atom<IUser | null>(null)
