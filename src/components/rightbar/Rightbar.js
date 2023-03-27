import { CardGiftcard } from '@mui/icons-material';
import React, { useEffect } from 'react';
import Ads from '../ads/Ads';
import './rightbar.css'
import { useState } from 'react';
import UserFriends from '../userFriends/UserFriends';
import { useAuth } from '../../hooks/authHook';
import { addFriend, editProfile, removeFriendShip } from '../../api';
import { toast } from 'react-toastify';

import { Link } from 'react-router-dom';
import OnlineFriends from '../onlineFriends/OnlineFriends';
import { useSocket } from '../../providers/SocketProvider';

const Rightbar = ({ profile, user, id, editUser }) => {
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [onlineFriends, setOnlineFriends]=useState([]);
    const socket=useSocket();
    const auth=useAuth();

    useEffect(() => {
      
        socket.emit("addUser", auth.user?._id);
        socket.on("getUsers", users => {
            setOnlineUsers(users)
        })


    }, [auth.user]);


    useEffect(() => {
        const newOnlineFriends = user?.friends.filter(f => onlineUsers.includes(f._id));
        setOnlineFriends(newOnlineFriends)
    }, [onlineUsers])

    const HomeRightbar = () => {
        return (
            <>
                <div className='birthdayContainer'>
                    <CardGiftcard className='giftIcon' />
                    <span className='birhdayText'><b>Ajay bharti</b> and <b>three other friend</b> have birthday today. </span>

                </div>

                <Ads />
                <h4 className='rightbarTitle'>Online Friends</h4>
                <ul className='rightbarFriendList'>
                    {
                        onlineFriends.map(user => {
                            return <Link key={user._id} className='onlineFriendLink' to={`/profile/${user?._id}`}>
                                <OnlineFriends onlineFriend={user} />
                            </Link>


                        })
                    }
                </ul>

            </>
        )
    }


    const ProfileRightBar = () => {
        const [friends, setFriends] = useState(user.friends);
        const [isUserFriend, setisUserFriends] = useState(false);
        const [isEditModeOn, setEditMode] = useState(false);
        const [homeTown, setHomeTown] = useState(user?.homeTown);
        const [city, setCity] = useState(user?.city);
        const [relationship, setRelationship] = useState(user?.relationship);
        const [name, setName] = useState(user?.name);
        const [desc, setDesc] = useState(user?.desc);
        const [avtar, setAvtar] = useState(user?.avtar);
        const [saving, setSaving] = useState(false);
        const auth = useAuth();

        useEffect(() => {
            if (checkIsUserFriend()) {
                setisUserFriends(true);
            }
            else {
                setisUserFriends(false)
            }
        }, []);

        const makeFriend = async () => {
            const response = await addFriend(id);
            if (response.success) {
                toast.success(`You are following ${user.name} now`);
                const newFriendList = [response.data.newFriend, ...friends];
                setFriends(newFriendList);
                setisUserFriends(true)
            }
            else {
                toast.error(response.message);
            }

        }

        const removeFriend = async () => {
            const response = await removeFriendShip(id);
            if (response.success) {
                toast.success(`You are successfully unfollow the ${user.name}`);
                const newFriendList = friends.filter(user => user._id !== auth.user._id)
                setFriends(newFriendList);
                setisUserFriends(false)
            }
            else {
                toast.error(response.message);
            }
        }

        const toggleFriend = async () => {
            if (isUserFriend) {
                await removeFriend();
            }
            else {
                await makeFriend();
            }
        }


        const checkIsUserFriend = () => {
            const isUserIdPresent = friends.filter(user => user._id === auth.user._id);
            if (isUserIdPresent.length > 0) {
                return true;
            }
            return false;
        }

        const handleInfoFormSubmit = async (e) => {
            e.preventDefault();
            setSaving(true)
            const formData = new FormData();
            formData.append('name', name);
            formData.append('desc', desc);
            formData.append('homeTown', homeTown);
            formData.append('city', city);
            formData.append('relationship', relationship);
            formData.append('avtar', avtar);
            const response = await auth.editProfile(formData);
            if (response.success) {
                toast.success("Your info is edited")
                editUser(response.data.user)
            }
            else {
                toast.error(response.message)
            }
            setEditMode(false)
            setSaving(false);

        }

        const changeEditMode = (e) => {
            e.preventDefault();
            setEditMode(!isEditModeOn)
        }

        return (
            <>
                {
                    auth.user._id !== id &&
                    <button className='follow' onClick={toggleFriend}>{isUserFriend ? 'Unfollow' : 'Follow'}</button>
                }

                <h4 className='rightbarProfileTitle'>User information</h4>
                <form onSubmit={handleInfoFormSubmit} className='rightbarInfo'>
                    <div className='rightbarInfoItem'>
                        <span className='rightbarInfoKey'>Name:</span>
                        {
                            isEditModeOn ? <input className='infoInput name-ml' type='text' value={name} onChange={(e) => setName(e.target.value)} /> :
                                <span className='rightbarInfoValue'>{name}</span>

                        }


                    </div>
                    <div className='rightbarInfoItem'>
                        <span className='rightbarInfoKey'>Desc:</span>
                        {
                            isEditModeOn ? <input className='infoInput desc-ml' type='text' value={desc} onChange={(e) => setDesc(e.target.value)} /> :
                                <span className='rightbarInfoValue'>{desc}</span>

                        }


                    </div>
                    <div className='rightbarInfoItem'>
                        <span className='rightbarInfoKey'>City:</span>
                        {
                            isEditModeOn ? <input className='infoInput homeTown-ml' type='text' value={homeTown} onChange={(e) => setHomeTown(e.target.value)} /> :
                                <span className='rightbarInfoValue'>{homeTown}</span>
                        }


                    </div>
                    <div className='rightbarInfoItem'>
                        <span className='rightbarInfoKey'>From:</span>
                        {
                            isEditModeOn ? <input className='infoInput city-ml' type='text' value={city} onChange={(e) => setCity(e.target.value)} /> :
                                <span className='rightbarInfoValue'>{city}</span>

                        }


                    </div>
                    <div className='rightbarInfoItem'>
                        <span className='rightbarInfoKey'>Relationship:</span>
                        {
                            isEditModeOn ? <input className='infoInput' type='text' value={relationship} onChange={(e) => setRelationship(e.target.value)} /> :
                                <span className='rightbarInfoValue'>{relationship}</span>

                        }


                    </div>
                    <div className='rightbarInfoItem rightbarProfilePicEditParent'>
                        <span className='rightbarInfoKey'>Profile:</span>
                        {
                            isEditModeOn ? <input className='infoInput chooseProfilePic' type='file' onChange={(e) => setAvtar(e.target.files[0])} /> :
                                <img src={user.avtar ?  user.avtar : '../../assets/avtar-4.png'} className='rightbarInfoProfilePic' />

                        }


                    </div>

                    {
                        auth.user._id == user._id ? isEditModeOn ? <button disabled={saving} className='follow' type='submit'>{saving ? 'Saving...' : 'Save'}</button> :

                            <button className='follow' type='button' onClick={changeEditMode}>Edit</button> : ''

                    }

                </form>
                <h4 className='rightbarProfileTitle'>User friends</h4>
                <div className='rightbarFollowings'>
                    {
                        friends.length > 0 ? <> {
                            friends.map(friend => {
                                return (
                                    <Link key={friend._id} to={`/profile/${friend._id}`}>
                                        <UserFriends friend={friend} />
                                    </Link>
                                )

                            })
                        }
                        </> :
                            <h4>No friends</h4>
                    }


                </div>

                <Ads />
            </>
        )
    }
    return (
        <div className='rightbar'>
            <div className="rightbarWrapper">
                {profile ? <ProfileRightBar /> : <HomeRightbar />}

            </div>
        </div>
    );
}

export default Rightbar;
