import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signup } from '../../api';
import { useAuth } from '../../hooks/authHook';
import { useFormik } from 'formik';
import './register.css'
import { signUpSchema } from '../../schemas';

const initialValues={
    name:"",
    email:"",
    password:"",
    confirm_password:"",
}

const Register = () => {
    const [isRegistering, setIsRegistering]=useState(false);
    const auth=useAuth();
    const navigate=useNavigate();

    const {values, errors, touched, handleBlur, handleChange, handleSubmit}=useFormik({
        initialValues:initialValues,
        validationSchema:signUpSchema,
        onSubmit:async(values, action)=>{
            setIsRegistering(true);
            const response = await signup(values.name, values.email, values.password, values.confirm_password);
            if (response.success) {
                toast.success("You are registered successfully");
                navigate('/login')
            }
            toast.error(response.message);
            setIsRegistering(false)
            action.resetForm()
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

                <div className='loginRight'>
                    <form onSubmit={handleSubmit} className='registerBox'>
                        <input placeholder='Name' name='name' type='text' className='loginInput' 
                        value={values.name} onChange={handleChange} onBlur={handleBlur} autoComplete="off" />
                         {errors.name && touched.name ?<p className='input-error'>{errors.name}</p>:null}
                        <input placeholder='Email' name='email' type='email' className='loginInput'
                            value={values.email} onChange={handleChange} onBlur={handleBlur} autoComplete="off"
                        />
                        {errors.email && touched.email ? <p className='input-error'>{errors.email}</p> :null}
                        <input placeholder='Password' name='password' type='password' className='loginInput'
                            value={values.password} onChange={handleChange} onBlur={handleBlur} autoComplete="off"
                        />
                        {errors.password && touched.password ? <p className='input-error'>{errors.password}</p> :null}
                        <input placeholder='Confirm Password' name='confirm_password'  type='password' className='loginInput'
                            value={values.confirm_password} onChange={handleChange} onBlur={handleBlur} autoComplete="off" />
                        {errors.confirm_password && touched.confirm_password ? <p className='input-error'>{errors.confirm_password}</p> :null}
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
