// import React from 'react'
// import { MdMoreVert, MdOutlineSearch,MdSend } from "react-icons/md";
// import { FaPaperPlane } from "react-icons/fa6";
// import Message from './Message'


// function ChatBox({ users, onSelectUser }) {
//   return (
//     <div className='bg-[#FFFFFF] rounded-t-4xl h-full px-10 py-6 flex flex-col flex-1'>

//       <div className='flex justify-between items-center'>
//       <MdOutlineSearch className='w-9 h-9'/>
//       <span className='font-light text-2xl'>Sarah</span>
//       <MdMoreVert className='w-10 h-10'/>
//       </div>

//     <div className="flex-1 overflow-y-auto p-4 space-y-4">
//         <Message/>
//       </div>

//         <div className="md:min-w-[832px] w-full flex items-center gap-3">
//         <input
//           type="text"
//           placeholder="Type here.."
//           className="flex-1 px-4 h-[59px] border outline-none rounded-full"
//         />
//         <button
    
//           className="border w-[59px] h-[59px] px-4  rounded-full hover:bg-blue-200 transition"
//         >
//           <MdSend className='w-[29px] h-[29px]'/>
//         </button>
//       </div>



//     </div>
//   )
  
  
// };


// export default ChatBox


import React, { useEffect, useMemo, useRef, useState } from "react";
import defaultAvatar from "../assets/avatar.jpg";
import { formatTimestamp } from "../utils/formatTimeStamp";
import { RiSendPlaneFill } from "react-icons/ri";
import {FaPaperclip} from "react-icons/fa"
// import { messageData } from "../data/messageData";
import { auth, listenForMessages, sendMessage } from "../firebase/config";


