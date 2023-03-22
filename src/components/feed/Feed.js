import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getPosts } from '../../api';
import Loading from '../loading/Loading';
import Post from '../post/post';
import Share from '../share/Share';
import './feed.css'

const Feed = () => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    


    useEffect(() => {
        const getAllPosts = async () => {
            const response = await getPosts();
            if (response.success) {
                setPosts(response.data.posts);
            }
            else {
                toast.error(response.message)
            }
            setIsLoading(false)
        }
        getAllPosts();

    }, []);
 

   

    return (
        <div className='feed'>
            <div className='feedWrapper'>
                <Share setPosts={setPosts} />
                {
                    isLoading ?<Loading />:
                    posts.map(post => {
                        return <Post key={`post-${post._id}`} post={post} setPosts={setPosts} />
                    })
                }

            </div>
        </div>
    );
}

export default Feed;
