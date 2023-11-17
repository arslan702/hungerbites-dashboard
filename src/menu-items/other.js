import { IconBrandChrome, IconHelp, IconSettings } from '@tabler/icons';
const icons = { IconBrandChrome, IconHelp, IconSettings };
const other = {
    id: 'admin-setting',
    type: 'group',
    children: [
        {
            id: 'setting',
            title: 'Settings',
            type: 'item',
            url: 'others/settings',
            icon: icons.IconSettings,
            breadcrumbs: false
        }
    ]
};

export default other;
