import {Route, Routes} from 'react-router'
import './App.css'
import { Navigate } from 'react-router'
import ChatPage from './pages/ChatPage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import { useAuthStore } from './store/AuthStore.js'
import { useEffect } from 'react'
import PageLoader from './components/PageLoader.jsx'
import {Toaster} from 'react-hot-toast'


function App() {

const {checkAuth, isCheckingAuth, authUser} = useAuthStore();

useEffect( ()=>{
  async function auth(){
 console.log("hello")
  await checkAuth();
   console.log(authUser)
  }
 auth();
}, [checkAuth])

if(isCheckingAuth) return <PageLoader/>

  return (
    <div className='min-h-screen bg-black realtive flex items-center justify-center p-4 overflow-hidden'>

    <Routes>
      <Route path="/" element = {authUser ? <ChatPage/> : <Navigate to ={"/login"}/>} />
      <Route path="/signup" element = {!authUser ? <SignUpPage/> : <Navigate to = {"/"}/>} />
      <Route path = "login" element = {!authUser ? <LoginPage/> : <Navigate to={"/"}/>} />

    </Routes>
    <Toaster/>
    </div>
  )
}

export default App
