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
                // const res = await fetch(`${process.env.REACT_APP_API_BASE}/users/suggested`);
                const res = await fetch('${process.env.REACT_APP_API_BASE}/users/suggested');
                const data = await res.json();
                // console.log("📦 Suggested users from backend:", data); // ✅ log để kiểm tra dữ liệu
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
