import React, { useEffect, useRef } from 'react'
import { useAuthStore } from '../store/AuthStore'
import { ChatStore } from '../store/ChatStore'
import ChatHeader from './ChatHeader';
import NoChatHistory from './NoChatHistory';
import MessageInput from './MessageInput';
import MessagesLoadingSkeleton from './MessageLoadingSkeleton';

function ChatContainer() {
  const {selectedUser, setSelectedUser, messages , getMessagesByUserId, isMessagesLoading} = ChatStore();
  const {authUser} = useAuthStore();
  const messageEndRef = useRef(null);
  
  
  useEffect(()=>{
   getMessagesByUserId(selectedUser._id);
  },[getMessagesByUserId, selectedUser])

useEffect(()=> {
  if(messageEndRef.current){
    messageEndRef.current.scrollIntoView({behavior : "smooth"})
  }
}, [messages])

  return (
    <>
    <ChatHeader/>
    <div className='flex-1 px-6 overflow-y-auto py-8 max-h-115'>
      
       {messages.length > 0 ? (
        <div className='max-w-3xl mx-auto space-y-6'>
          {messages.map((msg)=>(
            <div
            key={msg._id}
            className={`chat ${msg.senderId === authUser._id ? "chat-end" : "chat-start"}`}
            >
              
              <div className={
                `chat-bubble ${
                  msg.senderId === authUser._id 
                  ? "bg-cyan-600 text-white"
                  : "bg-slate-800 text-slate-200"
                }` 
              }>
                
                {msg.image && (
                  <img src={msg.image} alt='shared' className='rounded-lg h-48 object-cover'/>
                )}
                {msg.text && <p className='mt-2'>{msg.text}</p> }
                <p className='text-xs mt-1 opacity-75 flex items-center gap-1'> 
                  {new Date(msg.createdAt).toLocaleTimeString(undefined, {
                    hour : "2-digit",
                    minute : "2-digit"
                  })}
                </p>
              </div>
            </div>
          ))}
          <div ref={messageEndRef}/>
        </div>
       ) : isMessagesLoading ? (<MessagesLoadingSkeleton/>) : (<NoChatHistory  name = {selectedUser.fullName}/>)}
    </div>
    <MessageInput/>
    </>
  )
}

export default ChatContainer