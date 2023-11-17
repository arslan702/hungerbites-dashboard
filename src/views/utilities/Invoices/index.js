/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { Grid, Link, Button, Box, Tab } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';

import MainCard from 'ui-component/cards/MainCard';
import InvoiceTabs from './InvoiceTabs';
import { gridSpacing } from 'store/constant';
import EconomicsCard from 'components/economicsCard';
import AddInvoice from './modals/AddInvoice';
import { useEffect } from 'react';
import axios from 'axios';
import { API_URL } from 'configuration';

const tabs = [
    {
        id: 1,
        label: 'Total Collected',
        value: 'totalCollected'
    },
    {
        id: 2,
        label: 'Total Outstanding',
        value: 'totalOutstanding'
    },
    {
        id: 3,
        label: 'Total Overdue',
        value: 'totalOverdue'
    }
];

const Invoices = () => {
    const [value, setValue] = useState('totalCollected');
    const [open, setOpen] = useState(false);
    const [sum, setSum] = useState([]);

    useEffect(() => {
        axios.get(`${API_URL}/invoice/sumofinvoices`)
        .then((res) => {
            setSum(res?.data)
        })
    },[])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <MainCard
                title="Invoice List"
                secondary={
                    <Box display={'flex'} gap={3}>
                        {/* <Button variant="contained" color="brightBlue" sx={{ color: 'white', borderRadius: 2 }} onClick={handleAddInvoice}>
                            Add Invoice
                        </Button>
                        <Button variant="contained" color="error" sx={{ borderRadius: 2 }} onClick={handleDeleteInvoice}>
                            Delete Invoice
                        </Button> */}
                    </Box>
                }
            >
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid container spacing={gridSpacing}>
                                <Grid item lg={3} md={6} xs={12}>
                                    <EconomicsCard title="Total Collected" count={sum?.collectedInvoice} />
                                </Grid>
                                <Grid item lg={3} md={6} xs={12}>
                                    <EconomicsCard title="Total Outstanding" count={sum?.outstandingInvoice} />
                                </Grid>
                                <Grid item lg={3} md={6} xs={12}>
                                    <EconomicsCard title="Total Overdue" count={sum?.overdueInvoice} />
                                </Grid>
                            </Grid>
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
                                <InvoiceTabs tab={value} />
                            </TabContext>
                        </Grid>
                    </Grid>
                </Grid>
            </MainCard>
            <AddInvoice open={open} setOpen={setOpen} />
        </>
    );
};

export default Invoices;
