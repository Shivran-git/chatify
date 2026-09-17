import { useState } from "react";
import { useAuthStore } from "../store/AuthStore.js"
import { Link } from "react-router";
import { LoaderIcon } from "react-hot-toast";


function LoginPage() {
  const [formData, setFormData] = useState({email : "", password : ""}) ;
  const {login, isLoggingIn} = useAuthStore();

  function handleSubmit(e){
    e.preventDefault();
    login(formData);
  }
  return (
      <>
        <div className="w-full flex items-center justify-center p-4 bg-black">
          <div className="relative w-full max-w-6xl md:h-[800px] h-[650px]">
               
               <div className="w-full flex flex-col md:flex-row md:h-[800px] h-[650px]">
                {/* now here comes left side column */}
  
                <div className="md:w-1/2 p-8 flex items-center justify-center md:border-r border-slate-600/30">
                <div className="w-full max-w-md">
                  {/* heading text is here  */}
                  <div className="text-center mb-8">
                    
                    <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
                    <p className="text-white">Login to reply your loved ones !</p>
                  </div>
                  {/* FORM  */}
                  <form onSubmit = {handleSubmit} className=" space-y-6 ">
  
                    {/* FULL NAME  */}
                    
                       
                      {/* Email here */}
                        <div>
                      <label className="auth-input-label">Email</label>
                      <div>
                        <input type="email" 
                        value={formData.email}
                        onChange={(e)=>setFormData({...formData, email : e.target.value})}
                        className="input"
                        placeholder="abx@gmail.com"
                        />
                      </div>
                    </div>
    
  
    {/* password here */}
  
                     <div>
                      <label className="auth-input-label">Password</label>
                      <div>
                        <input type="password" 
                        value={formData.password}
                        onChange={(e)=>setFormData({...formData, password : e.target.value})}
                        className="input"
                        placeholder=":)"
                        />
                      </div>
                    </div>
  
  
                     {/* SUBMIT BUTTON */}
  
                     <button className="auth-btn flex items-center justify-center" type="submit" disabled={isLoggingIn}>
                      {isLoggingIn ? (<LoaderIcon className='size-10 animate-bounce'/>) : ("Login" )}
                     </button>
  
                  </form>
  
                     <div className="mt-6 text-center text-white">
                    <Link to="/signup" className="auth/link">
                    Don't have an account ? Sign Up 
                    </Link>
                  </div>
                </div>
                
                </div>
                 {/* RIGHT SIDE COLUMN  */}
                <div className="hidden md:w-1/2 md:flex items-center justify-center p-6 bg-gradient-to-bl from-slate-800/20 to-transparent">
                <div>
                  <img 
                  src="/login.jpg"
                  alt="for mobile devices"
                  className="w-full  object-contain md:h-[800px] h-[650px]"
                  />
                </div>
                </div>
  
               </div>
          </div>
        </div>
      </>
    )
}

export default LoginPage