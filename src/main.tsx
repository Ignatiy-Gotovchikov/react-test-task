import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { MatrixProvider } from './context/MatrixContext.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MatrixProvider>
      <App />
    </MatrixProvider>
  </StrictMode>,
)
