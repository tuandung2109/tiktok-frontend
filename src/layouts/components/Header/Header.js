// import classNames from 'classnames/bind';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
//     faCircleQuestion,
//     faCoins,
//     faEarthAsia,
//     faEllipsisVertical,
//     faGear,
//     faKeyboard,
//     faSignOut,
//     faUser,
// } from '@fortawesome/free-solid-svg-icons';
// import { Link, useNavigate } from 'react-router-dom';
// import Tippy from '@tippyjs/react';
// import 'tippy.js/dist/tippy.css';

// import config from '~/config';
// import Button from '~/components/Button';
// import styles from './Header.module.scss';
// import images from '~/assets/images';
// import Menu from '~/components/Popper/Menu';
// import { InboxIcon, MessageIcon, UploadIcon } from '~/components/Icons';
// import Image from '~/components/Image';
// import Search from '../Search';

// const cx = classNames.bind(styles);

// const MENU_ITEMS = [
//     {
//         icon: <FontAwesomeIcon icon={faEarthAsia} />,
//         title: 'English',
//         children: {
//             title: 'Language',
//             data: [
//                 { type: 'language', code: 'en', title: 'English' },
//                 { type: 'language', code: 'vi', title: 'Tiếng Việt' },
//             ],
//         },
//     },
//     {
//         icon: <FontAwesomeIcon icon={faCircleQuestion} />,
//         title: 'Feedback and help',
//         to: '/feedback',
//     },
//     {
//         icon: <FontAwesomeIcon icon={faKeyboard} />,
//         title: 'Keyboard shortcuts',
//     },
// ];

// function Header() {
//     const navigate = useNavigate();
//     const user = JSON.parse(localStorage.getItem('user'));
//     const currentUser = !!user;

//     const handleMenuChange = (menuItem) => {
//         switch (menuItem.type) {
//             case 'language':
//                 break;
//             case 'logout':
//                 localStorage.removeItem('user');
//                 navigate('/login');
//                 window.location.reload(); // Reload sau khi logout
//                 break;
//             default:
//         }
//     };

//     // ✅ Hàm xử lý khi bấm vào logo → reload toàn bộ app về trang Home
//     const handleLogoClick = (e) => {
//         e.preventDefault(); // Chặn điều hướng mặc định của Link
//         window.location.href = '/'; // Chuyển về trang chủ và reload toàn bộ
//     };

//     const userMenu = [
//         {
//             icon: <FontAwesomeIcon icon={faUser} />,
//             title: 'View profile',
//             to: '/@' + (user?.username || 'user'),
//         },
//         {
//             icon: <FontAwesomeIcon icon={faCoins} />,
//             title: 'Get coins',
//             to: '/coin',
//         },
//         {
//             icon: <FontAwesomeIcon icon={faGear} />,
//             title: 'Settings',
//             to: '/settings',
//         },
//         ...MENU_ITEMS,
//         {
//             icon: <FontAwesomeIcon icon={faSignOut} />,
//             title: 'Log out',
//             type: 'logout',
//             separate: true,
//         },
//     ];

//     return (
//         <header className={cx('wrapper')}>
//             <div className={cx('inner')}>
//                 {/* ✅ Bấm vào logo → reload toàn bộ app về trang Home */}
//                 <Link to="/" className={cx('logo-link')} onClick={handleLogoClick}>
//                     <img src={images.logo} alt="Tiktok" />
//                 </Link>

//                 <Search />

//                 <div className={cx('actions')}>
//                     {currentUser ? (
//                         <>
//                             <Tippy delay={[0, 50]} content="Upload video" placement="bottom">
//                                 <button className={cx('action-btn')} onClick={() => navigate('/upload')}>
//                                     <UploadIcon />
//                                 </button>
//                             </Tippy>
//                             <Tippy delay={[0, 50]} content="Message" placement="bottom">
//                                 <Link to="/messages" className={cx('action-btn')}>
//                                     <MessageIcon />
//                                 </Link>
//                             </Tippy>
//                             <Tippy delay={[0, 50]} content="Inbox" placement="bottom">
//                                 <button className={cx('action-btn')}>
//                                     <InboxIcon />
//                                     <span className={cx('badge')}>12</span>
//                                 </button>
//                             </Tippy>
//                         </>
//                     ) : (
//                         <>
//                             <Button text>Upload</Button>
//                             <Button primary onClick={() => navigate(`/login?redirect=${window.location.pathname}`)}>
//                                 Log in
//                             </Button>
//                         </>
//                     )}

//                     <Menu items={currentUser ? userMenu : MENU_ITEMS} onChange={handleMenuChange}>
//                         {currentUser ? (
//                             <Image
//                                 className={cx('user-avatar')}
//                                 src={user?.avatarUrl || '/images/default-avatar.png'}
//                                 alt={user?.username || 'user'}
//                             />
//                         ) : (
//                             <button className={cx('more-btn')}>
//                                 <FontAwesomeIcon icon={faEllipsisVertical} />
//                             </button>
//                         )}
//                     </Menu>
//                 </div>
//             </div>
//         </header>
//     );
// }

