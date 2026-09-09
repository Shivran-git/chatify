import {create} from 'zustand' 
import { axiosInstance } from '../lib/axios.js'
import toast from 'react-hot-toast';

export const useAuthStore = create((set)=>({
authUser : null,
isCheckingAuth : true ,
isSigningUp: false ,
isLoggingIn : false ,

checkAuth : async ()=>{
    try{
       const res = await axiosInstance.get("/auth/check");
       set({
        authUser : res.data 
       })
    }catch(error){
      console.log("authorization failed  ", error );
      set({authUser : null});
    }finally{
        set({isCheckingAuth : false})
    }
},

signup : async (data)=>{
    set({isSigningUp : true})
    console.log(data);
try{
   const res = await axiosInstance.post("/auth/signup", data);
   set({authUser : res.data});
   toast.success("signed up successfully .")
}catch(error){

toast.error(error.response.data.message)

}finally{
    set({isSigningUp : false})
}

},


login : async(data)=>{
  set({isLoggingIn : true});
  console.log(data);
  try{
       const res = await axiosInstance.post('/auth/login' ,data);
       set({authUser : res.data});
       toast.success("LOGGED IN SUCCESSFULLY");
  }catch(error){
      toast.error(error.response.data.message);
  }finally{
    set({isLoggingIn : false})
  }
},

logout : async()=>{
    try{
     const res = await axiosInstance.post("/auth/logout");
     toast.success(res.data.message);
     set({authUser : null})
    }catch(error){
toast.error(error.response.data.message);
    }
}


}))

