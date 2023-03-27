import React from 'react';

import './friends.css'

const Friends = ({blueBgColor,user}) => {
   
    return (
        <li  className={blueBgColor ? 'sidebarFriend blueBgColor' :'sidebarFriend'}>
            <img src={user.avtar ?  user.avtar :'../../assets/avtar-4.png'} className='sidebarFriendImg' />
            <span className='sidebarFriendName'>{user.name}</span>

        </li>
    );
}

export default Friends;
