import React, { useEffect, useRef, useState } from 'react';
import Message from '../message/Message';
import Loading from '../../components/loading/Loading';
import './messangerMid.css'
import { getAllMessages, getAllParticipants, sendMessage } from '../../api';
import { toast } from 'react-toastify';
import { useAuth } from '../../hooks/authHook';
import { io } from 'socket.io-client'

const MessangerMid = ({ conversationId, recieverId, setOnlineUsers}) => {
    const [messages, setMessages]=useState([]);
    const [message, setMessage]=useState([]);
    const [loading, setLoading]=useState(false);
    const [sending, setSending]=useState(false);
    const [newMessage, setNewMessage] = useState(null);
    const [participants, setParticipants]=useState([]);
    const socket = useRef()
    const scrollRef=useRef();
    const auth=useAuth();

    useEffect(() => {
        socket.current = io("ws://localhost:8900");

        socket.current.on('getMessage', (data) => {
            setNewMessage({
                content: data.text,
                sender: data.senderId,
                createdAt: Date.now(),
                reciever: data.recieverId
            })
        })
    }, [])


    useEffect(() => {
        socket.current.emit("addUser", auth.user?._id);
        socket.current.on("getUsers", users => {
           setOnlineUsers(users)
        })
    }, [auth.user])

    useEffect(() => {

        const get_all_participants = async () => {
            setLoading(true);
            const response = await getAllParticipants(conversationId);
            if (response.success) {
                setParticipants(response.data.participants);
            }
            else {
                toast.error(response.message)
            }
            setLoading(false)
        }

        if (conversationId) {
            get_all_participants();
        }
    }, [conversationId])
    

    useEffect(() => {
        const get_All_Messages=async()=>{
            setLoading(true);
            const response=await getAllMessages(conversationId);
            if(response.success){
                setMessages(response.data.messages);
            }
            else{
                toast.error(response.message);
            }
            setLoading(false)
        }

        if(conversationId){
            get_All_Messages();
      
        }
      
    }, [conversationId]);


    useEffect(()=>{
        if(newMessage){
            if(newMessage.sender === recieverId){
                const newMessages=[...messages, newMessage]
                setMessages(newMessages)
            } 
        }
    }, [newMessage])



    useEffect(()=>{
        scrollRef.current?.scrollIntoView({behavior:'smooth'})
    }, [messages])


    const sendMessageToSocket = (text) => {
        socket.current.emit("sendMessage", {
            senderId: auth.user._id,
            recieverId,
            text
        })
    }

    const handleSubmit=async(e)=>{
          e.preventDefault();
          setSending(true)

          sendMessageToSocket(message)

          const response=await sendMessage(recieverId, conversationId, message);
          if(response.success){
            toast.success("Your message is successfully sent");
              const newMessages = [...messages, response.data.message];
              setMessages(newMessages);
          }
          else{
            toast.error(response.message)
          }
          setSending(false);
          setMessage('');

    }


    if(loading){
        return <Loading/>
    }
    return (
        <div className='messangerMid'>
            <div className='messangerMidWrapper'>

                <div className='messages'>
                    {
                        conversationId ?
                            <>
                              {
                                messages.map(message=>{
                                    return <div ref={scrollRef}  key={message._id}>
                                        <Message participants={participants} secondUserId={recieverId} message={message} right={message.sender == auth.user._id} />
                                    </div> 
                                })
                              }
                            </> :
                            <h4>Please select anyone to chat</h4>
                    }

                </div>


                <form onSubmit={handleSubmit} className='messageInputBox'>
                    <textarea placeholder='Write something...' value={message} onChange={(e)=>setMessage(e.target.value)} />
                    <button disabled={sending} type='submit'>{sending?'Sending':'Send'}</button>
                </form>
            </div>
        </div>
    );
}

export default MessangerMid;
