/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import AllExpensesTab from './AllExpensesTab';

const ExpensesTabs = ({ tab, setExpense, expense, setCurrentRowData, setOpen }) => {
    const renderRouteSwitch = () => {
        switch (tab) {
            default:
                return (
                    <AllExpensesTab
                        setExpense={setExpense}
                        setCurrentRowData={setCurrentRowData}
                        expense={expense}
                        value={tab}
                        setOpenEdit={setOpen}
                    />
                );
        }
    };
    return <>{renderRouteSwitch()}</>;
};

export default ExpensesTabs;
