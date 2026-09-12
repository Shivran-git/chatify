import React, { useEffect } from 'react'
import { ChatStore } from '../store/ChatStore.js'
import UserLoadingSkeleton from './UserLoadingSkeleton';
import avatar from '../assets/avatar.png'
import NoContactsFound from './NoContactsFound';
function ContactsList() {
  const {getAllContacts, allContacts, isUsersLoading, setSelectedUser} = ChatStore();

  useEffect(()=>{
    getAllContacts();
  }, [getAllContacts])

console.log(allContacts)
if(isUsersLoading) return <UserLoadingSkeleton/>
if(allContacts.length === 0) return <NoContactsFound/>
console.log(allContacts)

  return (
    <>
    
    {allContacts.map((contact)=>(
        <div
        key={contact._id}
        className="bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors"
        onClick={()=> setSelectedUser(contact)}
        >
        <div className='flex items-center gap-3'>
          <div className={`avatar avatar-online `}>
            <div className='size-12 rounded-full '>
              <img src={contact.profilePic || avatar} alt={contact.fullName}/>
            </div>
          </div>
          <h4 className='text-slate-200 font-medium truncate'>{contact.fullName}</h4>
        </div>
        </div>
    ))}
    </>
  )
}

export default ContactsList 