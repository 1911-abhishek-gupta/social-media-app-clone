import React, { useContext, useRef } from 'react'
import "./login.css"
import { loginCall } from '../../apiCalls';
import { AuthContext } from '../../context/AuthContext';
import CircularProgress from '@mui/material/CircularProgress';
import { Link } from 'react-router-dom';

const Login = () => {
    const email = useRef();
    const password = useRef();

    const  {user,isFetching, error , dispatch} = useContext(AuthContext)


    const handleClick = (e) => {
        e.preventDefault();
        loginCall({email:email.current.value,password:password.current.value},dispatch)

    }

    console.log(user);
    return (
        <div className='login'>
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">SocialApp</h3>
                    <span className="loginDesc">
                        Connect with friends and the worls around you on SocialApp
                    </span>
                </div>
                <div className="loginRight">
                <div className="loginBox">
                    <form className="loginBox" onSubmit={handleClick}>
                        <input placeholder='Email' type='email' required className="loginInput" ref={email} />
                        <input placeholder='Password' type='password' required minLength="6" className="loginInput" ref={password} />
                        <button className="loginButton" type='submit' disabled={isFetching}>{isFetching ? <CircularProgress color="inherit" /> : "Log In"}</button>
                        <span className="loginForgot">Forgot Password?</span>
                    <Link to="/register">
                        <button className="loginRegistorButton">{isFetching ? <CircularProgress color="inherit" /> : "Create a new Account"}</button>
                    </Link>
                    </form>
                </div>
                </div>
            </div>

        </div>
    )
}

export default Login