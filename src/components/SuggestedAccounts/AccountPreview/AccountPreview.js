// import PropTypes from 'prop-types';
// import classNames from 'classnames/bind';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

// import Button from '~/components/Button';
// import styles from './AccountPreview.module.scss';

// const cx = classNames.bind(styles);

// function AccountPreview({ data }) {
//     return (
//         <div className={cx('wrapper')}>
//             <div className={cx('header')}>
//                 {/* <img className={cx('avatar')} src={data.avatar} alt={data.full_name} /> */}
//                 <img className={cx('avatar')} src={data.avatarUrl} alt={data.full_name} />


//                 <Button className={cx('follow-btn')} primary>Follow</Button>
//             </div>
//             <div className={cx('body')}>
//                 <p className={cx('nickname')}>
//                     <strong>{data.nickname}</strong>
//                     {data.tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
//                 </p>
//                 <p className={cx('name')}>{data.full_name}</p>
//                 <p className={cx('analytics')}>
//                     <strong className={cx('value')}>{data.followers} </strong>
//                     <span className={cx('label')}>Followers</span>
//                     <strong className={cx('value')}>{data.likes} </strong>
//                     <span className={cx('label')}>Likes</span>
//                 </p>
//             </div>
//         </div>
//     );
// }

// AccountPreview.propTypes = {
//     data: PropTypes.shape({
//         avatar: PropTypes.string,
//         full_name: PropTypes.string,
//         nickname: PropTypes.string,
//         tick: PropTypes.bool,
//         followers: PropTypes.string,
//         likes: PropTypes.string,
//     }).isRequired,
// };

// export default AccountPreview;



import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import Button from '~/components/Button';
import styles from './AccountPreview.module.scss';

const cx = classNames.bind(styles);

function AccountPreview({ data }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <img
                    className={cx('avatar')}
                    src={data.avatarUrl}
                    alt={data.username}
                    onError={(e) => { e.target.src = 'https://i.pravatar.cc/150?img=999'; }} // fallback ảnh
                />
                <Button className={cx('follow-btn')} primary>
                    Follow
                </Button>
            </div>
            <div className={cx('body')}>
                <p className={cx('nickname')}>
                    <strong>{data.username}</strong>
                    {data.tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
                </p>
                <p className={cx('name')}>@{data.username}</p>
                <p className={cx('analytics')}>
                    <strong className={cx('value')}>{data.followers || '0'} </strong>
                    <span className={cx('label')}>Followers</span>
                    <strong className={cx('value')}>{data.likes || '0'} </strong>
                    <span className={cx('label')}>Likes</span>
                </p>
            </div>
        </div>
    );
}

AccountPreview.propTypes = {
    data: PropTypes.shape({
        username: PropTypes.string.isRequired,
        avatarUrl: PropTypes.string,
        tick: PropTypes.bool,
        followers: PropTypes.string, // giả lập hiện tại
        likes: PropTypes.string,     // giả lập hiện tại
    }).isRequired,
};

export default AccountPreview;
