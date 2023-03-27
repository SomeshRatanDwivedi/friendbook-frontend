import { PermMedia, Label, Room, EmojiEmotions, Cancel } from '@mui/icons-material';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { createPost } from '../../api';
import { useAuth } from '../../hooks/authHook';
import { backend_url } from '../../utils/constants';
import './share.css'

const Share = ({setPosts}) => {

    const [postContent, setPostContent] = useState('')
    const [isPosting, setIsPosting] = useState(false);
    const [file, setFile] = useState('');


    const auth = useAuth();


    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsPosting(true);
        const formData = new FormData();
        formData.append('content', postContent);
        formData.append('avtar', file);
       
        const response = await createPost(formData);
        if (response.success) {
            toast.success("Your post is created");
            setPosts((prevPost)=>[response.data.post, ...prevPost])
        }
        else {
            toast.error(response.message)
        }
        setIsPosting(false)
        setPostContent('');
        setFile(null);

    }
    return (
        <div className='share'>
            <div className='shareWrapper'>
                <div className='shareTop'>
                    <img className='shareProfileImg' src={auth.user.avtar ?  auth.user.avtar : '../../assets/avtar-4.png'} />
                    <input
                        placeholder={`What's in your mind ${auth.user.name.split(' ')[0]}`}
                        className='shareInput' value={postContent} onChange={(e) => setPostContent(e.target.value)}
                        name='post_content'
                    />

                </div>
                <hr className='shareHr' />
                {
                    file &&
                    <div className='previewPostImgParent'>
                            <img className='previewPostImg' src={URL.createObjectURL(file)} />
                        <Cancel className='previewPostCancelIcon' onClick={()=>setFile(null)}/>
                    </div>
                }
                <form onSubmit={handleSubmit} className='shareBottom'>
                    <div className='shareOptions'>
                        <label htmlFor='file' className='shareOption'>
                            <PermMedia htmlColor='tomato' className='shareIcon' />
                            <span className='shareOptionText'>Photo or Video</span>
                            <input type='file' id='file' style={{ display: 'none' }} onChange={(e) => setFile(e.target.files[0])} />
                        </label>
                        <div className='shareOption'>
                            <Label htmlColor='blue' className='shareIcon' />
                            <span className='shareOptionText'>Tag</span>
                        </div>
                        <div className='shareOption'>
                            <Room htmlColor='green' className='shareIcon' />
                            <span className='shareOptionText'>Location</span>
                        </div>
                        <div className='shareOption'>
                            <EmojiEmotions htmlColor='goldenrod' className='shareIcon' />
                            <span className='shareOptionText'>Feelings</span>
                        </div>
                    </div>
                    <button disabled={isPosting} type='submit' className='shareButton'>{isPosting ? 'Posting...' : 'Post'}</button>
                </form>



            </div>
        </div>
    );
}

export default Share;
