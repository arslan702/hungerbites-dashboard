/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import AllSalaryTab from './AllSalaryTab';

const SalaryTabs = ({ tab, setStaffSalary, staffSalary, setCurrentRowData, setOpen }) => {
    const renderRouteSwitch = () => {
        switch (tab) {
            default:
                return (
                    <AllSalaryTab
                        setStaffSalary={setStaffSalary}
                        setCurrentRowData={setCurrentRowData}
                        staffSalary={staffSalary}
                        value={tab}
                        setOpenEdit={setOpen}
                    />
                );
        }
    };
    return <>{renderRouteSwitch()}</>;
};

export default SalaryTabs;
