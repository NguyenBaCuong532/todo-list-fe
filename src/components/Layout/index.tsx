import { ReactNode } from 'react'
import Header from '../Header'
import Footer from '../Footer'

interface LayoutProps {
  children: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  console.log(123)
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  )
}

export default Layout