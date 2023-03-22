import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/authHook';
import Friends from '../friends/Friends';
import './messangerLeft.css'

const MessangerLeft = ({ conversations, changeSelectedConversation, selectedConversationId }) => {
    const auth = useAuth();
    return (
        <div className='messangerLeft'>
            <div className='messangerLeftWrapper'>
                <input className='messangerLeftInput' placeholder='Search for friends' />

                <ul className='sidebarFriendList'>
                    {
                        conversations.map((conversation, index) => {
                            return (
                                <span  onClick={() => changeSelectedConversation(conversation._id, 
                                conversation.participants[0]._id == auth.user._id ? 
                                conversation.participants[1]._id : conversation.participants[0]._id)} 
                                key={`conversation friend- ${index}`}>
                                    <Friends blueBgColor={selectedConversationId==conversation._id} user={conversation.participants[0]._id == auth.user._id ? 
                                    conversation.participants[1] : conversation.participants[0]} />
                                </span>
                            )

                        })
                    }

                </ul>

            </div>
        </div>
    );
}

export default MessangerLeft;
