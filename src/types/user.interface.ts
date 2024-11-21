export interface IUser {
  fullname: string
  id: number | undefined
  password: string
  role: string
  username: string
}

export interface ITodo {
  item: string
  checked: boolean
}
