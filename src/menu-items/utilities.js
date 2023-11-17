/* eslint-disable no-unused-vars */
// assets
import { IconWindmill, IconFileInvoice, IconTags, IconApps, IconBrandCodesandbox } from '@tabler/icons';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';

// constant
const icons = {
    IconApps,
    IconBrandCodesandbox,
    IconWindmill,
    IconFileInvoice,
    IconTags,
    StorefrontOutlinedIcon,
    PlaceOutlinedIcon,
    LocalOfferOutlinedIcon,
    CategoryOutlinedIcon,
    PeopleOutlineIcon
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
    id: 'utilities',
    title: 'Utilities',
    type: 'group',
    children: [
        {
            id: 'util-menuitems',
            title: 'Menuitem',
            type: 'item',
            url: '/utils/menuitems',
            icon: icons.IconApps,
            breadcrumbs: false
        },
        {
            id: 'util-category',
            title: 'Category',
            type: 'item',
            url: '/utils/categories',
            icon: icons.CategoryOutlinedIcon,
            breadcrumbs: false
        },
        {
            id: 'util-orders',
            title: 'Orders',
            type: 'item',
            url: '/utils/orders',
            icon: icons.IconBrandCodesandbox,
            breadcrumbs: false
        },
        {
            id: 'util-dineorders',
            title: 'DineOrders',
            type: 'item',
            url: '/utils/dineorders',
            icon: icons.IconBrandCodesandbox,
            breadcrumbs: false
        },
        {
            id: 'util-invoices',
            title: 'Invoices',
            type: 'item',
            url: '/utils/invoices',
            icon: icons.IconFileInvoice,
            breadcrumbs: false
        },
        {
            id: 'util-offers',
            title: 'Offers',
            type: 'item',
            url: '/utils/offers',
            icon: icons.IconFileInvoice,
            breadcrumbs: false
        },
        {
            id: 'util-staff',
            title: 'Staff',
            type: 'item',
            url: '/utils/staff',
            icon: icons.StorefrontOutlinedIcon,
            breadcrumbs: false
        },
        {
            id: 'util-salary',
            title: 'Salary',
            type: 'item',
            url: '/utils/salary',
            icon: icons.CategoryOutlinedIcon,
            breadcrumbs: false
        },
        {
            id: 'util-staff-shifts',
            title: 'Staff Shifts',
            type: 'item',
            url: '/utils/staffshifts',
            icon: icons.LocalOfferOutlinedIcon,
            breadcrumbs: false
        },
        {
            id: 'util-expense',
            title: 'Expenses',
            type: 'item',
            url: '/utils/expense',
            icon: icons.PlaceOutlinedIcon,
            breadcrumbs: false
        },
        {
            id: 'util-customers',
            title: 'Customers',
            type: 'item',
            url: '/utils/customers',
            icon: icons.PeopleOutlineIcon,
            breadcrumbs: false
        }
    ]
};

export default utilities;
