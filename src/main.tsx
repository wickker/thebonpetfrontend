import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '@/App.tsx'
import { Toast } from '@/components/commons'
import ToastProvider from '@/contexts/useToastContext'
import '@/index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastProvider>
      <App />
      <Toast />
    </ToastProvider>
  </StrictMode>
)
