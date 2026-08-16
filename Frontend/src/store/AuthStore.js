import {create} from 'zustand' 

export const useAuthStore = create((set)=>({
AuthUser : {name:"abcd", age : "12", _id:"48303933"},
isLoggedIn : false ,

login : ()=>{
    console.log("Hello you are logged in");
    set({isLoggedIn : true})
}
}))

