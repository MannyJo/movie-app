import React, { useState } from 'react';
import { serverAxios } from '../../axios';

const SignIn = () => {
    const [email, setEmail] = useState('jomansang@gmail.com');
    const [password, setPassword] = useState('1111');
    const [password2, setPassword2] = useState('');
    const [username, setUsername] = useState('');
    const [warning, setWarning] = useState('');

    const handleSignIn = () => e => {
        e.preventDefault();

        serverAxios.post(`/api/user/login/`, { username:email, password })
        .then(results => {
            const token = results.data.token;
            window.sessionStorage.setItem('token', token);
            window.location.pathname = '/';
        }).catch(err => {
            console.log('Error with getting user :', err);
            setWarning('warning');
        });
    }

    const handleChange = name => e => {
        switch (name) {
            case 'email':
                setEmail(e.target.value);
                break;
            case 'password':
                setPassword(e.target.value);
                break;
            case 'username':
                setUsername(e.target.value);
                break;
            default:
                break;
        }
    }

    return (
        <div className="signin-container">
            <h1>Sign In</h1>
            <form onSubmit={handleSignIn()}>
                <label htmlFor="email">
                    <div>Email</div>
                    <input 
                        type="email"
                        name="email"
                        value={email} 
                        onChange={handleChange('email')}
                        placeholder="email@example.com" 
                        required
                    />
                </label>
                <label htmlFor="password">
                    <div>Password</div>
                    <input 
                        type="password" 
                        name="password"
                        value={password} 
                        onChange={handleChange('password')}
                        placeholder="password" 
                        required
                    />
                </label>
                <div className={`signin-login-failed ${warning}`}>
                    Please check your ID or password.
                </div>
                <div className="signin-btn">
                    <button type="submit">Sign In</button>
                </div>
            </form>
        </div>
    )
}

export default SignIn;