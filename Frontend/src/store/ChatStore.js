import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from 'react-hot-toast';
import { useAuthStore } from "./AuthStore";
import notification from '../assets/discord.mp3'
const sound = new Audio(notification);
export const ChatStore = create((set, get)=>({
    allContacts : [],
    chats : [],
    messages : [],
    activeTab : "chats",
    selectedUser : null,
    isUsersLoading : false ,
    isMessagesLoading : false,
    isSoundEnabled : JSON.parse(localStorage.getItem("isSoundEnabled")) === true ,

    toggleSound : ()=>{
     localStorage.setItem("isSoundEnabled", !get().isSoundEnabled);
     set({isSoundEnabled : !get().isSoundEnabled});
    },

    setActiveTab : (tab)=>{
        set({
            activeTab : tab
        })
    },
    setSelectedUser : (user)=>{
        set({
            selectedUser : user
        })
    }
,
    getAllContacts : async ()=>{
        set({isUsersLoading : true})
        try{
             const res = await axiosInstance.get('/messages/contacts');
            set({allContacts : res.data.message})
        }catch(error){
toast.error(error.response.data.message);
        }finally{
            set({isUsersLoading : false})
        }

    },

    getChatPartners : async()=>{
         set({isUsersLoading : true})
        try{
             const res = await axiosInstance.get('/messages/chats');
            set({chats : res.data})
        }catch(error){
toast.error(error.response.data.message);
        }finally{
            set({isUsersLoading : false})
        }
    },

    getMessagesByUserId : async (userId)=>{
        set({isMessagesLoading : true});
        try{
            const res = await axiosInstance.get(`/messages/${userId}`)
            set({messages : res.data})
        }catch(error){
          toast.error(error.response?.data?.message || "Something went wrong .")
        }finally{
            set({isMessagesLoading : false}) ;
        }
    },

    sendMessage : async(messageData)=>{
        const {selectedUser, messages} = get();
        const {authUser} = useAuthStore.getState();

        const tempId = `temp-${Date.now()}`;

        const optimisticMessage = {
            _id : tempId,
            senderId : authUser._id,
            receiverId : selectedUser._id,
            text : messageData.text,
            image : messageData.image,
            createdAt : new Date().toISOString(),
            isOptimistic : true
        };
        // we are immediately updating the ui here .
        set({messages : [...messages, optimisticMessage]}) ;

        try{
            const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
  await  set({messages : messages.concat(res.data.message)})
        }catch(error){
            set({messages : messages })
            console.log(error)
            toast.error(error?.response?.data?.message || "Something went wrong")
        }
    },

    subscribeToMessages : ()=>{
      const {selectedUser} = get();
      if(!selectedUser) return ;

      const socket = useAuthStore.getState().socket ;
      socket.on("newMessage", (newMessage)=>{
        const isMessageFromSelectedUser = selectedUser._id === newMessage.senderId ;
        if(!isMessageFromSelectedUser) return ;
             const currentMessages = get().messages ;

             set({messages : [...currentMessages, newMessage]}) ;
              if(get().isSoundEnabled){
            sound.currentTime = 0 ;
            sound.play().catch((e)=> console.log("audio play failed", e))
        }
      })
        
        }
    ,

    unsubscribeFromMessages : () =>{
        const socket = useAuthStore.getState().socket ;
        socket.off("newMessage")
    }
}))