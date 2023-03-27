import React from 'react';
import { Link } from 'react-router-dom';

import './onlinefriends.css'

const OnlineFriends = ({onlineFriend}) => {
    return (
        <li className='rightBarFriend'>
          
            <div className='rightbarProfileImgContainer'>
                <img className='rightbarProfileImg' src={onlineFriend?.avtar?onlineFriend.avtar:'/assets/avtar-4.png'} />
                <span className='rightbarOnline'></span>
            </div>
            <span className='rightbarUserName'>{onlineFriend?.name}</span>
            

        </li>
    );
}

export default OnlineFriends;
