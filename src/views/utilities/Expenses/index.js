/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import { useState } from 'react';
import _ from 'lodash';
import { Grid, Button, Box, Tab } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import AddExpense from './modals/AddExpense';
import ExpensesTabs from './ExpensesTabs';

const tabs = [
    {
        id: 1,
        label: 'Expense List',
        value: 'expense'
    }
];

const Salary = () => {
    const [value, setValue] = useState('expense');
    const [open, setOpen] = useState(false);
    const [currentRowData, setCurrentRowData] = useState({});
    const [expense, setExpense] = useState([]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        setCurrentRowData([]);
    };

    const handleAddProduct = () => {
        setOpen(true);
        setCurrentRowData([]);
    };

    return (
        <>
            <MainCard
                title="Salary"
                secondary={
                    <Box display={'flex'} gap={3}>
                        <Button variant="contained" sx={{ color: 'white', borderRadius: 2, backgroundColor: '#199088' }} onClick={handleAddProduct}>
                            Add Expense
                        </Button>
                    </Box>
                }
            >
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <Grid container spacing={gridSpacing}>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} mt={5}>
                        <Grid container spacing={gridSpacing} direction="column">
                            <TabContext value={value}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                                        {tabs.map((tab) => (
                                            <Tab label={tab.label} value={tab.value} key={tab.id} sx={{ color: '#BCC0C8' }} />
                                        ))}
                                    </TabList>
                                </Box>
                                <ExpensesTabs
                                    setCurrentRowData={setCurrentRowData}
                                    tab={value}
                                    setOpen={setOpen}
                                    expense={expense}
                                    setExpense={setExpense}
                                />
                            </TabContext>
                        </Grid>
                    </Grid>
                </Grid>
            </MainCard>
            <AddExpense
                currentRowData={currentRowData}
                open={open}
                setOpen={setOpen}
                setExpense={setExpense}
            />
        </>
    );
};

export default Salary;
