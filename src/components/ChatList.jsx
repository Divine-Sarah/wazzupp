import React,{useEffect, useState, useMemo} from 'react'
import { RiMore2Fill } from 'react-icons/ri'
import SearchModal from './SearchModal'
import { formatTimestamp } from '../utils/formatTimeStamp'
// import chatData from '../data/chat'
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db} from "../firebase/config";
import {  listenForChats} from "../firebase/config";
import defaultAvatar from "../assets/avatar.jpg"

const ChatList = ({ setSelectedUser }) => {
   const [chats, setChats] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userDocRef = doc(db, "users", auth?.currentUser?.uid);
        const unsubscribe = onSnapshot(userDocRef, (doc) => {
            setUser(doc.data());
        });
        return unsubscribe;
    }, []);

    console.log(user?.fullName);

    useEffect(() => {
      const unsubscribe = listenForChats(setChats);
      return () => {
        unsubscribe();
      };
}, []);




    const sortedChats = useMemo(() => {
        return [...chats].sort((a, b) => {
            const aTimestamp = a?.lastMessageTimestamp?.seconds + a?.lastMessageTimestamp?.nanoseconds / 1e9;
            const bTimestamp = b?.lastMessageTimestamp?.seconds + b?.lastMessageTimestamp?.nanoseconds / 1e9;

            return bTimestamp - aTimestamp;
        });
    }, [chats]);

     const startChat = (user) => {
        setSelectedUser(user);
        // alert("chast started")
    };

  return (
    <section className='relative hidden lg:flex flex-col items-start justify-start bg-white h-[100vh] w-[100%] md:w-[600px]'>
      <header className='flex items-center justify-between lg:border-b border-b-1 border-[#898989b9] p-4 w-[100%] sticky md:static top-0 z-[100]'>
        <main className='flex items-center gap-3'>
            <img src={user?.image || defaultAvatar} className="w-[44px] h-[44px] object-cover rounded-full" alt="" />
          <span>
<h3 className="p-0 font-semibold text-[#2A3D39] md:text-[17px]">{user?.fullName || "WazzUpp user"}</h3>
                        <p className="p-0 font-light text-[#2A3D39] text-[15px]">@{user?.username || "wazzupp"}</p>
          </span>
        </main>
        <button  className='bg-[#023E8A] w-[35px] h-[35px] p-2 flex items-center justify-center rounded-lg'>
          <RiMore2Fill color='#fff' className='w-[28px] h-[28px]'/>
        </button>
      </header>
      <div className='w-[100%] mt-[10px] px-5'>
        <header className="flex items-center justify-between">
                    <h3 className="text-[16px]">Messages ({chats?.length || 0})</h3>
                    <SearchModal startChat={startChat} />
                </header>
      </div>

                 

        <main className="flex flex-col items-start mt-[1.5rem] pb-3 custom-scrollbar w-[100%] h-[100%]">
                {sortedChats?.map((chat) => (
                    <button key={chat?.id} className="flex items-start justify-between w-[100%] border-b border-[#9090902c] px-5 pb-3 pt-3">
                        {chat?.users
                            ?.filter((user) => user?.email !== auth?.currentUser?.email)
                            ?.map((user) => (
                                <>
                                    <div className="flex items-start gap-3" onClick={() => startChat(user)}>
                                        <img src={user?.image || defaultAvatar} className="h-[40px] w-[40px] rounded-full object-cover" alt="" />
                                        <span>
                                            <h2 className="p-0 font-semibold text-[#2A3d39] text-left text-[17px]">{user?.fullName || "ChatFrik User"}</h2>
                                            <p className="p-0 font-light text-[#2A3d39] text-left text-[14px]">{chat?.lastMessage}</p>
                                        </span>
                                    </div>
                                    <p className="p-0 font-regular text-gray-400 text-left text-[11px]">{formatTimestamp(chat?.lastMessageTimestamp)}</p>
                                </>
                            ))}
                    </button>
                ))}
            </main>


    </section>
  )
}

export default ChatList