import React from 'react'
import { CookiesProvider } from 'react-cookie'

interface Props {
  children: React.ReactNode
}

export const AppProvider = ({ children }: Props) => {
  return <CookiesProvider defaultSetOptions={{ path: '/' }}>{children}</CookiesProvider>
}
