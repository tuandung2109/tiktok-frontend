// import PropTypes from 'prop-types';
// import classNames from 'classnames/bind';
// import styles from './SuggestedAccounts.module.scss';
// import AccountItem from './AccountItem'; // giữ nguyên nếu AccountItem nằm trong cùng thư mục

// const cx = classNames.bind(styles);

// const fakeAccounts = [
//     {
//         avatar: 'https://i.pravatar.cc/150?img=1',
//         full_name: 'Nguyễn Văn A',
//         nickname: 'nguyenvana',
//         tick: true,
//         followers: '8.2M',
//         likes: '12.5M',
//     },
//     {
//         avatar: 'https://i.pravatar.cc/150?img=2',
//         full_name: 'Trần Thị B',
//         nickname: 'tranthib',
//         tick: false,
//         followers: '2.4M',
//         likes: '5.1M',
//     },
//     {
//         avatar: 'https://i.pravatar.cc/150?img=3',
//         full_name: 'Lê Văn C',
//         nickname: 'levanc',
//         tick: true,
//         followers: '1.8M',
//         likes: '3.7M',
//     },
// ];

// function SuggestedAccounts({ label }) {
//     return (
//         <div className={cx('wrapper')}>
//             <p className={cx('label')}>{label}</p>

//             {fakeAccounts.map((account, index) => (
//                 <AccountItem key={index} data={account} />
//             ))}

//             <p className={cx('more-btn')}>See all</p>
//         </div>
//     );
// }

// SuggestedAccounts.propTypes = {
//     label: PropTypes.string.isRequired,
// };

// export default SuggestedAccounts;




// import { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
// import classNames from 'classnames/bind';
// import styles from './SuggestedAccounts.module.scss';
// import AccountItem from './AccountItem';

// const cx = classNames.bind(styles);

// function SuggestedAccounts({ label }) {
//     const [accounts, setAccounts] = useState([]);

//     useEffect(() => {
//         const fetchSuggested = async () => {
//             try {
//                 const res = await fetch('${process.env.REACT_APP_API_BASE}
// /users/suggested');
//                 const data = await res.json();
//                 setAccounts(data);
//             } catch (err) {
//                 console.error('❌ Lỗi khi fetch suggested users:', err);
//             }
//         };

//         fetchSuggested();
//     }, []);

//     return (
//         <div className={cx('wrapper')}>
//             <p className={cx('label')}>{label}</p>

//             {accounts.map((account) => (
//                 <AccountItem key={account._id} data={account} />
//             ))}

//             <p className={cx('more-btn')}>See all</p>
//         </div>
//     );
// }

// SuggestedAccounts.propTypes = {
//     label: PropTypes.string.isRequired,
// };

// export default SuggestedAccounts;


import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './SuggestedAccounts.module.scss';
import AccountItem from './AccountItem';

const cx = classNames.bind(styles);

function SuggestedAccounts({ label }) {
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        const fetchSuggested = async () => {
            try {
                const res = await fetch(`${process.env.REACT_APP_API_BASE}/users/suggested`);
                const data = await res.json();
                console.log("📦 Suggested users from backend:", data); // ✅ log để kiểm tra dữ liệu
                setAccounts(data);
            } catch (err) {
                console.error('❌ Lỗi khi fetch suggested users:', err);
            }
        };

        fetchSuggested();
    }, []);

    return (
        <div className={cx('wrapper')}>
            <p className={cx('label')}>{label}</p>

            {accounts.length > 0 ? (
                accounts.map((account) => (
                    <AccountItem key={account._id} data={account} />
                ))
            ) : (
                <p style={{ padding: '10px', color: '#999' }}>Đang tải...</p>
            )}

            <p className={cx('more-btn')}>See all</p>
        </div>
    );
}

SuggestedAccounts.propTypes = {
    label: PropTypes.string.isRequired,
};

export default SuggestedAccounts;