const Chatbox = ({ selectedUser }) => {
    const [messages, setMessages] = useState([]);
    const [messageText, sendMessageText] = useState("");
    const scrollRef = useRef(null);

    const chatId = auth?.currentUser?.uid < selectedUser?.uid ? `${auth?.currentUser?.uid}-${selectedUser?.uid}` : `${selectedUser?.uid}-${auth?.currentUser?.uid}`;
    const user1 = auth?.currentUser;
    const user2 = selectedUser;
    const senderEmail = auth?.currentUser?.email;

    console.log(typeof chatId);
    console.log(user1);
    console.log(user2);

    useEffect(() => {
        listenForMessages(chatId, setMessages);
    }, [chatId]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const sortedMessages = useMemo(() => {
        return [...messages].sort((a, b) => {
            const aTimestamp = a?.timestamp?.seconds + a?.timestamp?.nanoseconds / 1e9;
            const bTimestamp = b?.timestamp?.seconds + b?.timestamp?.nanoseconds / 1e9;

            return aTimestamp - bTimestamp;
        });
    }, [messages]);

    const handleImageChange = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    const base64 = reader.result;

    const newMessage = {
      sender: senderEmail,
      image: base64,
      timestamp: {
        seconds: Math.floor(Date.now() / 1000),
        nanoseconds: 0,
      },
    };

    sendMessage(base64, chatId, user1?.uid, user2?.uid, "image"); // 👈 "image" type
    setMessages((prev) => [...prev, newMessage]);
  };
  reader.onerror = (error) => console.error("File error:", error);
};


    const handleSendMessage = (e) => {
        e.preventDefault();
        const newMessage = {
            sender: senderEmail,
            text: messageText,
            timestamp: {
                seconds: Math.floor(Date.now() / 1000),
                nanoseconds: 0,
            },
        };

        sendMessage(messageText, chatId, user1?.uid, user2?.uid);
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        sendMessageText("");
    };
    return (
        <>
            {selectedUser ? (
                <section className="flex flex-col items-start justify-start h-screen w-[100%] bg-[#b5e2ff]">
                    <header className="w-[100%] h-[82px] m:h-fit p-4 bg-white">
                        <main className="flex items-center gap-3">
                            <span>
                                <img src={selectedUser?.image || defaultAvatar} className="w-11 h-11 object-cover rounded-full" alt="" />
                            </span>
                            <span>
                                <h3 className="font-semibold text-[#2A3D39] text-lg">{selectedUser?.fullName || "WazzUpp User"}</h3>
                                <p className="font-light text-[#2A3D39] text-sm">@{selectedUser?.username || "wazzUpp"}</p>
                            </span>
                        </main>
                    </header>

                    <main className="custom-scrollbar relative h-[100vh] w-[100%] flex flex-col justify-between">
                        <section className="px-3 pt-5 b-20 lg:pb-10">
                            <div ref={scrollRef} className="overflow-auto h-[80vh]">
                                {sortedMessages?.map((msg, index) => (
                                    <>
                                        {msg?.sender === senderEmail ? (
                                            <div className="flex flex-col items-end w-full">
                                                <span className="flex gap-3 me-10 h-auto">
                                                    <div>
                                                        <div className="flex items-center bg-[#92AAFF] text-wrap rounded-lg px-4 py-2 shadow-sm">
          {msg?.type === "image" ? (
  <img src={msg.content} alt="sent" className="w-[150px] h-auto rounded-lg" />
) : (
  <h4>{msg.content || msg.text}</h4> // fallback to msg.text for older messages
)}


        </div>
                                                        <p className="text-gray-400 text-sx mt-3 text-right">{formatTimestamp(msg?.timestamp)}</p>
                                                    </div>
                                                </span>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-start w-full">
                                                <span className="flex gap-3 w-[40%] h-auto ms-10">
                                                    <img src={defaultAvatar} className="h-11 w-11 object-cover rounded-full" alt="" />
                                                    <div>
                                                         <div className="flex items-center bg-[#FFCFCF] px-4 py-2  rounded-lg shadow-sm">
         {msg?.type === "image" ? (
  <img src={msg.content} alt="sent" className="w-[150px] h-auto rounded-lg" />
) : (
  <h4>{msg.content || msg.text}</h4> // fallback to msg.text for older messages
)}




        </div>
                                                        <p className="text-gray-400 text-sx mt-3">{formatTimestamp(msg?.timestamp)}</p>
                                                    </div>
                                                </span>
                                            </div>
                                        )}
                                    </>
                                ))}
                            </div>
                        </section>
                        <div className="sticky lg:bottom-0 bottom-[60px] p-3 h-fit w-[100%]">
                            <form onSubmit={handleSendMessage} action="" className="flex items-center bg-white h-[45px] w-[100%] px-2 rounded-lg relative shadow-lg">
                                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="image-upload"
                //   disabled={isSending}
                 title="Upload image"
                />
                <label
                  htmlFor="image-upload"
                  className="p-2 cursor-pointer hover:bg-gray-200 rounded-full"
                >
                  <FaPaperclip color="#023E8A" />
                </label>
                                <input value={messageText} onChange={(e) => sendMessageText(e.target.value)} className="h-full text-[#2A3D39] outline-none text-[16px] pl-3 pr-[50px] rounded-lg w-[100%]" type="text" placeholder="Write your message..." />
                                <button type="submit" className="flex items-center justify-center absolute right-3 p-2 rounded-full bg-[#D9f2ed] hover:bg-[#c8eae3]">
                                    <RiSendPlaneFill color="#023E8A" />
                                </button>
                            </form>
                        </div>
                    </main>
                </section>
            ) : (
                <section className="h-screen w-[100%] bg-[#b5e2ff]">
                    <div className="flex flex-col justify-center items-center h-[100vh]">
                       
                        <h1 className="text-[30px] font-bold text-[#023E8A] mt-5">Welcome to WazzUpp</h1>
                        <p className="">Connect and chat with friends easily, securely, fast and free</p>
                    </div>
                </section>
            )}
        </>
    );
};

export default Chatbox;