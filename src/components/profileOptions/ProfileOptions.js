import React, { useRef } from 'react';
import './profileOptions.css'

import { Settings, Logout, Feedback, DisplaySettings, QuestionMark} from '@mui/icons-material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useAuth } from '../../hooks/authHook';
import { backend_url } from '../../utils/constants';
import { Link } from 'react-router-dom';
import useOutsideAlerter from '../../hooks/outsideAlerterHook';

const ProfileOptions = ({setIsProfileClicked, destroySession}) => {
    const auth=useAuth();
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, setIsProfileClicked);
    return (
        <div ref={wrapperRef} className='profileAndLogoutParent'>
            <div className='topbarProfileLink' onClick={() => setIsProfileClicked(false)} >
                <Link to={`/profile/${auth.user._id}`}>
                    <img src={auth.user.avtar ?  auth.user.avtar : '/assets/avtar-4.png'} alt='' className='profileLinkImg' />
                    <span>{auth.user.name}</span>
                </Link>
            </div>
            <ul>
                <li>
                    <div>
                        <span className='iconParent'>
                            <Settings className='profileAndLogoutParentIcon' />
                        </span>
                        <span className='topbarListName'>Setting & privacy</span>
                    </div>

                    <ChevronRightIcon className='profileAndLogoutParentIcon' />

                </li>
                <li>
                    <div>
                        <span className='iconParent'>
                            <QuestionMark className='profileAndLogoutParentIcon' />
                        </span>

                        <span className='topbarListName'>Help & support</span>
                    </div>

                    <ChevronRightIcon className='profileAndLogoutParentIcon' />

                </li>
                <li>
                    <div>
                        <span className='iconParent'>
                            <DisplaySettings className='profileAndLogoutParentIcon' />
                        </span>

                        <span className='topbarListName'>Display & accessibility</span>
                    </div>

                    <ChevronRightIcon className='profileAndLogoutParentIcon' />

                </li>
                <li>
                    <div>
                        <span className='iconParent'>
                            <Feedback className='profileAndLogoutParentIcon' />
                        </span>

                        <span className='topbarListName'>Give feedback</span>
                    </div>



                </li>
                <li onClick={destroySession}>
                    <div>
                        <span className='iconParent'>
                            <Logout className='profileAndLogoutParentIcon' />
                        </span>

                        <span className='topbarListName'>Log Out</span>
                    </div>


                </li>
            </ul>

        </div>
    );
}

export default ProfileOptions;
