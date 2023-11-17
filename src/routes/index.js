/* eslint-disable no-unused-vars */
import { useRoutes } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import { AuthProvider } from 'authenticate';
import useNotifier from 'hooks/useNotifier';

const AppContent = () => {
    useNotifier();
    const element = useRoutes(MainRoutes);
    return <AuthProvider>{element}</AuthProvider>;
};
export default AppContent;
