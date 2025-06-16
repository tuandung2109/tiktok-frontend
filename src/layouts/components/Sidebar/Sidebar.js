// import classNames from 'classnames/bind';
// import styles from './Sidebar.module.scss';
// import Menu, { MenuItem } from './Menu';
// import {
//     HomeIcon,
//     HomeActiveIcon,
//     UserGroupIcon,
//     UserGroupActiveIcon,
//     LiveIcon,
//     LiveActiveIcon,
//     ExploreIcon,
//     ExploreActiveIcon, // ✅ thêm dòng này
// } from '~/components/Icons';
// import SuggestedAccounts from '~/components/SuggestedAccounts';
// import config from '~/config';
// // import { MdOutlineExplore } from 'react-icons/md'; // ✅ Icon Explore từ react-icons

// const cx = classNames.bind(styles);

// function Sidebar() {
//     return (
//         <aside className={cx('wrapper')}>
//             <Menu>
//                 <MenuItem title="For You" to={config.routes.home} icon={<HomeIcon />} activeIcon={<HomeActiveIcon />} />

//                 <MenuItem
//                     title="Explore"
//                     to={config.routes.explore}
//                     icon={<ExploreIcon />}
//                     activeIcon={<ExploreActiveIcon />}
//                 />

//                 <MenuItem
//                     title="Following"
//                     to={config.routes.following}
//                     icon={<UserGroupIcon />}
//                     activeIcon={<UserGroupActiveIcon />}
//                 />
//                 <MenuItem title="LIVE" to={config.routes.live} icon={<LiveIcon />} activeIcon={<LiveActiveIcon />} />
//             </Menu>

//             {/* <SuggestedAccounts label="Suggested accounts" /> */}
//             <SuggestedAccounts label="Following accounts" />
//         </aside>
//     );
// }

// export default Sidebar;

import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import Menu, { MenuItem } from './Menu';
import {
    HomeIcon,
    HomeActiveIcon,
    LiveIcon,
    LiveActiveIcon,
    ExploreIcon,
    ExploreActiveIcon,
    UserGroupIcon,
    UserGroupActiveIcon, // Dùng cho mục Friends
} from '~/components/Icons';
import SuggestedAccounts from '~/components/SuggestedAccounts';
import config from '~/config';
import { RiUserFollowLine } from 'react-icons/ri';

const cx = classNames.bind(styles);

// Component icon Following mới
const FollowingIcon = ({ width = '3.2rem', height = '3.2rem', className, color = '#333' }) => (
    <div
        className={className}
        style={{ width, height, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
        <RiUserFollowLine style={{ color, fontSize: '28px' }} />
    </div>
);

function Sidebar() {
    return (
        <aside className={cx('wrapper')}>
            <Menu>
                <MenuItem title="For You" to={config.routes.home} icon={<HomeIcon />} activeIcon={<HomeActiveIcon />} />

                <MenuItem
                    title="Explore"
                    to={config.routes.explore}
                    icon={<ExploreIcon />}
                    activeIcon={<ExploreActiveIcon />}
                />

                <MenuItem
                    title="Following"
                    to={config.routes.following}
                    icon={<FollowingIcon />}
                    activeIcon={<FollowingIcon color="#ff0050" />}
                />

                <MenuItem
                    title="Friends"
                    to={config.routes.friends}
                    icon={<UserGroupIcon />}
                    activeIcon={<UserGroupActiveIcon />}
                />

                <MenuItem title="LIVE" to={config.routes.live} icon={<LiveIcon />} activeIcon={<LiveActiveIcon />} />
            </Menu>

            <SuggestedAccounts label="Following accounts" />
        </aside>
    );
}

export default Sidebar;
