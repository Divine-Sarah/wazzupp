import {  MdOutlineSearch } from "react-icons/md";


const UserList = ({ users, onSelectUser }) => {
  return (
    <div className="w-full max-w-[477px] h-screen bg-[#FFFFFF] backdrop-blur-lg  border-r border-white/20 p-4 overflow-y-auto">
      <h3 className="font-normal mb-4 text-center text-2xl">CHATS</h3>
      <div className="px-3.5 flex items-center border rounded-full">
          <input
          type="text"
          className="flex-1 px-4 h-[39px] w-full outline-none "
         />
           <MdOutlineSearch className='w-5 h-5 '/>
      </div>
      <div className="pt-14">
      <ul className="space-y-2  gap-3"> 
        {users.map((user) => (
          <div className='flex items-center'>
            <span className="rounded-full border-2 w-20 h-20 font-bold flex items-center justify-center">
          {user.initials}
            </span>
          <li
            key={user.id}
            className="p-2 rounded font-normal cursor-pointer text-xl"
            onClick={() => onSelectUser(user)}
          >
            {user.name}
          </li>
        </div>
        ))}
      </ul>
      </div>
    </div>
  );
};

export default UserList;
