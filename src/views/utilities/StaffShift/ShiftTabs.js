/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import AllShiftTab from './AllShiftTab';

const ShiftTabs = ({ tab, setStaffShift, staffShift, setCurrentRowData, setOpen }) => {
    const renderRouteSwitch = () => {
        switch (tab) {
            default:
                return (
                    <AllShiftTab
                        setStaffShift={setStaffShift}
                        setCurrentRowData={setCurrentRowData}
                        staffShift={staffShift}
                        value={tab}
                        setOpenEdit={setOpen}
                    />
                );
        }
    };
    return <>{renderRouteSwitch()}</>;
};

export default ShiftTabs;
