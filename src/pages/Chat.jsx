import UserList from '../components/UserList';
import Navbar from '../components/Navbar'
import ChatBox from '../components/ChatBox'


const dummyUsers = [
  { id: '1', name: 'Jane Doe', initials: 'JD' },
  { id: '2', name: 'John Smith', initials: 'JS' },
  { id: '3', name: 'Alice Johnson', initials: 'AJ'},
];

const Chat = () => {
  const handleSelectUser = (user) => {
    console.log('Selected user:', user);
    // setSelectedUser(user); // if needed
  };

  return (
    <div className="flex h-screen bg-[#F4F4F4] px-[12px] space-x-3.5">
      <UserList users={dummyUsers} onSelectUser={handleSelectUser} />
      <div className="flex-1 flex flex-col pt-1.5 space-y-2.5">
      <Navbar/>
        <ChatBox users={dummyUsers} onSelectUser={handleSelectUser} />
      </div>
    </div>
  );
};

export default Chat;
