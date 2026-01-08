import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import PocketCFO from './App.jsx'
import { Analytics } from '@vercel/analytics/react'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PocketCFO />
    <Analytics />
  </StrictMode>,
)
