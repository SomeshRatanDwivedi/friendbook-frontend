import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../hooks/authHook';
import { useSocket } from '../../providers/SocketProvider';
import { useFormik } from 'formik';
import { loginSchema } from '../../schemas';
import './login.css'

const initialValues = {
    email: "",
    password: ""
}

const Login = () => {

    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const auth = useAuth();
    const socket = useSocket();

    const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
        initialValues,
        validationSchema:loginSchema,
        onSubmit: async (values, action) => {
            setIsLoggingIn(true);
            const response = await auth.login(values.email, values.password);
            if (response.success) {
                toast.success("You are logged in successfully");
                socket.connect();
                return <Navigate to='/' />
            }
            else {
                toast.error(response.message)
            }
            setIsLoggingIn(false);
            action.resetForm();
        }
    })

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

                <form onSubmit={handleSubmit} className='loginRight'>
                    <div className='loginBox'>
                        <input placeholder='Email' type='email' className='loginInput' name='email'
                            value={values.email} onChange={handleChange} onBlur={handleBlur} autoComplete="off" />
                             {errors.email && touched.email ?<p className='input-error'>{errors.email}</p>:null}
                        <input placeholder='Password' type='password' className='loginInput' name='password'
                            value={values.password} onChange={handleChange} onBlur={handleBlur} autoComplete="off"
                        />
                         {errors.password && touched.password ?<p className='input-error'>{errors.password}</p>:null}
                        <button type='submit' className='loginButton' disabled={isLoggingIn}>{isLoggingIn ? 'Logging In' : 'Log In'}</button>
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
