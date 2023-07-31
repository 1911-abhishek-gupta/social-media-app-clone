import React, { useRef } from 'react'
import "./register.css"
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

const Register = () => {

    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordAgain = useRef();

    const navigate = useNavigate();
    
    const handleClick = async (e) => {
        e.preventDefault();
        if(passwordAgain.current.value!==password.current.value){
            passwordAgain.current.setCustomValidity("passwords don't match!")
        }else{
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,
            }
            try{
                 await axios.post("/auth/register",user);
                 navigate("/login");
            }catch(err){
                console.log(err);
            }
        }
    }

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
                <input placeholder='Username' required ref={username} className="loginInput" />
                <input placeholder='Email' required ref={email}  className="loginInput" type='email'/>
                <input placeholder='Password' required ref={password} className="loginInput" type='password' minLength={"6"} />
                <input placeholder='Password Again' required ref={passwordAgain} className="loginInput" type='password' minLength={"6"}/>
                <button className="loginButton" type='submit'>Sign up</button>
            </form>
            <Link to="/login">
            <button className="loginRegistorButton" >Log into your Acconunt</button>
            </Link>
        </div>
        </div>
    </div>
    
    </div>
  )
}

export default Register