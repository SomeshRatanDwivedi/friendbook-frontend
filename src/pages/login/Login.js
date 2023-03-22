import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../hooks/authHook';
import { useFormInput } from '../../hooks/formHook';
import './login.css'

const Login = () => {
    const email=useFormInput('');
    const password=useFormInput('');
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const auth=useAuth();

    const handleSubmit=async(e)=>{
        e.preventDefault();
        if (!email || !password) {
            toast.error('Please enter both email and password');
        }
        setIsLoggingIn(true);
         const response=await auth.login(email.value, password.value);
         if(response.success){
            toast.success("You are logged in successfully");
            return <Navigate to='/'/>
         }
         else{
             toast.error(response.message)
         }
        setIsLoggingIn(false);
    }

    if(auth.user){
        return <Navigate to='/' />
    }
    return (
        <div className='login'>
            <div className='loginWrapper'>
                <div className='loginLeft'>
                  <h3 className='loginLogo'>Friend Book</h3>
                  <span className='loginDesc'>
                         Connect with friends and the world around you on Friend Book.
                  </span>

                </div>

                <form onSubmit={handleSubmit} className='loginRight'>
                      <div className='loginBox'>
                         <input placeholder='Email' type='email' className='loginInput' name='email'  {...email}/>
                        <input placeholder='Password' type='password' className='loginInput' name='password' {...password} />
                        <button type='submit' className='loginButton' disabled={isLoggingIn}>{isLoggingIn ? 'Logging In' :'Log In'}</button>
                        <span className='loginForgot'>Forgot Password?</span>
                        <Link to='/register' className='registerLink'>
                        <button type='button' className='loginRegisterButton'>
                            Create a New Account
                        </button>
                        </Link>
                      </div>

                </form>

            </div>

        </div>
    );
}

export default Login;
