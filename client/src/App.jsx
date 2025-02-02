import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AuthPage from './pages/Auth'
import ChatPage from './pages/Chat'
import ProfilePage from './pages/Profile'
import { useAppStore } from './store';



// const AuthRoute = ({ children }) => {
//   const {userInfo} =useAppStore();
//   const isAuthenticated = !!userInfo;
//   return isAuthenticated ? children : <Navigate to="/auth" />
// }
// const PrivateRoute = ({ children }) => {
//   const {userInfo} =useAppStore();
//   const isAuthenticated = !!userInfo;
//   return isAuthenticated ? <Navigate to="/chat" /> : children;
// }
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/auth' element={
          
            <AuthPage />
         
        } />
        <Route path='/chat' element={
          
          <ChatPage />
        
      } />
        <Route path='/profile' element={ <ProfilePage /> } />
        <Route path='*' element={<Navigate to={'/auth'} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App