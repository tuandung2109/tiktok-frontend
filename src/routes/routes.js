import config from '~/config';

// Layouts
import { HeaderOnly } from '~/layouts';

// Pages
import Home from '~/pages/Home';
import Following from '~/pages/Following';
import Profile from '~/pages/Profile';
import Upload from '~/pages/Upload';
import Search from '~/pages/Search';
import Live from '~/pages/Live';
import Explore from '~/pages/Explore';
import Friends from '~/pages/Friends';
import More from '~/pages/More';
import Messages from '~/pages/Messages/Messages';
import MessageDetail from '../pages/Messages/MessageDetail/MessageDetail';
import VideoDetail from '~/pages/VideoDetail/VideoDetail'; 
import Login from '~/pages/Login/Login';
import Register from '~/pages/Register/Register';

 


// Public routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.following, component: Following },
    { path: config.routes.live, component: Live },
    { path: config.routes.profile, component: Profile  },
    { path: config.routes.upload, component: Upload, layout: HeaderOnly },
    { path: config.routes.search, component: Search, layout: null },
    { path: config.routes.explore, component: Explore },
    { path: config.routes.friends, component: Friends },
    { path: config.routes.more, component: More },
    { path: config.routes.messages, component: Messages }, 
    { path: config.routes.messagesDetail, component: MessageDetail }, 
    { path: config.routes.videoDetail, component: VideoDetail , layout: null},
    { path: config.routes.login, component: Login, layout: null },
    { path: config.routes.register, component: Register, layout: null },
    { path: config.routes.profileById, component: Profile },

];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
