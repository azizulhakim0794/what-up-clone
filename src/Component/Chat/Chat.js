import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile, InsertEmoticon, SearchOutlined } from '@material-ui/icons';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import React, { useContext, useState } from 'react';
import MicIcon from '@material-ui/icons/Mic';
import './Chat.css'
import axios from './../../axios'
import { UserContext } from '../../App';
import Login from '../Login/Login';

const Chat = ({messages}) => {
    const [input, setInput] = useState('')
    const [userDataInfo] = useContext(UserContext)
    const sendMessage = async (e) => {
        e.preventDefault()
          await axios.post('/messages/new',{
                message:input,
                name:userDataInfo.name,
                timestamp:new Date().toUTCString(),
                email:userDataInfo.email
            })
            console.log(input)
            setInput('')
    }
    return userDataInfo.isSignedIn ? (
        <div className="chat">
            <div className="chat__header">
                <Avatar src="https://miro.medium.com/max/1000/0*kBHpKva09AsGj7RQ"/>
                <div className="chat__headerInfo">
                    <h3>Developer Room</h3>
                    <p>Last seen at...</p>
                </div>
                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>
            <div className="chat__body">
                {messages.map((message) => (
                     <p key={message._id} className={`chat__message ${(message.email === userDataInfo.email) && "chat__receiver"}`}>
                        <span className="chat__name">{message.name}</span>
                        {message.message} <span className="chat__timestamp">{message.timestamp}
                        </span>
                    </p>
                ))}
            </div>
            <div className="chat__footer">
                <InsertEmoticon />
                <form action="">
                    <input type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="type a message" />
                    <button onClick={sendMessage} type="submit">
                        send a message
                    </button>
                </form>
                <MicIcon />
            </div>
        </div>
    ) : <Login/>;
};

export default Chat;