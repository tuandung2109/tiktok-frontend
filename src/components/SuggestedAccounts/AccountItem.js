// import classNames from 'classnames/bind';
// import Tippy from '@tippyjs/react/headless';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

// import { Wrapper as PopperWrapper } from '~/components/Popper';
// import AccountPreview from './AccountPreview/AccountPreview';
// import styles from './SuggestedAccounts.module.scss';

// const cx = classNames.bind(styles);

// function AccountItem() {
//     const renderPreview = (props) => {
//         return (
//             <div tabIndex="-1" {...props}>
//                 <PopperWrapper>
//                     <AccountPreview />
//                 </PopperWrapper>
//             </div>
//         );
//     };

//     return (
//         <div>
//             <Tippy interactive delay={[800, 0]} offset={[-20, 0]} placement="bottom" render={renderPreview}>
//                 <div className={cx('account-item')}>
//                     <img
//                         className={cx('avatar')}
//                         // src="https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-aiso/65d3c6b1d1e205c75536ccf1f26d552d~c5_100x100.jpeg?x-expires=1660665600&x-signature=hToDdYbvevi4S9Fn5tdnI%2Bk0%2BkM%3D"
//                         src='../images/avatar.png'
//                         alt=""
//                     />
//                     <div className={cx('item-info')}>
//                         <p className={cx('nickname')}>
//                             <strong>tuandung2109</strong>
//                             <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
//                         </p>
//                         <p className={cx('name')}>Đinh Tuấn Dũng</p>
//                     </div>
//                 </div>
//             </Tippy>
//         </div>
//     );
// }

// AccountItem.propTypes = {};

// export default AccountItem;


import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountPreview from './AccountPreview/AccountPreview';
import styles from './SuggestedAccounts.module.scss';

const cx = classNames.bind(styles);

function AccountItem({ data }) {
    const renderPreview = (props) => (
        <div tabIndex="-1" {...props}>
            <PopperWrapper>
                <AccountPreview data={data} />
            </PopperWrapper>
        </div>
    );

    return (
        <Tippy interactive delay={[800, 0]} offset={[-20, 0]} placement="bottom" render={renderPreview}>
            <div className={cx('account-item')}>
                <img className={cx('avatar')} src={data.avatar} alt={data.full_name} />
                <div className={cx('item-info')}>
                    <p className={cx('nickname')}>
                        <strong>{data.nickname}</strong>
                        {data.tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
                    </p>
                    <p className={cx('name')}>{data.full_name}</p>
                </div>
            </div>
        </Tippy>
    );
}

AccountItem.propTypes = {
    data: PropTypes.object.isRequired,
};

export default AccountItem;
