import React from 'react'
import { useState, useRef } from 'react';
import {LogOutIcon, VolumeOffIcon, Volume2Icon, Loader} from 'lucide-react'
import { useAuthStore } from '../store/AuthStore.js';
import { ChatStore } from '../store/ChatStore.js';
import avatar from "../assets/avatar.png";
import mouse from '../assets/mouse-click.mp3'
import { LoaderIcon } from 'lucide-react';

const mouseClickSound = new Audio(mouse);

function ProfileHeader() {
  const {logout, authUser , updateProfile, isUpdatingProfile} = useAuthStore();
  const{isSoundEnabled, toggleSound} = ChatStore();
  const [selectedImg, setSelectedImg] = useState(null) ;

  const fileInputRef = useRef(null) ;
  

  const handleImageUpload = (e)=>{
         const file = e.target.files[0];
         if(!file) return ;

         const reader = new FileReader();
         reader.readAsDataURL(file);

         reader.onloadend = async()=>{
          const base64Image = reader.result ;
          setSelectedImg(base64Image)
           await updateProfile({profilePic : base64Image})
         }
  }
  return (
    <>
    <div className='p-6 border-b border-slate-700'>
         <div className="flex items-center justify-center">
          <div className='flex items-center gap-3'>
                 {/* Avatar */}
                 <div className="">        {/* this all is coming from the daisy UI. */}
                    <button className='size-14 rounded-full  relative group avatar-online'
                    onClick={()=> {fileInputRef.current.click()}}
                    >
                    <img src={selectedImg || authUser.profilePic || avatar} alt='user image'
                    className='size-full object-cover '
                    /> 
                      <div className='absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100
                      flex items-center justify-center transition-opacity'>

                         {isUpdatingProfile ? (<LoaderIcon className='size-7 animate-spin'/>) : (<span className='text-white test-xs'>Change</span>)}
                      </div>
      
                    </button>
                    <input type="file" 
                    accept='image/*'
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    className='hidden'
                    />
                 </div>
                 {/* username and online text */}
                 <div>
                      <h3 className='text-slate-200 font-medium text-base max-w-[180px] truncate'>
                      {authUser.fullName}         
                         </h3>
                         <p className='text-slate-400 text-xs'>Online</p>
                 </div>
          </div>
          {/* Buttons */}
          <div className='flex gap-4 items-center'>
            {/* Logout btn */}
            <button
            className='text-slate-400 hover:text-slate-200 transition-colors'
            onClick={logout}
            >
            <LogOutIcon className='size-5'/>
            </button>
            {/* SOUND TOGGLE BTN */}
            <button
            className='text-slate-400 hover:text-slate-200 transition-colors'
            onClick={()=>{
              mouseClickSound.currentTime = 0 ;
              mouseClickSound.play().catch((error)=> console.log("Audio play failed", error));
              toggleSound();
            }}
            >

            {isSoundEnabled ? (
              <Volume2Icon className='size-5' />
            ) : (
              <VolumeOffIcon className='size-5'/>
            )}
            </button>
          </div>
         </div>
    </div>
    </>
  )
}

export default ProfileHeader