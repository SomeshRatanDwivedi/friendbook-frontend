import React, { useEffect, useState } from 'react';
import './message.css'
import ReactTimeAgo from 'react-time-ago'
import { backend_url } from '../../utils/constants';
import { useAuth } from '../../hooks/authHook';

const Message = ({ right, message, participants, secondUserId }) => {
    const auth=useAuth();
    const findImagePathOfSecondUser=()=>{
        if (secondUserId == participants[0]?._id){
            if (participants[0]?.avtar){
                return backend_url + participants[0]?.avtar
            }
            else{
                return '/assets/avtar-4.png'
            }
        }
        else{
            if (participants[1]?.avtar) {
                return backend_url + participants[1]?.avtar
            }
            else {
                return '/assets/avtar-4.png'
            }
        }
        
    }
    return (
        <div className={right ? 'message alignEnd' : 'message'}>
            <div className={right ? 'messageBody justifyContentEnd' : 'messageBody'}>
                {
                    right ?
                        <img className='messageProfile' src={auth.user?.avtar ? backend_url + auth.user?.avtar:'/assets/avtar-4.png'} /> :
                        <img className='messageProfile' src={findImagePathOfSecondUser()} 

                            />
                }

                <span className={right ? 'messageText bgGray' : 'messageText'}>
                    {message.content}
                </span>
            </div>
            <div className='messageTime'>
                {<ReactTimeAgo date={new Date(message.createdAt)} locale="en-US" />}
            </div>

        </div>
    );
}

export default Message;
