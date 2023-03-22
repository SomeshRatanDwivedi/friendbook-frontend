import React from 'react';
import { backend_url } from '../../utils/constants';
import './friends.css'

const Friends = ({blueBgColor,user}) => {
   
    return (
        <li  className={blueBgColor ? 'sidebarFriend blueBgColor' :'sidebarFriend'}>
            <img src={user.avtar ? backend_url + user.avtar :'../../assets/avtar-4.png'} className='sidebarFriendImg' />
            <span className='sidebarFriendName'>{user.name}</span>

        </li>
    );
}

export default Friends;