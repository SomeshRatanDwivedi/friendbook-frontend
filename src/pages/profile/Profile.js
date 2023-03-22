import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getUserInfo } from '../../api';
import Feed from '../../components/feed/Feed';
import Leftbar from '../../components/leftbar/Leftbar';
import Loading from '../../components/loading/Loading';
import Rightbar from '../../components/rightbar/Rightbar';
import { useAuth } from '../../hooks/authHook';
import { backend_url } from '../../utils/constants';


import './profile.css'

const Profile = () => {
    const {id}=useParams();
    const auth=useAuth();
    const [user, setUser]=useState();
    const [loading, setLoading]=useState(true);
    const navigate=useNavigate();
    useEffect(()=>{
        const userInfo=async()=>{
            const response=await getUserInfo(id);
            if(response.success){
                setUser(response.data.user);
            }
            else{
                toast.error(response.message);
                navigate(-1)
            }
            setLoading(false)
        }
        userInfo();
       
       
    }, [id])

    if (!auth.user) {
        return <NavLink to='/login' />
    }

    const editUser=(newUser)=>{
        setUser(newUser)
    }

    if(loading){
        return <Loading/>
    }

    return (
        <>
            <div className='profile'>
               <Leftbar/>
                <div className='profileRight'>
                    <div className='profileRightTop'>
                        <div className='profileCover'>
                            <img className='profileCoverImg' src='../../assets/cover-img.jpeg' />
                            <img className='profileUserImg' src={user.avtar?backend_url + user.avtar:'../../assets/avtar-4.png'} />

                        </div>
                        <div className='profileInfo'>
                            <h4 className='profileInfoName'>{user.name}</h4>
                            <span className='profileInfoDesc'>{user.desc}</span>

                        </div>
                    </div>
                    <div className='profileRightBottom'>
                        <Feed/>
                        <Rightbar profile user={user} id={id} editUser={editUser}/>
                    </div>



                </div>
            </div>
        </>
    );
}

export default Profile;
