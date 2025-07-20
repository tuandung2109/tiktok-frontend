// import { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
// import classNames from 'classnames/bind';
// import styles from './FollowingAccounts.module.scss';
// import AccountItem from '~/components/SuggestedAccounts/AccountItem'; // dùng lại component sẵn có

// const cx = classNames.bind(styles);

// function FollowingAccounts({ label }) {
//     const [accounts, setAccounts] = useState([]);

//     useEffect(() => {
//         const fetchFollowing = async () => {
//             try {
//                 const res = await fetch('http://localhost:5000/users/following'); // 👉 API danh sách đang follow
//                 const data = await res.json();
//                 setAccounts(data);
//             } catch (err) {
//                 console.error('❌ Lỗi khi fetch following users:', err);
//             }
//         };

//         fetchFollowing();
//     }, []);

//     return (
//         <div className={cx('wrapper')}>
//             <p className={cx('label')}>{label}</p>

//             {accounts.length > 0 ? (
//                 accounts.map((account) => (
//                     <AccountItem key={account._id} data={account} />
//                 ))
//             ) : (
//                 <p style={{ padding: '10px', color: '#999' }}>Đang tải...</p>
//             )}

//             <p className={cx('more-btn')}>See more</p>
//         </div>
//     );
// }

// FollowingAccounts.propTypes = {
//     label: PropTypes.string.isRequired,
// };

// export default FollowingAccounts;

import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './FollowingAccounts.module.scss';
import AccountItem from '~/components/SuggestedAccounts/AccountItem'; // dùng lại component sẵn có

const cx = classNames.bind(styles);

function FollowingAccounts({ label }) {
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        const fetchFollowing = async () => {
            const userInfo = JSON.parse(localStorage.getItem('user')); 
            if (!userInfo || !userInfo._id) {
                console.warn('⚠️ Chưa đăng nhập, không thể load danh sách following.');
                return;
            }

            try {
                const res = await fetch(`http://localhost:5000/users/following?userId=${userInfo._id}`);
                const data = await res.json();
                setAccounts(data);
            } catch (err) {
                console.error('❌ Lỗi khi fetch following users:', err);
            }
        };

        fetchFollowing();
    }, []);

    return (
        <div className={cx('wrapper')}>
            <p className={cx('label')}>{label}</p>

            {accounts.length > 0 ? (
                accounts.map((account) => (
                    <AccountItem key={account._id} data={account} />
                ))
            ) : (
                <p style={{ padding: '10px', color: '#999' }}>Không có người dùng nào</p>
            )}

            <p className={cx('more-btn')}>See more</p>
        </div>
    );
}

FollowingAccounts.propTypes = {
    label: PropTypes.string.isRequired,
};

export default FollowingAccounts;
