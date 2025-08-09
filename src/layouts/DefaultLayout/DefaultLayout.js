// import PropTypes from 'prop-types';
// import classNames from 'classnames/bind';
// import Header from '~/layouts/components/Header';
// import Sidebar from '~/layouts/components/Sidebar';
// import styles from './DefaultLayout.module.scss';

// const cx = classNames.bind(styles);

// function DefaultLayout({ children }) {
//     return (
//         <div className={cx('wrapper')}>
//             <Header />
//             <div className={cx('container')}>
//                 <div className={cx('sidebar')}>
//                     <Sidebar />
//                 </div>
//                 <div className={cx('content')}>{children}</div>
//             </div>
//         </div>
//     );
// }

// DefaultLayout.propTypes = {
//     children: PropTypes.node.isRequired,
// };

// export default DefaultLayout;





// import PropTypes from 'prop-types';
// import { useState } from 'react';
// import classNames from 'classnames/bind';

// import Header from '~/layouts/components/Header';
// import Sidebar from '~/layouts/components/Sidebar';

// import styles from './DefaultLayout.module.scss';
// const cx = classNames.bind(styles);

// function DefaultLayout({ children }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const toggleSidebar = () => setIsOpen(prev => !prev);

//   return (
//     <div className={cx('wrapper')}>
//       {/* Nút hamburger ở Header sẽ gọi toggleSidebar */}
//       <Header onMenuToggle={toggleSidebar} />

//       <div className={cx('container')}>
//         {/* Wrapper cho Sidebar, thêm class 'open' khi isOpen === true */}
// {/* Xóa hẳy thẳng div ngoài, chỉ dùng Sidebar */}
// <Sidebar className={isOpen ? 'open' : ''} />


//         {/* Overlay che content khi sidebar đang mở */}
//         {isOpen && <div className={cx('overlay')} onClick={toggleSidebar} />}

//         <div className={cx('content')}>
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// }

// DefaultLayout.propTypes = {
//   children: PropTypes.node.isRequired,
// };

// export default DefaultLayout;



import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import Header from '~/layouts/components/Header';
import Sidebar from '~/layouts/components/Sidebar';
import WelcomeModal from '../../components/WelcomeModal/WelcomeModal';




import styles from './DefaultLayout.module.scss';
const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const toggleSidebar = () => setIsOpen(prev => !prev);
  const handleCloseModal = () => setShowModal(false);

useEffect(() => {
  setShowModal(true); // luôn hiện modal mỗi lần truy cập
}, []);

  return (
    <div className={cx('wrapper')}>
      {showModal && <WelcomeModal onClose={handleCloseModal} />} {/* ✅ Hiển thị modal */}

      <Header onMenuToggle={toggleSidebar} />
      <div className={cx('container')}>
        <Sidebar className={isOpen ? 'open' : ''} />
        {isOpen && <div className={cx('overlay')} onClick={toggleSidebar} />}
        <div className={cx('content')}>
          {children}
        </div>
      </div>
    </div>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DefaultLayout;
