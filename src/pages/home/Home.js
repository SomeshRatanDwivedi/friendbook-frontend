
import React, { useEffect } from 'react';
import Feed from '../../components/feed/Feed';
import Rightbar from '../../components/rightbar/Rightbar';
import './home.css'
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/authHook';
import Leftbar from '../../components/leftbar/Leftbar';


const Home = () => {
     
    const auth = useAuth();

    if(!auth.user){
        return <Navigate to='/login'/>
    }

    return (
        <>
            <div className='homeContainer'>
                 <Leftbar/>
                <Feed />
                <Rightbar user={auth.user} />
            </div>
        </>
    );
}

export default Home;
