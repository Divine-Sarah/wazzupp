import React from 'react'
import { RiChatAiLine } from 'react-icons/ri'
import { MdLogout } from "react-icons/md";
import { signOut } from 'firebase/auth'
import {auth} from '../firebase/config'

const NavLinks = () => {
  const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.log(error);
        }
    };
  return (
    <section className='sticky lg:static top-0 flex items-center lg:items-start lg:justify-start h-[7vh] lg:h-[100vh] w-[100%] lg:w-[150px] py-8 lg:py-0 bg-[#023E8A]'>
      <main className='flex lg:flex-col items-center lg:gap-10 justify-between lg:px-0 w-[100%]'>
        <div className='flex items-start justify-center lg:border-b border-b-1 border-[#ffffffb9] p-4 lg:w-[100%]'>
          <span className='alex-brush text-[36px] flex items-center justify-center text-white '>Wazzupp</span>
        </div>

        <ul className='flex lg:flex-col flex-row items-center gap-7 md:gap-10 md:px-0 px-2 '>
          <li className=''>
            <button className='lg:text-[28px] text-[22px] cursor-pointer'>
              <RiChatAiLine color='#fff'/>
            </button>
              </li>

              
         <li className="">
                        <button onClick={handleLogout} className="lg:text-[28px] text-[22px] cursor-pointer">
                            <MdLogout color="#fff" />
                        </button>
                    </li>
        </ul>
      </main>
    </section>
  )
}

export default NavLinks