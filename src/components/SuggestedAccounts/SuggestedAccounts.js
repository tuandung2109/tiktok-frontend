// import PropTypes from 'prop-types';
// import classNames from 'classnames/bind';
// import styles from './SuggestedAccounts.module.scss';
// import AccountItem from './AccountItem';

// const cx = classNames.bind(styles);

// function SuggestedAccounts({ label }) {
//     return (
//         <div className={cx('wrapper')}>
//             <p className={cx('label')}>{label}</p>

//             <AccountItem />
//             <AccountItem />
//             <AccountItem />
//             <AccountItem />
//             <AccountItem />
//             <AccountItem />

//             <p className={cx('more-btn')}>See all</p>
//         </div>
//     );
// }

// SuggestedAccounts.propTypes = {
//     label: PropTypes.string.isRequired,
// };

// export default SuggestedAccounts;

import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './SuggestedAccounts.module.scss';
import AccountItem from '../AccountItem/AccountItem';

const cx = classNames.bind(styles);

const fakeAccounts = [
    {
        avatar: 'https://i.pravatar.cc/150?img=1',
        full_name: 'Nguyễn Văn A',
        nickname: 'nguyenvana',
        tick: true,
    },
    {
        avatar: 'https://i.pravatar.cc/150?img=2',
        full_name: 'Trần Thị B',
        nickname: 'tranthib',
        tick: false,
    },
    {
        avatar: 'https://i.pravatar.cc/150?img=3',
        full_name: 'Lê Văn C',
        nickname: 'levanc',
        tick: true,
    },
    // Thêm các object fake khác nếu muốn
];

function SuggestedAccounts({ label }) {
    return (
        <div className={cx('wrapper')}>
            <p className={cx('label')}>{label}</p>

            {fakeAccounts.map((account, index) => (
                <AccountItem key={index} data={account} />
            ))}

            <p className={cx('more-btn')}>See all</p>
        </div>
    );
}

SuggestedAccounts.propTypes = {
    label: PropTypes.string.isRequired,
};

export default SuggestedAccounts;
