import PropTypes from 'prop-types';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import Image from '~/components/Image';
import styles from './AccountItem.module.scss';

const cx = classNames.bind(styles);

function AccountItem({ data }) {
    return (
        <Link to={`/@${data.nickname}`} className={cx('wrapper')}>
            <Image className={cx('avatar')} src={data.avatar} alt={data.full_name} />
            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    <span>{data.full_name}</span>
                    {data.tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
                </h4>
                <span className={cx('username')}>{data.nickname}</span>
            </div>
        </Link>
    );
}

AccountItem.propTypes = {
    data: PropTypes.object.isRequired,
};

export default AccountItem;

// import PropTypes from 'prop-types';
// import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { Link } from 'react-router-dom';
// import classNames from 'classnames/bind';
// import Tippy from '@tippyjs/react/headless';
// import styles from './AccountItem.module.scss';
// import Image from '~/components/Image';
// import AccountPreview from '../SuggestedAccounts/AccountPreview/AccountPreview'; // Đường dẫn đúng tới AccountPreview
// import { Wrapper as PopperWrapper } from '~/components/Popper';

// const cx = classNames.bind(styles);

// function AccountItem({ data }) {
//     const renderPreview = (props) => (
//         <div tabIndex="-1" {...props}>
//             <PopperWrapper>
//                 <AccountPreview data={data} />
//             </PopperWrapper>
//         </div>
//     );

//     return (
//         <Tippy
//             interactive
//             delay={[800, 0]}
//             offset={[-20, 0]}
//             placement="bottom"
//             render={renderPreview}
//         >
//             <Link to={`/@${data.nickname}`} className={cx('wrapper')}>
//                 <Image className={cx('avatar')} src={data.avatar} alt={data.full_name} />
//                 <div className={cx('info')}>
//                     <h4 className={cx('name')}>
//                         <span>{data.full_name}</span>
//                         {data.tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
//                     </h4>
//                     <span className={cx('username')}>{data.nickname}</span>
//                 </div>
//             </Link>
//         </Tippy>
//     );
// }

// AccountItem.propTypes = {
//     data: PropTypes.object.isRequired,
// };

// export default AccountItem;
