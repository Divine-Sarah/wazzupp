import React from 'react'
import { MdMoreVert, MdOutlineSearch,MdSend } from "react-icons/md";
import { FaPaperPlane } from "react-icons/fa6";
import Message from './Message'


function ChatBox({ users, onSelectUser }) {
  return (
    <div className='bg-[#FFFFFF] rounded-t-4xl h-full px-10 py-6 flex flex-col flex-1'>

      <div className='flex justify-between items-center'>
      <MdOutlineSearch className='w-9 h-9'/>
      <span className='font-light text-2xl'>Sarah</span>
      <MdMoreVert className='w-10 h-10'/>
      </div>

    <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <Message/>
      </div>

        <div className="md:min-w-[832px] w-full flex items-center gap-3">
        <input
          type="text"
          placeholder="Type here.."
          className="flex-1 px-4 h-[59px] border outline-none rounded-full"
        />
        <button
    
          className="border w-[59px] h-[59px] px-4  rounded-full hover:bg-blue-200 transition"
        >
          <MdSend className='w-[29px] h-[29px]'/>
        </button>
      </div>



    </div>
  )
  
  
};


export default ChatBox