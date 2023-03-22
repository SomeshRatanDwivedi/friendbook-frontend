import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signup } from '../../api';
import { useAuth } from '../../hooks/authHook';
import { useFormInput } from '../../hooks/formHook';
import './register.css'

const Register = () => {
    const name=useFormInput('');
    const email=useFormInput('');
    const password=useFormInput('');
    const confirmPassword=useFormInput('');
    const [isRegistering, setIsRegistering]=useState(false);
    const navigate=useNavigate();
    const auth=useAuth();


    const handleSubmit=async(e)=>{
        e.preventDefault();
        if(!name.value || !email.value || !password.value || !confirmPassword.value){
            return toast.error("All input values are required")
        }
        if(password.value !== confirmPassword.value){
            return toast.error("Password and Confirm password is not matching")
        }
        setIsRegistering(true);
        const response=await signup(name.value, email.value, password.value, confirmPassword.value);
        if(response.success){
            toast.success("You are registered successfully");
            navigate('/login')
        }
        toast.error(response.message);
        setIsRegistering(false)
    }

    if (auth.user) {
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

                <div className='loginRight'>
                    <form onSubmit={handleSubmit} className='registerBox'>
                        <input placeholder='Name' name='name' type='text' className='loginInput' {...name} />
                        <input placeholder='Email' name='email' type='email' className='loginInput' {...email} />
                        <input placeholder='Password' name='password' type='password' className='loginInput' {...password} />
                        <input placeholder='Confirm Password' name='confirm_password'  type='password' className='loginInput' {...confirmPassword} />
                        <button type='submit' className='loginButton'>{isRegistering?'Signing up...':'Sign up'}</button>
                        <Link to='/login' className='registerLink'>
                            <button type='button' className='loginRegisterButton'>
                                Login into Account
                            </button>
                        </Link>
                    </form>

                </div>

            </div>

        </div>
    );
}

export default Register;
