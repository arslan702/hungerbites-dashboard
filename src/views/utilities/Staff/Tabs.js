/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import TotalStaff from './TotalStaff';

const ProductsTabs = ({ tab, recall, stores, setStores }) => {
    const renderRouteSwitch = () => {
        switch (tab) {
            // case 'Operational Outlets':
            //     return <OperationalOutlets value={tab} />;
            default:
                return <TotalStaff value={tab} setRecall={recall} stores={stores} setStores={setStores} />;
        }
    };
    return <>{renderRouteSwitch()}</>;
};

export default ProductsTabs;
