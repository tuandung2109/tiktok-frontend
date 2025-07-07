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
    UserGroupActiveIcon,
    FollowingIcon, // Thêm vào đây
    MoreIcon, // Thêm vào đây
} from '~/components/Icons';
import SuggestedAccounts from '~/components/SuggestedAccounts';
import config from '~/config';


const cx = classNames.bind(styles);

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

                {/* Thêm icon More bên dưới LIVE */}
                <MenuItem
                    title="More"
                    to={config.routes.more}
                    icon={<MoreIcon />}
                    activeIcon={<MoreIcon color="#ff0050" />}
                />
            </Menu>

            <SuggestedAccounts label="Suggested accounts" />
            <SuggestedAccounts label="Following accounts" />
        </aside>
    );
}

export default Sidebar;
