import React, { useContext, useEffect, useRef, useState } from 'react'
import "./messenger.css"
import Topbar from '../../components/topbar/Topbar'
import Converstion from '../../components/conversations/Converstion'
import Message from '../../components/message/Message'
import ChatOnline from '../../components/chatOnline/ChatOnline'
import { AuthContext } from '../../context/AuthContext'
import axios from "axios";
import { io } from "socket.io-client";

const Messenger = () => {

    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessages, setNewMessages] = useState("");
    const [arrivalMessages, setArrivalMessages] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);


    const socket = useRef()

    const scrollRef = useRef();
    const { user } = useContext(AuthContext);



    useEffect(() => {
        socket.current = io("ws://localhost:8900");
        socket.current.on("getMessage", data => {
            setArrivalMessages({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now(),
            })
        })
    }, [])


    useEffect(() => {
        arrivalMessages && currentChat?.members.includes(arrivalMessages.sender) &&
            setMessages(prev => [...prev, arrivalMessages])

    }, [arrivalMessages, currentChat])

    useEffect(() => {
        socket.current.emit("addUser", user._id);
        socket.current.on("getUsers", (users) => {
            setOnlineUsers(
                user.following.filter(f=>users.some(u=>u.userId === f))
                );
        })
    }, [user])


    console.log(socket);


    useEffect(() => {

        const getConversations = async () => {
            try {
                const res = await axios.get("/conversations/" + user._id);
                setConversations(res.data);
            } catch (err) {
                console.log(err);
            }
        }

        getConversations();
    }, [user])

    useEffect(() => {
        const getMessages = async () => {
            try {
                const res = await axios.get("/messages/" + currentChat?._id);
                setMessages(res.data);
            } catch (err) {
                console.log(err);
            }
        };

        getMessages();

    }, [currentChat])


    const handleSubmit = async (e) => {
        e.preventDefault();

        const message = {
            sender: user._id,
            text: newMessages,
            conversationId: currentChat._id
        };

        const receiverId = currentChat.members.find(member => member !== user._id)

        socket.current.emit("sendMessage", {
            senderId: user._id,
            receiverId: receiverId,
            text: newMessages,
        })
        try {
            const res = await axios.post("/messages", message);
            setMessages([...messages, res.data])
            setNewMessages("");
        } catch (err) {
            console.log(err);
        }
    }


    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
    }, [messages])

    return (
        <>
            <Topbar />
            <div className='messenger'>
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <input type="text" placeholder='Search for Friends' className='chatMenuInput' />
                        {conversations.map(c => (
                            <div onClick={() => setCurrentChat(c)}>
                                <Converstion conversation={c} currentUser={user} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="chatBox">
                    <div className="chatBoxWrapper">
                        {
                            currentChat ?
                                <>
                                    <div className="chatBoxTop">
                                        {messages.map(m => {
                                            return (
                                                <div ref={scrollRef}>
                                                    <Message message={m} own={m.sender === user._id} />
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <div className="chatBoxBottom">
                                        <textarea className='chatMessageInput' placeholder='write Something ...' onChange={(e) => setNewMessages(e.target.value)} value={newMessages} ></textarea>
                                        <button className="chatSubmitButton" onClick={handleSubmit} >Send</button>
                                    </div>
                                </> :
                                <span className='noConversationText'>Open a conversation to start a chat</span>
                        }
                    </div>
                </div>
                <div className="chatOnline">
                    <div className="chatOnlineWrapper">
                        <ChatOnline onlineUsers={onlineUsers} currentId={user._id} setCurrentChat={setCurrentChat} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Messenger