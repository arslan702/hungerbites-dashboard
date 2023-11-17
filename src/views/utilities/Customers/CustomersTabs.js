/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import AllCustomersTab from './AllCustomersTab';
import InactiveCustomers from './InactiveCustomers';

const CustomersTabs = ({ tab, setCustomersList, customersList, setCurrentRowData, setOpen, setOpenIn, inActive, setInActive }) => {
    const renderRouteSwitch = () => {
        switch (tab) {
            case 'inactiveCustomers':
                return (
                    <InactiveCustomers
                        setOpenIn={setOpenIn}
                        inActive={inActive}
                        setInActive={setInActive}
                        setCurrentRowData={setCurrentRowData}
                        value={tab}
                    />
                );
            default:
                return (
                    <AllCustomersTab
                        setCustomersList={setCustomersList}
                        setCurrentRowData={setCurrentRowData}
                        customersList={customersList}
                        value={tab}
                        setOpenEdit={setOpen}
                    />
                );
        }
    };
    return <>{renderRouteSwitch()}</>;
};

export default CustomersTabs;
