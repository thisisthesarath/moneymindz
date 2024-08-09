import { webRoutes } from '../../routes/web';
import { BiHomeAlt2 } from 'react-icons/bi';
import Icon, { UserOutlined, InfoCircleOutlined } from '@ant-design/icons';

export const sidebar = [
  {
    path: webRoutes.dashboard,
    key: webRoutes.dashboard,
    name: 'Home',
    icon: <Icon component={BiHomeAlt2} />,
  },
  {
    path: webRoutes.users,
    key: webRoutes.users,
    name: 'Finances',
    icon: <UserOutlined />,
  },
  {
    path: webRoutes.about,
    key: webRoutes.about,
    name: 'Forums',
    icon: <InfoCircleOutlined />,
  },
];
