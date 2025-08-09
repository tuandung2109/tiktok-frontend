import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Thêm navigate

import Button from '~/components/Button';
import styles from './AccountPreview.module.scss';

const cx = classNames.bind(styles);

function AccountPreview({ data }) {
    const [stats, setStats] = useState({ followers: 0, likes: 0 });
    const [isFollowing, setIsFollowing] = useState(false);

    const navigate = useNavigate(); // ✅ hook điều hướng

    const storedUser = JSON.parse(localStorage.getItem('user'));
    const storedUserId = storedUser?._id;
    const userId = data._id;

    // Lấy stats từ backend
    useEffect(() => {
        if (userId) {
            fetch(`${process.env.REACT_APP_API_BASE}/users/${userId}/stats`)
                .then((res) => res.json())
                .then((data) => setStats(data))
                .catch((err) => console.error('❌ Lỗi lấy stats:', err));
        }
    }, [userId]);

    // Kiểm tra trạng thái follow
    useEffect(() => {
        if (storedUserId && userId && storedUserId !== userId) {
            fetch(`${process.env.REACT_APP_API_BASE}/follows/check`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    followerId: storedUserId,
                    followingId: userId,
                }),
            })
                .then((res) => res.json())
                .then((data) => setIsFollowing(data.isFollowing))
                .catch((err) => console.error('❌ Lỗi check follow:', err));
        }
    }, [storedUserId, userId]);

    const handleFollowToggle = () => {
        if (!storedUserId || !userId) return;

        const url = `${process.env.REACT_APP_API_BASE}/follows`;
        const method = isFollowing ? 'DELETE' : 'POST';

        fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ followerId: storedUserId, followingId: userId }),
        })
            .then(() => setIsFollowing(!isFollowing))
            .catch((err) => console.error('❌ Lỗi toggle follow:', err));
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <img
                    className={cx('avatar')}
                    src={data.avatarUrl}
                    alt={data.username}
                    onClick={() => navigate(`/profile/${userId}`)} // ✅ Click avatar → profile
                    onError={(e) => {
                        e.target.src = 'https://i.pravatar.cc/150?img=999';
                    }}
                    style={{ cursor: 'pointer' }} // 👈 pointer
                />
                {storedUserId !== userId && (
                    <Button
                        className={cx('follow-btn', { 'following-btn': isFollowing })}
                        primary={!isFollowing}
                        onClick={handleFollowToggle}
                    >
                        {isFollowing ? 'Following' : 'Follow'}
                    </Button>
                )}
            </div>
            <div className={cx('body')}>
                <p
                    className={cx('nickname')}
                    onClick={() => navigate(`/profile/${userId}`)} // ✅ Click nickname → profile
                    style={{ cursor: 'pointer' }}
                >
                    <strong>{data.username}</strong>
                    {data.tick && (
                        <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                    )}
                </p>
                <p className={cx('name')}>@{data.username}</p>
                <p className={cx('analytics')}>
                    <strong className={cx('value')}>{stats.followers}</strong>{' '}
                    <span className={cx('label')}>Followers</span>
                    <strong className={cx('value')}>{stats.likes}</strong>{' '}
                    <span className={cx('label')}>Likes</span>
                </p>
            </div>
        </div>
    );
}

AccountPreview.propTypes = {
    data: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        avatarUrl: PropTypes.string,
        tick: PropTypes.bool,
    }).isRequired,
};

export default AccountPreview;
