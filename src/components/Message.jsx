import React from 'react'

function Message({}) {
  return (
     <div className="flex-1 flex flex-col overflow-y-auto p-4 space-y-4">
          {/* Example message bubbles */}
          <div>
          <span className="self-start bg-[#FFCFCF] px-4 py-2 rounded-4xl max-w-xs">
            Hello! 👋
          </span>
          </div>
          <div className="self-end bg-[#92AAFF] rounded-4xl text-white px-4 py-2  max-w-xs flex">
            Hey! How are you?
          </div>
          {/* Repeat more messages here... */}
        </div>
  )
}

export default Message