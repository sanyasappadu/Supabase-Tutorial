import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { UserProvider } from './UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>
)
// jkQ2C3xkGS9KCJWz
// REACT_APP_SUPABASE_URL=https://pnmocexxrdhgkogclgao.supabase.co
// REACT_APP_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBubW9jZXh4cmRoZ2tvZ2NsZ2FvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAzNTg4NzQsImV4cCI6MjA0NTkzNDg3NH0.nVoWQpvgv-3Z6fBwKjXTYVPZmBIz_DIrqT5wi3Koq9k