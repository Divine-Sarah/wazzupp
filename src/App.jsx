import React, {useEffect, useState} from 'react';
// import Login from './pages/Login';
// import Chat from './pages/Chat';
// import Test from './pages/TestLogin'
import Register from './pages/Register'
import Login from './pages/Login-2';
import Navlinks from "./components/NavLinks"
import ChatList from './components/ChatList';
import ChatBox from './components/ChatBox';
import {auth} from './firebase/config'



const App = () => {
 const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState(null)
  const [selectedUser, setSelectedUser] = useState(null)

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser){
      setUser(currentUser);
    }

    const unsubscribe = auth.onAuthStateChanged((user) =>{
      setUser(user)
    });

    return () => unsubscribe()
  },[]);

  return (
    <>
    {user? (
    <div className='flex lg:flex-row flex-col items-start w-[100%]'>
      <Navlinks/>
      <ChatList setSelectedUser={setSelectedUser}/>
      <ChatBox selectedUser={selectedUser}/>
    </div>
    ) : (
  
       <div>{isLogin ? <Login isLogin={isLogin} setIsLogin={setIsLogin}/> :<Register isLogin={isLogin} setIsLogin={setIsLogin}/> }
    
    </div>
    )}
  

   

    </>
  )
}

export default App
