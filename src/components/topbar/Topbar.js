import { Person, Search, Chat, Notifications as BellIcon } from '@mui/icons-material';

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllUser, getNumberOfNotifications } from '../../api';
import { useAuth } from '../../hooks/authHook';

import Friends from '../friends/Friends';
import ProfileOptions from '../profileOptions/ProfileOptions';
import Notifications from '../notifications/Notifications';
import './topbar.css'
import { toast } from 'react-toastify';
import { useSocket } from '../../providers/SocketProvider';

const Topbar = () => {
    const [isProfileClicked, setIsProfileClicked] = useState(false);
    const [searchKey, setSearchKey] = useState('');
    const [users, setUsers] = useState('');
    const [isNotificationClicked, setIsNotificationClicked] = useState(false);
    const [numberOfNotifications, setNumberOfNotifications] = useState(0);
    const [numberOfmessages, setNumberOfMessages]=useState(0)
    const navigate = useNavigate();
    const auth = useAuth();
    const socket=useSocket();

    useEffect(() => {
        const get_number_of_Notifications = async () => {
            const response = await getNumberOfNotifications();
            if (response) {
                setNumberOfNotifications(response.data.no_of_notifications);
            }
            else {
                toast.error(response.message)
            }
        }
        get_number_of_Notifications();
    }, [])

    useEffect(() => {

        socket.on('getMessage', (data) => {
            setNumberOfMessages(numberOfmessages+1)
        })
    }, [numberOfmessages])

    useEffect(() => {
        socket.on('getNotifications', (data) => {
            setNumberOfNotifications(numberOfNotifications+1);
        })
    }, [numberOfNotifications])

    useEffect(() => {
        const allUsers = async () => {
            const response = await getAllUser(searchKey);
            if (response.success) {
                setUsers(response.data.users);
            }
            else {
                toast.error(response.message)
            }
        }
        if (searchKey) {

            allUsers();
        }
    }, [searchKey])

    const destroySession = () => {
        auth.logout();
        navigate('/login');
        socket.disconnect();
    }

    const handleSearchUserClick=()=>{
        setSearchKey('') 
        setUsers([]);
    }

    return (
        <div className='topbarContainer'>
            <div className='topbarLeft'>
                <span className='logo'>
                    Friend Book
                </span>
            </div>
            <div className='topbarCenter'>
                <div className='searchbar'>
                    <Search className='searchIcon' />
                    <input placeholder='Search for friends, post or video' className='searchInput' value={searchKey} onChange={(e) => setSearchKey(e.target.value)} />
                    {
                        users &&
                        <ul className='topbarSearchUserLists'>
                            {
                                users.map(user => {
                                    return (
                                        <Link className='searchUserLink' to={`/profile/${user._id}`} key={`friend- ${user._id}`} onClick={handleSearchUserClick}>
                                            <Friends user={user} />
                                        </Link>
                                    )

                                })

                            }
                        </ul>

                    }

                </div>

            </div>
            <div className='topbarRight'>
                <div className='topbarLinks'>
                    <Link to='/' className='topbarLink'>Homepage</Link>
                    <Link className='topbarLink'>Timeline</Link>

                </div>
                <div className='topbarIcons'>
                    <div className='topbarIconItem'>
                        <Person />
                        <span className='topbarIconBadge'>1  </span>

                    </div>
                    <div className='topbarIconItem'>
                        <Link to={`/messanger/${auth.user._id}`} className='chatLink'>
                            <Chat onClick={()=>setNumberOfMessages(0)} />
                            {
                                numberOfmessages !== 0 &&
                                <span className='topbarIconBadge'>{numberOfmessages <= 9 ? numberOfmessages : '9+'}</span>
                            }
                            
                        </Link>



                    </div>
                    <div className='topbarIconItem'>
                        <BellIcon onClick={() => setIsNotificationClicked(!isNotificationClicked)} />
                        {
                            numberOfNotifications!=0 && <span className='topbarIconBadge'>{numberOfNotifications}</span>
                        }
                        
                        {
                            isNotificationClicked && <Notifications setIsNotificationClicked={setIsNotificationClicked}
                                setNumberOfNotifications={setNumberOfNotifications} />
                        }

                    </div>

                </div>
                <div className='topbarAvtarParent'>
                    <img src={auth.user.avtar ?  auth.user.avtar : '/assets/avtar-4.png'} alt='' className='topbarImg' onClick={() => setIsProfileClicked(!isProfileClicked)} />
                    {
                        isProfileClicked && <ProfileOptions setIsProfileClicked={setIsProfileClicked} destroySession={destroySession} />

                    }

                </div>


            </div>

        </div>
    );
}

export default Topbar;
