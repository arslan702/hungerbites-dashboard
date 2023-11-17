/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import _ from 'lodash';
import { Grid, Link, Button, Box, Tab } from '@mui/material';
import MuiTypography from '@mui/material/Typography';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import MainCard from 'ui-component/cards/MainCard';
import CustomersTabs from './CustomersTabs';
import { gridSpacing } from 'store/constant';
import EconomicsCard from 'components/economicsCard';
import AddProduct from './modals/AddProduct';
import axios from 'axios';
import { API_URL } from 'configuration';
import EditInactiveCustomers from './modals/InactiveUsers';

const tabs = [
    {
        id: 1,
        label: 'All Customers',
        value: 'allCustomers'
    },
    {
        id: 2,
        label: 'Inactive Customers',
        value: 'inactiveCustomers'
    }
];

const Customers = () => {
    const [value, setValue] = useState('allCustomers');
    const [open, setOpen] = useState(false);
    const [openIn, setOpenIn] = useState(false);
    const [currentRowData, setCurrentRowData] = useState({});
    const [usersCount, setUsersCount] = useState([]);
    const [customersList, setCustomersList] = useState([]);
    const [inActive, setInActive] = useState([]);
    
    useEffect(() => {
        axios.get(`${API_URL}/auth/userscount`).then((res) => {
            setUsersCount(res?.data)
        })
    },[])

    console.log({usersCount})

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
                title="Customers List"
            >
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item lg={3} md={6} xs={12} >
                                <EconomicsCard title="Total Customers" count={usersCount?.all?.count} />
                            </Grid>
                            <Grid item lg={3} md={6} xs={12} >
                                <EconomicsCard title="Active Customers" count={usersCount?.active?.count} />
                            </Grid>
                            <Grid item lg={3} md={6} xs={12} >
                                <EconomicsCard title="Inactive Customers" count={usersCount?.inactive?.count} />
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
                                <CustomersTabs
                                    setCurrentRowData={setCurrentRowData}
                                    tab={value}
                                    setOpen={setOpen}
                                    open={open}
                                    openIn={openIn}
                                    setOpenIn={setOpenIn}
                                    inActive={usersCount?.inactive?.rows}
                                    setInActive={setInActive}
                                    customersList={usersCount?.all?.rows}
                                    setCustomersList={setUsersCount}
                                />
                            </TabContext>
                        </Grid>
                    </Grid>
                </Grid>
            </MainCard>
            <AddProduct
                currentRowData={currentRowData}
                open={open}
                setOpen={setOpen}
                setCustomersList={setUsersCount}
            />
            <EditInactiveCustomers
                currentRowData={currentRowData}
                open={openIn}
                setOpen={setOpenIn}
                setInActive={setInActive}
            />
        </>
    );
};

export default Customers;
