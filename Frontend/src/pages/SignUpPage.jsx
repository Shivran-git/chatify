import { useEffect } from "react";
import { useAuthStore } from "../store/AuthStore.js"
import { useState } from "react";
import { LoaderIcon } from "react-hot-toast";
import { Link } from "react-router";


function SignUpPage() {
const [formData, setFormData] = useState({fullName : "", email : "", password : ""});
const {signup, isSigningUp, authUser} = useAuthStore();

function handleSubmit(e){
  e.preventDefault();
  signup(formData);
}

  return (
    <>
      <div className="w-full flex items-center justify-center p-4 bg-amber-400">
        <div className="relative w-full max-w-6xl md:h-[800px] h-[650px]">
             
             <div className="w-full flex flex-col md:flex-row md:h-[800px] h-[650px]">
              {/* now here comes left side column */}

              <div className="md:w-1/2 p-8 flex items-center justify-center md:border-r border-slate-600/30">
              <div className="w-full max-w-md">
                {/* heading text is here  */}
                <div className="text-center mb-8">
                  <div>An icon comes here .</div>
                  <h2 className="text-2xl font-bold text-slate-200 mb-2">Create Account</h2>
                  <p className="text-slate-400"> Signup for a new account .</p>
                </div>
                {/* FORM  */}
                <form onSubmit = {handleSubmit} className=" space-y-6 ">

                  {/* FULL NAME  */}
                  <div>
                    <label className="auth-input-label">Full Name</label>
                    <div>
                      <input type="text" 
                      value={formData.fullName}
                      onChange={(e)=>setFormData({...formData, fullName : e.target.value})}
                      className="input"
                      placeholder="Shivran"
                      />
                    </div>
                  </div>
                     
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

                   <button className="auth-btn flex items-center justify-center" type="submit" disabled={isSigningUp}>
                    {isSigningUp ? (<LoaderIcon className='size-10 animate-spin'/>) : ("Sign Up" )}
                   </button>

                </form>

                   <div className="mt-6 text-center">
                  <Link to="/login" className="auth/link">
                  Already have an account ?
                  </Link>
                </div>
              </div>
              
              </div>
               {/* RIGHT SIDE COLUMN  */}
              <div className="hidden md:w-1/2 md:flex items-center justify-center p-6 bg-gradient-to-bl from-slate-800/20 to-transparent">
              <div>
                <img 
                src="/wallpaper.png"
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

export default SignUpPage