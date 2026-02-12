import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Admin from './Admin.jsx'

// Simple path-based routing
const isAdminPath = window.location.pathname === '/admin' || window.location.pathname === '/admin.html';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {isAdminPath ? <Admin /> : <App />}
  </StrictMode>,
)

