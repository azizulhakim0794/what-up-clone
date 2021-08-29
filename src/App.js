import { useEffect, useState } from 'react';
import './App.css';
import Chat from './Component/Chat/Chat';
import SideBar from './Component/SideBar/SideBar';
import Pusher from 'pusher-js'
import axios from './axios'
import { createContext } from 'react';
export const UserContext = createContext()
function App() {
  const [messages,setMessages] = useState([])
  const [userDataInfo, setUserDataInfo] = useState({
    isSignedIn: false,
    email: "",
    photoURL: "",
    name:""
  })
  useEffect(()=>{
    axios.get('/messages/sync')
    .then(res=>{
      setMessages(res.data)
    })
  },[])
  useEffect(()=>{
    const pusher = new Pusher('055522bcc1fada11494e', {
      cluster: 'eu'
    });
    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessage)=> {
      // alert(JSON.stringify(newMessage));
      setMessages([...messages,newMessage])
    });
    return ()=>{
      channel.unbind_all()
      channel.unsubscribe()
    }
  },[messages])
  return (
    <UserContext.Provider value={[userDataInfo, setUserDataInfo]}>
    <div className="app">
      <div className="app__body">
        <SideBar/>
        <Chat messages={messages}/>
      </div>
    </div>
    </UserContext.Provider>
  );
}

export default App;
