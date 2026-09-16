import {create} from 'zustand' 
import { axiosInstance } from '../lib/axios.js'
import toast from 'react-hot-toast';
import { ChatStore } from './ChatStore.js';
import {io} from 'socket.io-client'

const   BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : "/" ;

export const useAuthStore = create((set, get)=>({
authUser : null,
isCheckingAuth : true ,
isSigningUp: false ,
isLoggingIn : false ,
isUpdatingProfile : false ,
socket : null,
onlineUsers : [],

checkAuth : async ()=>{
    try{
       const res = await axiosInstance.get("/auth/check");
        
       set({
        authUser : res.data 
       });
       get().connectSocket() ;
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
    get().connectSocket() ;
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
       get().connectSocket() ;
  }catch(error){
      console.log(error) ;
  }finally{
    set({isLoggingIn : false})
  }
},

logout : async()=>{
     const {selectedUser} = ChatStore.getState();
    try{
     const res = await axiosInstance.post("/auth/logout");
     toast.success(res.data.message);
     get().disconnectSocket();
     set({authUser : null})
     set({selectedUser : null})

    }catch(error){
toast.error(error.response.data.message);
    }
},

updateProfile : async (data)=> {
    try{
        set({isUpdatingProfile : true}) ;
        const res = await axiosInstance.put("/auth/update", data)
        set({authUser:res.data})
        toast.success("Profile updated successfully");

    }catch(error){
              console.log("error in updating the profile", error);
              toast.error(error.data.message);
    }finally{
        set({isUpdatingProfile : false})
    }
},

connectSocket : ()=>{
    const {authUser} = get();
    if(!authUser || get().socket?.connected) return ;

    const socket = io(BASE_URL, {
        withCredentials : true
    })
socket.connect();
  set({socket : socket})

  // listen for online users event . 

  socket.on("getOnlineUsers", (userIds)=>{
    set({onlineUsers : userIds})
  })
},

disconnectSocket : ()=>{
   if(get().socket?.connected) get().socket.disconnect() ;
}

}))

