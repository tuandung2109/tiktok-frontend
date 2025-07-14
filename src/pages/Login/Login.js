import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import './Login.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const redirectPath = new URLSearchParams(location.search).get('redirect') || '/';

    const togglePassword = () => {
        setShowPassword((prev) => !prev);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_BASE}/auth/login`, {
                email,
                password,
            });

            localStorage.setItem('user', JSON.stringify(res.data)); // ✅ Lưu user vào localStorage

            
            navigate(redirectPath); // ✅ Redirect
        } catch (err) {
            alert('Đăng nhập thất bại: ' + (err.response?.data?.message || 'Lỗi'));
        }
    };

    return (
        <div className="login-wrapper">
            <div className="login-container">
                <div
                    className="login-left"
                    style={{
                        backgroundImage: 'url("/images/HinhNenTikTok.jpg")',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <div className="login-right">
                    <form onSubmit={handleLogin}>
                        <h2>Login</h2>
                        <input
                            type="email"
                            placeholder="E-MAIL"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <div className="input-wrapper">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="PASSWORD"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <span className="toggle-password" onClick={togglePassword}>
                                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                            </span>
                        </div>
                        <button type="submit">SIGN IN</button>
                        <p className="switch-link">
                            Not a member? <a href="/register">Sign up</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
