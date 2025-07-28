import React, { useState } from 'react';
import axios from 'axios';
import '../Login/Login.scss'; // Dùng lại SCSS từ Login

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function Register() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        repassword: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showRePassword, setShowRePassword] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const togglePassword = () => {
        setShowPassword((prev) => !prev);
    };

    const toggleRePassword = () => {
        setShowRePassword((prev) => !prev);
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.repassword) {
            alert('Mật khẩu không khớp!');
            return;
        }

        try {
            // await axios.post(`${process.env.REACT_APP_API_BASE}/auth/register`, {
            await axios.post('${process.env.REACT_APP_API_BASE}/auth/register', {

                username: formData.username,
                email: formData.email,
                password: formData.password,
                avatarUrl: `https://i.pravatar.cc/150?u=${formData.username}`,
                bio: "Hello! I'm new here",
            });

            alert('Đăng ký thành công!');
            window.location.href = '/login'; // 👉 Chuyển về trang login
        } catch (err) {
            alert('Đăng ký thất bại: ' + (err.response?.data?.message || 'Lỗi'));
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
                    <form onSubmit={handleRegister}>
                        <h2>Register</h2>
                        <input
                            type="text"
                            name="username"
                            placeholder="USERNAME"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="E-MAIL"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <div className="input-wrapper">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                placeholder="PASSWORD"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            <span className="toggle-password" onClick={togglePassword}>
                                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                            </span>
                        </div>
                        <div className="input-wrapper">
                            <input
                                type={showRePassword ? 'text' : 'password'}
                                name="repassword"
                                placeholder="RE-PASSWORD"
                                value={formData.repassword}
                                onChange={handleChange}
                                required
                            />
                            <span className="toggle-password" onClick={toggleRePassword}>
                                <FontAwesomeIcon icon={showRePassword ? faEyeSlash : faEye} />
                            </span>
                        </div>
                        <button type="submit">SIGN UP</button>
                        <p className="switch-link">
                            Already have an account? <a href="/login">Sign in</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;
