import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import DefaultLayout from '~/layouts';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        let Layout = DefaultLayout;

                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }

                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>

                {/* ✅ Đây là ToastContainer bạn cần thêm */}
                <ToastContainer position="top-center" autoClose={2000} />
            </div>
        </Router>
    );
}

export default App;








// import { Fragment, useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { publicRoutes } from '~/routes';
// import { DefaultLayout, HeaderOnly } from '~/layouts';
// import config from '~/config';

// function App() {
//   const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
//   useEffect(() => {
//     const onResize = () => setIsMobile(window.innerWidth <= 768);
//     window.addEventListener('resize', onResize);
//     return () => window.removeEventListener('resize', onResize);
//   }, []);

//   return (
//     <Router>
//       <Routes>
//         {publicRoutes.map((route, idx) => {
//           const Page = route.component;
//           let Layout;

//           // 1. ưu tiên bắt mobile + profileById
//           if (isMobile && route.path === config.routes.profileById) {
//             Layout = HeaderOnly;
//           }
//           // 2. nếu route.layout === null  ⇒ không wrapper
//           else if (route.layout === null) {
//             Layout = Fragment;
//           }
//           // 3. nếu route.layout được gán (ví dụ HeaderOnly mặc định)
//           else if (route.layout) {
//             Layout = route.layout;
//           }
//           // 4. còn lại dùng DefaultLayout
//           else {
//             Layout = DefaultLayout;
//           }

//           return (
//             <Route
//               key={idx}
//               path={route.path}
//               element={
//                 <Layout>
//                   <Page />
//                 </Layout>
//               }
//             />
//           );
//         })}
//       </Routes>
//     </Router>
//   );
// }

// export default App;