// export default Header;













import PropTypes from 'prop-types';
import { useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEllipsisVertical,
  faCircleQuestion,
  faCoins,
  faEarthAsia,
  faKeyboard,
  faSignOut,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { HiOutlineMenu } from 'react-icons/hi';

import Button from '~/components/Button';
import Menu from '~/components/Popper/Menu';
import Search from '../Search';           // ← Đảm bảo import Search
import Image from '~/components/Image';
import { InboxIcon, MessageIcon, UploadIcon } from '~/components/Icons';
import images from '~/assets/images';
import styles from './Header.module.scss';

const cx = classNames.bind(styles);

const MENU_ITEMS = [
  {
    icon: <FontAwesomeIcon icon={faEarthAsia} />,
    title: 'English',
    children: {
      title: 'Language',
      data: [
        { type: 'language', code: 'en', title: 'English' },
        { type: 'language', code: 'vi', title: 'Tiếng Việt' },
      ],
    },
  },
  {
    icon: <FontAwesomeIcon icon={faCircleQuestion} />,
    title: 'Feedback and help',
    to: '/feedback',
  },
  {
    icon: <FontAwesomeIcon icon={faKeyboard} />,
    title: 'Keyboard shortcuts',
  },
];

function Header({ onMenuToggle }) {
  const [panelOpen, setPanelOpen] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const currentUser = Boolean(user);

  const togglePanel = () => setPanelOpen((o) => !o);

  const handleMenuChange = (menuItem) => {
    if (menuItem.type === 'logout') {
      localStorage.removeItem('user');
      navigate('/login');
      window.location.reload();
    }
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    window.location.href = '/';
  };

  const userMenu = [
    {
      icon: <FontAwesomeIcon icon={faUser} />,
      title: 'View profile',
      to: `/@${user?.username || 'user'}`,
    },
    {
      icon: <FontAwesomeIcon icon={faCoins} />,
      title: 'Get coins',
      to: '/coin',
    },
    {
      icon: <FontAwesomeIcon icon={faSignOut} />,
      title: 'Settings',
      to: '/settings',
    },
    ...MENU_ITEMS,
    {
      icon: <FontAwesomeIcon icon={faSignOut} />,
      title: 'Log out',
      type: 'logout',
      separate: true,
    },
  ];

  const renderActions = (
    <>
      {currentUser ? (
        <>
          <Tippy delay={[0, 50]} content="Upload video" placement="bottom">
            <button className={cx('action-btn')} onClick={() => navigate('/upload')}>
              <UploadIcon />
            </button>
          </Tippy>
          <Tippy delay={[0, 50]} content="Message" placement="bottom">
            <Link to="/messages" className={cx('action-btn')}>
              <MessageIcon />
            </Link>
          </Tippy>
          <Tippy delay={[0, 50]} content="Inbox" placement="bottom">
            <button className={cx('action-btn')}>
              <InboxIcon />
              <span className={cx('badge')}>12</span>
            </button>
          </Tippy>
        </>
      ) : (
        <>
          <Button text>Upload</Button>
          <Button primary onClick={() => navigate(`/login?redirect=${window.location.pathname}`)}>
            Log in
          </Button>
        </>
      )}
      <Menu items={currentUser ? userMenu : MENU_ITEMS} onChange={handleMenuChange}>
        {currentUser ? (
          <Image
            className={cx('user-avatar')}
            src={user?.avatarUrl || '/images/default-avatar.png'}
            alt={user?.username || 'user'}
          />
        ) : (
          <button className={cx('more-btn')}>
            <FontAwesomeIcon icon={faEllipsisVertical} />
          </button>
        )}
      </Menu>
    </>
  );

  return (
    <header className={cx('wrapper')}>
      <div className={cx('inner')}>
        {/* Sidebar Hamburger */}
        <button className={cx('hamburger')} onClick={onMenuToggle}>
          <HiOutlineMenu size={24} />
        </button>

        {/* Logo */}
        <Link to="/" className={cx('logo-link')} onClick={handleLogoClick}>
          <img src={images.logo} alt="TikTok Clone" />
        </Link>

        <div className={cx('search-form')}>
            <Search />
        </div>



        {/* Desktop: luôn hiển thị Search + Actions */}
        <div className={cx('wide')}>
          {/* <Search /> */}
          <div className={cx('actions')}>{renderActions}</div>
        </div>

        {/* Tablet/Mobile: nút toggle panel */}
        <button className={cx('toggle-panel-btn')} onClick={togglePanel}>
          <FontAwesomeIcon icon={faEllipsisVertical} />
        </button>
      </div>

      {/* Slide‑in panel chứa cả Search + Actions */}
      <div className={cx('panel', { open: panelOpen })}>
        <Search />
        <div className={cx('actions')}>{renderActions}</div>
      </div>
    </header>
  );
}

Header.propTypes = {
  onMenuToggle: PropTypes.func.isRequired,
};

export default Header;




