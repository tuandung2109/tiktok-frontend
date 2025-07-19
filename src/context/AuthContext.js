// import React, { createContext, useState, useEffect } from 'react';

// // 1. Tạo Context object
// export const AuthContext = createContext();

// // 2. Tạo Provider Component
// export const AuthProvider = ({ children }) => {
//   // State để lưu thông tin người dùng hiện tại
//   // Ban đầu, thử lấy thông tin user từ localStorage (nếu có)
//   const [user, setUser] = useState(() => {
//     try {
//       const storedUser = localStorage.getItem('user');
//       return storedUser ? JSON.parse(storedUser) : null;
//     } catch (error) {
//       console.error("Failed to parse user from localStorage", error);
//       return null;
//     }
//   });

//   // useEffect để lưu user vào localStorage mỗi khi user thay đổi
//   useEffect(() => {
//     if (user) {
//       localStorage.setItem('user', JSON.stringify(user));
//     } else {
//       localStorage.removeItem('user');
//     }
//   }, [user]);

//   // Hàm để đăng nhập người dùng
//   const login = (userData) => {
//     // userData sẽ chứa { _id, username, email, avatarUrl, displayName, token, ... }
//     setUser(userData);
//   };

//   // Hàm để đăng xuất người dùng
//   const logout = () => {
//     setUser(null);
//     // Có thể xóa thêm token từ localStorage nếu bạn lưu riêng
//   };

//   // Giá trị sẽ được cung cấp cho tất cả các component con
//   const contextValue = {
//     user,       // Thông tin người dùng hiện tại (null nếu chưa đăng nhập)
//     login,      // Hàm để đăng nhập
//     logout      // Hàm để đăng xuất
//   };

//   return (
//     <AuthContext.Provider value={contextValue}>
//       {children}
//     </AuthContext.Provider>
//   );
// };