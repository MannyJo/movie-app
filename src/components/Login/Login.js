import React, { useState } from 'react';
import { serverAxios } from '../../axios';

const Login = () => {
    serverAxios.defaults.headers['Authorization'] = '';
    const [email, setEmail] = useState('jomansang@gmail.com');
    const [password, setPassword] = useState('1111');
    const [warning, setWarning] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [isHidden, setIsHidden] = useState(true);
    const [response, setResponse] = useState('Please check your Email or Password');

    const handleLogin = () => e => {
        e.preventDefault();

        serverAxios.post(`/api/user/login/`, { username: email, password })
        .then(results => {
            const token = results.data.token;
            window.sessionStorage.setItem('token', token);
            window.location.pathname = '/';
        }).catch(err => {
            console.log('Error with getting user :', err);
            setWarning('warning');
        });
    }

    const handleJoin = () => e => {
        e.preventDefault();

        serverAxios.post(`/api/user/register/`, { username: email, email, password })
        .then(results => {
            if(results.data.response) {
                setWarning('warning');
                setResponse(results.data.response);
            } else {
                const token = results.data.token;
                window.sessionStorage.setItem('token', token);
                window.location.pathname = '/';
            }
        }).catch(err => {
            console.log('Error with getting user :', err);
            setWarning('warning');
            setResponse('Please check your Email or Password');
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
            default:
                break;
        }
    }

    const handleClickTogglePassword = () => e => {
        e.preventDefault();
        setIsHidden(!isHidden);
    }

    return (
        <div className="login-container">
            {
                isLogin === true ?
                <div>
                    <h1>Login</h1>
                    <form onSubmit={handleLogin()}>
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
                        <div className={`login-login-failed ${warning}`}>
                            {response}
                        </div>
                        <div className="login-btn">
                            <button type="submit">Login</button>
                        </div>
                    </form>
                    <p>
                        Not a user?&nbsp;
                        <span onClick={() => setIsLogin(false)}>
                            <strong>Join</strong>
                        </span>
                    </p>
                </div> :
                <div>
                    <h1>Join</h1>
                    <form onSubmit={handleJoin()}>
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
                            <div className="password-container">
                                <input 
                                    type={isHidden ? 'password' : 'text'}
                                    name="password"
                                    value={password} 
                                    onChange={handleChange('password')}
                                    placeholder="password" 
                                    required
                                />
                                <button 
                                    className="password-toggle"
                                    onClick={handleClickTogglePassword()}
                                    type="button"
                                >
                                    {isHidden ? 'show' : 'hide'}
                                </button>
                            </div>
                        </label>
                        <div className={`login-login-failed ${warning}`}>
                            {response}
                        </div>
                        <div className="login-btn">
                            <button type="submit">Join</button>
                        </div>
                    </form>
                    <p>
                        Already on MyMovie?&nbsp;
                        <span onClick={() => setIsLogin(true)}>
                            <strong>Login</strong>
                        </span>
                    </p>
                </div>
            }
        </div>
    )
}

export default Login;