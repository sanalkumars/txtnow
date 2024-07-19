import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AuthPage from './pages/Auth'
import ChatPage from './pages/Chat'
import ProfilePage from './pages/Profile'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/auth' element={ <AuthPage /> } />
        <Route path='*' element={<Navigate to={'/auth'} />} />
        <Route path='/chat' element={ <ChatPage /> } />
        <Route path='/profile' element={ <ProfilePage /> } />
      </Routes>
    </BrowserRouter>
  )
}

export default App