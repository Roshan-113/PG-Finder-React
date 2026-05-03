import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/globals.css'
import './styles/dashboard.css'
import './styles/auth.css'
import './styles/admin.css'
import './styles/owner.css'
import './styles/tenant.css'
import './styles/public.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
