import axios from 'axios'
import { API_URL } from '../config/constant'

export const api = axios.create({
  withCredentials: true,
  baseURL: API_URL
})
