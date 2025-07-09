// import React, { useState } from 'react';
// import './Login.scss';

// function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = (e) => {
//     e.preventDefault();
//     console.log('Đăng nhập với', email, password);
//   };

//   return (
//     <div className="login-wrapper">
//       <div className="login-container">
//         {/* Ảnh nền đặt trực tiếp bằng inline style */}
//         <div
//           className="login-left"
//           style={{
//             backgroundImage: 'url("/images/HinhNenTikTok.jpg")',
//             backgroundSize: 'cover',
//             backgroundPosition: 'center',
//           }}
//         />
//         <div className="login-right">
//           <form onSubmit={handleLogin}>
//             <h2>Login</h2>
//             <input
//               type="email"
//               placeholder="E-MAIL"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//             <input
//               type="password"
//               placeholder="PASSWORD"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//             <button type="submit">SIGN IN</button>
//             <p className="switch-link">
//               Not a member? <a href="/register">Sign up</a>
//             </p>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;





// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './Login.scss';

// function Login() {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const navigate = useNavigate();

//     const handleLogin = async (e) => {
//         e.preventDefault();
//         try {
//             const res = await axios.post('http://localhost:5000/auth/login', {
//                 email,
//                 password,
//             });

//             localStorage.setItem('user', JSON.stringify(res.data));
//             navigate('/');
//         } catch (err) {
//             alert('Đăng nhập thất bại: ' + (err.response?.data?.message || 'Lỗi'));
//         }
//     };

//     return (
//         <div className="login-wrapper">
//             <div className="login-container">
//                 <div
//                     className="login-left"
//                     style={{
//                         backgroundImage: 'url("/images/HinhNenTikTok.jpg")',
//                         backgroundSize: 'cover',
//                         backgroundPosition: 'center',
//                     }}
//                 />
//                 <div className="login-right">
//                     <form onSubmit={handleLogin}>
//                         <h2>Login</h2>
//                         <input
//                             type="email"
//                             placeholder="E-MAIL"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             required
//                         />
//                         <input
//                             type="password"
//                             placeholder="PASSWORD"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             required
//                         />
//                         <button type="submit">SIGN IN</button>
//                         <p className="switch-link">
//                             Not a member? <a href="/register">Sign up</a>
//                         </p>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Login;


import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import './Login.scss';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const redirectPath = new URLSearchParams(location.search).get('redirect') || '/';

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/auth/login', {
                email,
                password,
            });

            localStorage.setItem('user', JSON.stringify(res.data));
            navigate(redirectPath);
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
                        <input
                            type="password"
                            placeholder="PASSWORD"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
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

