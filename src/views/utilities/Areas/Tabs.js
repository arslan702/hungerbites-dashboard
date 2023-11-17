/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import TotalCities from './TotalCities';
import TotalAreas from './TotalAreas';

const ProductsTabs = ({ tab, setOpen, areaList, setAreaList, setCurrentRowData }) => {
    const renderRouteSwitch = () => {
        switch (tab) {
            case 'Total Areas':
                return (
                    <TotalAreas
                        setOpenEdit={setOpen}
                        areaList={areaList}
                        setAreaList={setAreaList}
                        setCurrentRowData={setCurrentRowData}
                        value={tab}
                    />
                );
            default:
                return <TotalCities value={tab} />;
        }
    };
    return <>{renderRouteSwitch()}</>;
};

export default ProductsTabs;
