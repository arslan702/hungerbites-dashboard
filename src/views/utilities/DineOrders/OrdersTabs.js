/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import AllOrderTab from './AllOrderTab';
// import DeliveredOrders from './DeliveredOrders';
// import PendingOrders from './PendingOrders';

const ProductsTabs = ({ tab }) => {
    const renderRouteSwitch = () => {
        switch (tab) {
            // case 'deliveredOrder':
            //     return <DeliveredOrders value={tab} />;
            // case 'pendingOrder':
            //     return <PendingOrders value={tab} />;
            default:
                return <AllOrderTab value={tab} />;
        }
    };
    return <>{renderRouteSwitch()}</>;
};

export default ProductsTabs;
