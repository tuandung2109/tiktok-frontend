import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'; // ✅ Thêm

import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountPreview from './AccountPreview/AccountPreview';
import styles from './SuggestedAccounts.module.scss';

const cx = classNames.bind(styles);

function AccountItem({ data }) {
    const navigate = useNavigate(); // ✅ hook điều hướng

    const renderPreview = (props) => (
        <div tabIndex="-1" {...props}>
            <PopperWrapper>
                <AccountPreview data={data} />
            </PopperWrapper>
        </div>
    );

    return (
        <Tippy
            interactive
            delay={[800, 0]}
            offset={[-20, 0]}
            placement="bottom"
            render={renderPreview}
        >
            <div
                className={cx('account-item')}
                onClick={() => navigate(`/profile/${data._id}`)} // ✅ click cả dòng
                style={{ cursor: 'pointer' }}
            >
                <img
                    className={cx('avatar')}
                    src={data.avatarUrl}
                    alt={data.username}
                    onError={(e) => { e.target.src = 'https://i.pravatar.cc/150?img=999'; }}
                />
                <div className={cx('item-info')}>
                    <p className={cx('nickname')}>
                        <strong>{data.username}</strong>
                        {data.tick && (
                            <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                        )}
                    </p>
                    <p className={cx('name')}>@{data.username}</p>
                </div>
            </div>
        </Tippy>
    );
}

AccountItem.propTypes = {
    data: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        avatarUrl: PropTypes.string,
        tick: PropTypes.bool,
    }).isRequired,
};

export default AccountItem;
