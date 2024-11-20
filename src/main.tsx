import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AppProvider } from './components/AppProvider'
import './index.css'
import { Router } from './routes/index'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <AppProvider>
      <Router />
    </AppProvider>
  </BrowserRouter>
)
