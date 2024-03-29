import React from 'react';

import './userFriends.css'

const UserFriends = ({friend}) => {
    return (
        <div className='rightbarFollowing' >
            <img className='rightbarFollowingImg' src={ friend.avtar ?  friend.avtar : '../../assets/avtar-4.png' }/>
            <span className='rightbarFollowingName'>{friend.name}</span>

        </div>
    );
}

export default UserFriends;
