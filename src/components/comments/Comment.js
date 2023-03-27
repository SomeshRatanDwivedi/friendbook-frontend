import React from 'react';
import { useAuth } from '../../hooks/authHook';

import './comment.css'

const Comment = ({comment}) => {
    const auth=useAuth();
    return (
        <li style={comment.user._id==auth.user._id?{justifyContent:'flex-end'}:{}}>
            <img className='commentProfile' src={comment.user.avtar ?  comment.user.avtar : '../../assets/avtar-4.png'} />
            <div>
                <h4>{comment.user.name}</h4>
                <span>
                    {comment.content}
                </span>
            </div>

        </li>
    );
}

export default Comment;
