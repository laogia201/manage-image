import React, { useState, useEffect } from 'react';
import { login, checkLogin } from '../../services/usersService';
import { useNavigate } from 'react-router-dom';
import './style.css';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
import logoLogin from '../../assets/reset-password.png';

alertify.set('notifier', 'position', 'top-right');
const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // useEffect(() => {
    //     const verifyLogin = async () => {
    //         const isLoggedIn = await checkLogin();
    //         if (isLoggedIn.status === 'success') {
    //             navigate('/home');
    //         }
    //     };
    //     verifyLogin();
    // }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await login({ username, password });
            if (response.status === 'success') {
                alertify.success(response.message);
                navigate('/home');
            } else {
                alertify.error(response.message);
            }
        } catch (err) {
            setError('Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleLogin} className="login-form">
                <center>
                    <img className="logo-login" src={logoLogin} alt="Logo" />
                </center>
                <h2>Manage</h2>
                <center><span className="login-title">Welcom to manage. Login to continutes.</span></center>
                {error && <p className="error-message">{error}</p>}
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className='input-login'
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className='input-login'
                    />
                </div>
                <button type="submit" className="login-button">Login</button>
            </form>
        </div>
    );
};

export default Login;