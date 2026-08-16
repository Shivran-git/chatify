import {Route, Routes} from 'react-router'
import './App.css'
import ChatPage from './pages/ChatPage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import { useAuthStore } from './store/AuthStore.js'
function App() {

 const {AuthUser, isLoggedIn, login } = useAuthStore();
 console.log(AuthUser);
 console.log(isLoggedIn);



  return (
    <div className='min-h-screen bg-black realtive flex items-center justify-center p-4 overflow-hidden'>

<button className='btn' onClick={login}>LOGIN</button>
    
    <Routes>
      <Route path="/" element = {<ChatPage />} />
      <Route path="/signup" element = {<SignUpPage/>} />
      <Route path = "login" element = {<LoginPage/>} />
      
    </Routes>
    </div>
  )
}

export default App
