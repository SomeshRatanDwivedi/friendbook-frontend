import { MoreVert } from '@mui/icons-material';
import React, { useState } from 'react';
import './post.css'
import ReactTimeAgo from 'react-time-ago'
import { createComment, createNotification, toggleLike } from '../../api';
import { toast } from 'react-toastify';
import Comment from '../comments/Comment';
import { backend_url } from '../../utils/constants';
import { useAuth } from '../../hooks/authHook';
import { Link } from 'react-router-dom';



const Post = ({ post}) => {
    const [isUserLike, setIsUserLike] = useState(post.isUserLike);
    const [numberOfLikes, setNumberOfLikes] = useState(post.no_of_likes);
    const [comments, setComments]=useState(post.comments);
    const [commentContent, setCommentContent]=useState('');
    const [isShowComment, setIsShowComment] = useState(false);
    const [isDeleteButtonShow, setIsDeleteButtonShow]=useState(false);
    const auth=useAuth();




    const handleClick = async () => {
        const response = await toggleLike(post._id, 'Post');
        await createNotification(post.user._id, 'Like');
        if (response.success) {
            setNumberOfLikes(isUserLike ? numberOfLikes - 1 : numberOfLikes + 1);
            toast.success(isUserLike ? "You disliked post" : 'You liked the post');
            setIsUserLike(!isUserLike);
           
           

        }
        else {
            toast.error(response.message)
        }

    }



   const handleCommentInput=async(e)=>{
    if(e.key=='Enter'){
        e.target.value='';
        const response=await createComment(post._id, commentContent);
        await createNotification(post.user._id, 'Comment');
        if(response.success){
            const newComments=[...comments, response.data.comment];
            setComments(newComments);
            toast.success("Your comment is posted")
        }
        else{
            toast.error(response.message);
        }
    }
    else{
        setCommentContent(e.target.value);
    }
   
    
   }


      const deletePost=async()=>{
        setIsDeleteButtonShow(false);
      }
    return (

        <div className='post'>
            <div className='postWrapper' style={isShowComment?{paddingBottom:0 + 'px'}:{}}>
                <div className='realPost'>
                    <div className='postTop'>
                        <div className='postTopLeft'>
                            <Link className='postUserProfileLink' to={`/profile/${post.user._id}`}>

                            <img className='postProfileImg' src={post.user?.avtar?backend_url + post.user.avtar :'../../assets/avtar-4.png'} />
                            <span className='postUserName'>{post.user.name}</span>
                          </Link>
                            <span className='postDate'>{<ReactTimeAgo date={new Date(post.createdAt)} locale="en-US" />}</span>

                        </div>
                        <div className='postTopRight'>
                            <MoreVert className='postTopRightIcon' onClick={()=>setIsDeleteButtonShow(!isDeleteButtonShow)} />
                            {
                                isDeleteButtonShow && <button className='deletePost' onClick={deletePost}>Delete</button>
                            }

                        </div>

                    </div>
                    <div className='postCenter'>
                        <span className='postText'>
                            {post.content}
                            {
                                post.img &&
                                <img className='postImg' src={post.img} />
                            }
                            

                        </span>


                    </div>
                    <div className='postBottom'>
                        <div className='postBottomLeft'>
                            <img className='likeIcon' src='/assets/like.png' onClick={handleClick} />
                            <img className='likeIcon' src='/assets/heart.png' onClick={handleClick} />
                            <span className='postLikeCounter'>{isUserLike ? 'You and ':''}{ isUserLike? numberOfLikes - 1: numberOfLikes} 
                            {isUserLike?' others ':' '}people like it</span>

                        </div>
                        <div className='postBottomRight'>
                            <span className='postCommentText' onClick={() => setIsShowComment(!isShowComment)}>{post.comments.length} comments </span>
                        </div>
                    </div>
                    <hr className='commentDivider' />
                </div>
                {
                    isShowComment &&
                    <>
                        
                        <ul className='commentsParent'>
                             {
                                comments.map(comment=>{
                                    return <Comment key={comment._id} comment={comment}/>
                                })
                             }
                        </ul>
                       
                        <div className='commentInput'>
               
                            <img className='commentProfile' src={auth.user.avtar ? backend_url + auth.user.avtar : '../../assets/avtar-4.png'} />
                             <input placeholder='Write a comment'  className='commentInputBox' onKeyUp={handleCommentInput} />
                        </div>

                    </>
                }

            </div>
        </div>

    );
}

export default Post;