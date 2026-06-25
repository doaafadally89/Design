import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './src/index.css'
import Opportunities from './src/OpportunitiesPreview.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Opportunities />
  </StrictMode>,
)
