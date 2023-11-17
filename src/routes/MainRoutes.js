/* eslint-disable no-unused-vars */
import { Navigate } from 'react-router-dom';
import { RequireAuth } from 'authenticate';
import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import MinimalLayout from 'layout/MinimalLayout';
import Loadable from 'ui-component/Loadable';

const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const UtilsProducts = Loadable(lazy(() => import('views/utilities/Products')));
const UtilsCategories = Loadable(lazy(() => import('views/utilities/Categories')));
const UtilsOrders = Loadable(lazy(() => import('views/utilities/Orders')));
const UtilsInvoices = Loadable(lazy(() => import('views/utilities/Invoices')));
const UtilsOffers = Loadable(lazy(() => import('views/utilities/Offers')));
const UtilsStaff = Loadable(lazy(() => import('views/utilities/Staff')));
const UtilsDineOrders = Loadable(lazy(() => import('views/utilities/DineOrders')));
const UtilsAreas = Loadable(lazy(() => import('views/utilities/Areas')));
const UtilsCutomers = Loadable(lazy(() => import('views/utilities/Customers')));
const StaffShifts = Loadable(lazy(() => import('views/utilities/StaffShift')));
const Salary = Loadable(lazy(() => import('views/utilities/Salary')));
const Expense = Loadable(lazy(() => import('views/utilities/Expenses')));
const AuthLogin = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login')));
const Settings = Loadable(lazy(() => import('views/settings')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = [
    {
        element: (
            <RequireAuth>
                <MainLayout />
            </RequireAuth>
        ),
        children: [
            {
                path: '/',
                element: <Navigate to="dashboard" />
            },
            {
                path: 'dashboard',
                element: <DashboardDefault />
            },
            {
                path: 'utils',
                children: [
                    {
                        path: 'menuitems',
                        element: <UtilsProducts />
                    }
                ]
            },
            {
                path: 'utils',
                children: [
                    {
                        path: 'categories',
                        element: <UtilsCategories />
                    }
                ]
            },
            {
                path: 'utils',
                children: [
                    {
                        path: 'orders',
                        element: <UtilsOrders />
                    }
                ]
            },
            {
                path: 'utils',
                children: [
                    {
                        path: 'dineorders',
                        element: <UtilsDineOrders />
                    }
                ]
            },
            {
                path: 'utils',
                children: [
                    {
                        path: 'invoices',
                        element: <UtilsInvoices />
                    }
                ]
            },
            {
                path: 'utils',
                children: [
                    {
                        path: 'offers',
                        element: <UtilsOffers />
                    }
                ]
            },
            {
                path: 'utils',
                children: [
                    {
                        path: 'staff',
                        element: <UtilsStaff />
                    }
                ]
            },
            {
                path: 'utils',
                children: [
                    {
                        path: 'salary',
                        element: <Salary />
                    }
                ]
            },
            {
                path: 'utils',
                children: [
                    {
                        path: 'staffshifts',
                        element: <StaffShifts />
                    }
                ]
            },
            {
                path: 'utils',
                children: [
                    {
                        path: 'expense',
                        element: <Expense />
                    }
                ]
            },
            {
                path: 'utils',
                children: [
                    {
                        path: 'customers',
                        element: <UtilsCutomers />
                    }
                ]
            },
            {
                path: 'others',
                children: [
                    {
                        path: 'settings',
                        element: <Settings />
                    }
                ]
            }
        ]
    },
    {
        path: '/auth',
        element: <MinimalLayout />,
        children: [
            {
                path: 'login',
                element: <AuthLogin />
            }
        ]
    }
];

export default MainRoutes;
