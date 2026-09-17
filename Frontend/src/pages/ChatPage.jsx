import ActiveTabSwitch from "../components/ActiveTabSwitch.jsx";
import ChatContainer from "../components/ChatContainer.jsx";
import ChatsList from "../components/ChatsList.jsx";
import ContactsList from "../components/ContactsList.jsx";
import NoChatPlaceholder from "../components/NoChatPlaceholder.jsx";
import ProfileHeader from "../components/ProfileHeader.jsx";
import PageLoader from '../components/PageLoader.jsx'
import { useAuthStore } from "../store/AuthStore.js"
import { ChatStore } from "../store/ChatStore.js";

function ChatPage() {
const {logout} = useAuthStore();
  const {activeTab, selectedUser} = ChatStore();

  return (
    <>
       <div className="relative w-full max-w-6xl h-[635px] flex bg-black">
        {/* LEFT SIDE */}
        <div className="w-80 bg-slate-800/50 backdrop-blur-sm flex flex-col">
        <ProfileHeader />
        <ActiveTabSwitch />
           <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {activeTab === "chats" ? <ChatsList/> : <ContactsList/>}
           </div>
           
        </div>
        {/* RIGHT SIDE  */}
        <div className="flex-1 flex flex-col bg-slate-900/50 backdrop-blur-sm">
        {selectedUser ? <ChatContainer/> : <NoChatPlaceholder/>}
        </div>
       </div>
    </>
  )
}

export default ChatPage