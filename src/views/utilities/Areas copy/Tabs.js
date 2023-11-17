import TotalCities from './TotalCities';
import InactiveHub from './InactiveHub';
import PreHubAreas from './PreHubAreas';
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
            case 'Per Area Hubs':
                return <PreHubAreas value={tab} />;
            case 'Inactive hub':
                return <InactiveHub value={tab} />;
            default:
                return <TotalCities value={tab} />;
        }
    };
    return <>{renderRouteSwitch()}</>;
};

export default ProductsTabs;
