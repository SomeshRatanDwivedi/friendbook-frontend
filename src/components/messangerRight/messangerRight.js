import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/authHook';
import OnlineFriends from '../onlineFriends/OnlineFriends';
import './messangerRight.css'

const MessangerRight = ({ onlineUsers, changeSelectedConversation}) => {
    const [onlineFriends, setOnlineFriends]=useState([]);
    const auth=useAuth();
    const friends=auth.user.friends;
    useEffect(()=>{
        const newOnlineFriends=friends.filter(f=>onlineUsers.includes(f._id));
        setOnlineFriends(newOnlineFriends)
    }, [onlineUsers])


    return (
        <div className='messangerRight'>
            <ul className='sidebarFriendList' style={{paddingTop:'10px'}}>
                {
                    onlineFriends.map(user => {
                        return (
                           
                            <span className='onlineFriendsParent' onClick={() => changeSelectedConversation(null, user._id)} key={`onlinefriend- ${user._id}`}>
                                <OnlineFriends onlineFriend={user} />
                            </span>
                        )

                    })
                }

            </ul>
        </div>
    );
}

export default MessangerRight;
