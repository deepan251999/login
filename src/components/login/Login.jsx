import React from 'react';
import './Login.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailErrorRequired, setEmailErrorRequired] = useState(false);
    const [passwordErrorRequired, setPasswordErrorRequired] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const navigate = useNavigate();

    const handleEmail = (event) => {
        setEmail(event.target.value);
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    const handleValidate = () => {
        if (email === '') {
            setEmailErrorRequired(true);
            setEmailError(false);
        } else {
            setEmailErrorRequired(false);
        }
        if (password === '') {
            setPasswordErrorRequired(true);
            setPasswordError(false);
        } else {
            setPasswordErrorRequired(false);
        }
    }

    useEffect(() => {
        if (localStorage.getItem('auth')) navigate('/home')
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        const postData = { email: event.target.email.value, password: event.target.password.value };
        console.log(postData);
        axios.post('http://ticket-shop-stage.us-west-2.elasticbeanstalk.com/api/login', postData)
            .then((res) => {
                console.log(res);
                alert(res.data.message);
                navigate('/home')
                localStorage.setItem('auth', true)
            })
            .catch((err) => {
                console.log(err);
                alert(err.message);
                setEmailError(true);
                setPasswordError(true);
            });
    }

    return (
        <>
            <div className='login_container'>
                <div className='login_item_image'>
                    <h1>Login Page</h1>
                </div>

                <div className='login_item_inputs'>
                    <form onSubmit={handleSubmit} className='login_form'>
                        <div className='login_input_container'>
                            <label htmlFor="email">Email</label>
                            <input type="email" id='email' onChange={handleEmail} value={email} placeholder='Email' required />
                            {emailErrorRequired && <p>Email id is Required</p>}
                            {emailError && <p>Invalid email id</p>}
                        </div>
                        <div className='login_input_container'>
                            <label htmlFor="Password">Password</label>
                            <input type='password' id='password' onChange={handlePassword} value={password} placeholder='Password' required />
                            {passwordErrorRequired && <p>Password is Required</p>}
                            {passwordError && <p>Invalid password</p>}
                        </div>
                        <div className='login_btn_container'>
                            <button onClick={handleValidate}>Submit</button>
                        </div>
                    </form>
                </div>

            </div>
        </>
    )
}

export default Login;