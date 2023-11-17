/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { Grid, Link, Button, Box, Tab } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import MainCard from 'ui-component/cards/MainCard';
import OrdersTabs from './OrdersTabs';
import { gridSpacing } from 'store/constant';
import EconomicsCard from 'components/economicsCard';
import AddOrder from './modals/AddOrder';
import { useEffect } from 'react';
import axios from 'axios';
import { API_ROOT } from 'configuration';

const tabs = [
    {
        id: 1,
        label: 'All Order',
        value: 'allOrder'
    },
    {
        id: 2,
        label: 'Delivered Orders',
        value: 'deliveredOrder'
    },
    {
        id: 3,
        label: 'Pending Orders',
        value: 'pendingOrder'
    }
];

const Orders = () => {
    const [value, setValue] = useState('allOrder');
    const [open, setOpen] = useState(false);
    const [orderEarning, setOrderEarning] = useState([]);
    const [allStatus, setAllStatus] = useState([]);

    useEffect(() => {
        axios.get(`${API_ROOT}/order/orderamount`).then((res) => {
            setOrderEarning(res?.data?.totalAmount);
        });
        axios.get(`${API_ROOT}/order/allstatus`).then((res) => {
            setAllStatus(res?.data);
        });
    }, []);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // const handleAddOrder = () => {
    //     setOpen(true);
    // };

    // const handleDeleteOrder = () => {};

    return (
        <>
            <MainCard
                title="Order List"
                secondary={
                    <Box display={'flex'} gap={3}>
                        {/* <Button variant="contained" color="brightBlue" sx={{ color: 'white', borderRadius: 2 }} onClick={handleAddOrder}>
                            Add Order
                        </Button>
                        <Button variant="contained" color="error" sx={{ borderRadius: 2 }} onClick={handleDeleteOrder}>
                            Delete Order
                        </Button> */}
                    </Box>
                }
            >
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid container spacing={gridSpacing}>
                                <Grid item lg={3} md={6} xs={12}>
                                    <EconomicsCard title="Total Order Earnings" count={parseFloat(orderEarning).toFixed()} />
                                </Grid>
                                <Grid item lg={3} md={6} xs={12}>
                                    <EconomicsCard title="Total Order deliver" count={allStatus?.deliveredOrders} />
                                </Grid>
                                <Grid item lg={3} md={6} xs={12}>
                                    <EconomicsCard title="Total Order Pending" count={allStatus?.pendingOrders} />
                                </Grid>
                                <Grid item lg={3} md={6} xs={12}>
                                    <EconomicsCard title="Total Order Canceled" count={allStatus?.cancelledOrders} />
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
                                <OrdersTabs tab={value} />
                            </TabContext>
                        </Grid>
                    </Grid>
                </Grid>
            </MainCard>
            <AddOrder open={open} setOpen={setOpen} />
        </>
    );
};

export default Orders;
