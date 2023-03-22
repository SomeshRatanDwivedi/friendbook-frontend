import { MoreVert } from '@mui/icons-material';
import React, { useEffect, useRef, useState } from 'react';
import ReactTimeAgo from 'react-time-ago';
import { toast } from 'react-toastify';
import { getNotifications } from '../../api';
import useOutsideAlerter from '../../hooks/outsideAlerterHook';
import { backend_url } from '../../utils/constants';
import './notifications.css'

const Notifications = ({ setIsNotificationClicked }) => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const get_notifications = async () => {
            const response = await getNotifications();
            if (response.success) {
                setNotifications(response.data.notifications);
            }
            else {
                toast.error(response.data.message);
            }
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
            <ul>
                {
                    notifications.map(notification => {
                        return <li className={notification.isShown ? 'notificationList' :'notificationList shownNotificatioBgColor'} key={notification._id}>
                            <div>
                                <img src={notification.sender.avtar ? backend_url + notification.sender.avtar : '/assets/avtar-4.png'} className='notificationAvtar' />
                            </div>
                           
                            <section>
                                <span className='notificationSenderName'>{notification.sender.name} </span> {notification.content}
                                <div className='notificationTime' style={!notification.isShown?{color:'black'}:{}}>{<ReactTimeAgo date={new Date(notification.createdAt)} locale="en-US" />}</div>

                            </section>
                        </li>
                    })
                }
            </ul>

        </div>
    );
}

export default Notifications;
