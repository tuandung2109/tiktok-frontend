import PropTypes from 'prop-types';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import Image from '~/components/Image';
import styles from './AccountItem.module.scss';

const cx = classNames.bind(styles);

function AccountItem({ data, onClick }) {
    return (
        <Link
            to={`/profile/${data._id}`}
            className={cx('wrapper')}
            onClick={onClick} // ✅ gắn hàm xử lý
        >
            <Image
                className={cx('avatar')}
                src={data.avatarUrl || data.avatar}
                alt={data.full_name || data.name || data.username}
            />
            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    <span>{data.full_name || data.name || data.username}</span>
                    {data.tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
                </h4>
                <span className={cx('username')}>@{data.username}</span>
            </div>
        </Link>
    );
}

AccountItem.propTypes = {
    data: PropTypes.object.isRequired,
    onClick: PropTypes.func, // ✅ thêm validate prop
};


export default AccountItem;