import { MoreVert } from '@mui/icons-material';
import React, { useEffect, useRef, useState } from 'react';
import ReactTimeAgo from 'react-time-ago';
import { toast } from 'react-toastify';
import { getNotifications, newNotification } from '../../api';
import { useAuth } from '../../hooks/authHook';
import useOutsideAlerter from '../../hooks/outsideAlerterHook';
import { backend_url } from '../../utils/constants';
import Loading from '../loading/Loading';
import './notifications.css'

const Notifications = ({ setIsNotificationClicked, setNumberOfNotifications }) => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading]=useState(true);
    const auth=useAuth();

    useEffect(() => {
        const get_number_of_Notifications = async () => {
            const response = await newNotification(auth.user._id, false, true);
            if (response) {
                setNumberOfNotifications(0);
            }
            else {
                toast.error(response.message)
            }
        }
        get_number_of_Notifications();
    }, [])

    useEffect(() => {
        const get_notifications = async () => {
            setLoading(true);
            const response = await getNotifications();
            if (response.success) {
                setNotifications(response.data.notifications);
            }
            else {
                toast.error(response.data.message);
            }
            setLoading(false)
        }
        get_notifications();
    }, [])

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, setIsNotificationClicked);

    return (
        <div ref={wrapperRef} className='profileAndLogoutParent notificationParent'>
            <div className='notificationHeading'>
                <h2>Notifications</h2>
                <MoreVert />

            </div>
            {
                loading?<Loading/>:
            <ul>
                {
                    notifications.map(notification => {
                        return <li className={notification.isShown ? 'notificationList' :'notificationList shownNotificatioBgColor'} key={notification._id}>
                            <div>
                                <img src={notification.sender.avtar ?  notification.sender.avtar : '/assets/avtar-4.png'} className='notificationAvtar' />
                            </div>
                           
                            <section>
                                <span className='notificationSenderName'>{notification.sender.name} </span> {notification.content}
                                <div className='notificationTime' style={!notification.isShown?{color:'black'}:{}}>{<ReactTimeAgo date={new Date(notification.createdAt)} locale="en-US" />}</div>

                            </section>
                        </li>
                    })
                }
            </ul>
            }

        </div>
    );
}

export default Notifications;
