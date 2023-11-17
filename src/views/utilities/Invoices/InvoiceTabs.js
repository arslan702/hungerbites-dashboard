/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import TotalCollected from './TotalCollected';
import TotalOutStanding from './TotalOutStanding';
import TotalOverDues from './TotalOverdues';

const ProductsTabs = ({ tab }) => {
    const renderRouteSwitch = () => {
        switch (tab) {
            case 'totalOutstanding':
                return <TotalOutStanding value={tab} />;
            case 'totalOverdue':
                return <TotalOverDues value={tab} />;
            default:
                return <TotalCollected value={tab} />;
        }
    };
    return <>{renderRouteSwitch()}</>;
};

export default ProductsTabs;
