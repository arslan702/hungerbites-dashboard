/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { Grid, Button, Box, Tab } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import MainCard from 'ui-component/cards/MainCard';
import Tabs from './Tabs';
import { gridSpacing } from 'store/constant';
import EconomicsCard from 'components/economicsCard';
import { useEffect } from 'react';
import axios from 'axios';
import { API_ROOT } from 'configuration';
import AddStaff from './modals/AddStaff';
const tabs = [
    {
        id: 1,
        label: 'Staff',
        value: 'Staff'
    }
];

const Outlets = () => {
    const [value, setValue] = useState('Staff');
    const [open, setOpen] = useState(false);
    const [recall, setRecall] = useState(false);
    const [stores, setStores] = useState([]);
    const [storeCount, setStoreCount] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleAddStaff = () => {
        setOpen(true);
        
    }

    useEffect(() => {
        axios.get(`${API_ROOT}/store/count`)
        .then((res) => {
            setStoreCount(res?.data)
        })
    }, [])
    return (
        <>
            <MainCard
                title="Staff List"
                secondary={
                    <Box display={'flex'} gap={3}>
                        <Button variant="contained" color="brightBlue" sx={{ color: 'white', borderRadius: 2, backgroundColor: '#199088' }} onClick={handleAddStaff}>
                            Add Staff
                        </Button>
                        {/* <Button variant="contained" color="error" sx={{ borderRadius: 2 }} onClick={handleDeleteOutlet}>
                            Delete Outlet
                        </Button> */}
                    </Box>
                }
            >
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid container spacing={gridSpacing}>
                                    <Grid item lg={3} md={6} xs={12}>
                                        <EconomicsCard title="Staffs" count={storeCount} />
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
                                <Tabs tab={value} setStoreCount={setStoreCount} stores={stores} setStores={setStores} recall={recall}/>
                            </TabContext>
                        </Grid>
                    </Grid>
                </Grid>
            </MainCard>
            <AddStaff open={open} setOpen={setOpen} setStores={setStores} setRecall={setRecall} />
        </>
    );
};

export default Outlets;
