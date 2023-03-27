
import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getAllConversations, getUserInfo, makeNewConversation } from '../../api';
import Loading from '../../components/loading/Loading';
import MessangerLeft from '../../components/messangerLeft/MessangerLeft';
import MessangerMid from '../../components/messangerMid/messangerMid';
import MessangerRight from '../../components/messangerRight/messangerRight';
import { useAuth } from '../../hooks/authHook';

import './messenger.css'

const Messenger = () => {
    const auth = useAuth();
    const [conversations, setConversations]=useState([]);
    const [conversationId, setConversationId]=useState('');
    const [recieverId, setReciverId]=useState('')
    const [loading, setLoading] = useState(true);
    const [onlineUsers, setOnlineUsers]=useState([]);


    const navigate = useNavigate();


    useEffect(()=>{
        setLoading(true)
        const all_conversations=async()=>{
            const response=await getAllConversations();
            if (response.success) {
                setConversations(response.data.conversations);
            }
            else {
                toast.error(response.message);
                navigate(-1)
            }
            setLoading(false)
        }
        all_conversations();
    }, [])
   
    const createNewConversation=async(id)=>{

           const response=await makeNewConversation(id);
           if(response.success){
              setConversations([...conversations, response.data.conversation]);
              setConversationId(response.data.conversation._id);
           }
           else{
              toast.error(response.message);
           }
    }


     const changeSelectedConversation=(conversationId, recieverId)=>{
        if(conversationId){
            setConversationId(conversationId);
            setReciverId(recieverId);
        }
        else{

            const conversationUsers = conversations.map(ele => (ele.participants[0]._id == auth.user._id) ? ele.participants[1]._id : ele.participants[0]._id);
            const isUserTalkedBefore=conversationUsers.includes(recieverId);
            if(isUserTalkedBefore){
                conversationId = conversations.find(ele => ele.participants[0]._id == recieverId || ele.participants[1]._id == recieverId)._id
                setConversationId(conversationId);
            }
            else{
                 createNewConversation(recieverId);
            }
            setReciverId(recieverId);
        }
       
        
     }

    if (!auth.user) {
        return <NavLink to='/login' />
    }

    if (loading) {
        return <Loading />
    }

    return (
        <div className='messanger'>
             <MessangerLeft conversations={conversations} selectedConversationId={conversationId} changeSelectedConversation={changeSelectedConversation}/>
            <MessangerMid conversationId={conversationId} recieverId={recieverId} setOnlineUsers={setOnlineUsers}/>
            <MessangerRight onlineUsers={onlineUsers} changeSelectedConversation={changeSelectedConversation} />
        </div>
    );
}

export default Messenger;
