/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import _ from 'lodash';
import { Grid, Button, Box, Tab } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { resourceUrl, apiGet } from 'services';
import AddStaffShift from './modals/AddStaffShift';
import ShiftTabs from './ShiftTabs';

const staffurl = resourceUrl('staff');

const tabs = [
    {
        id: 1,
        label: 'Staff Shifts',
        value: 'staff shifts'
    }
];

const Products = () => {
    const [value, setValue] = useState('Staff Shifts');
    const [open, setOpen] = useState(false);
    const [staff, setStaff] = useState([]);
    const [currentRowData, setCurrentRowData] = useState({});
    const [staffShift, setStaffShift] = useState([]);

    async function fetchStaff() {
        const data = _.get(await apiGet(staffurl), 'data');
        setStaff(data);
    }

    console.log({staff})

    useEffect(() => {
        (async function () {
            await fetchStaff();
            // await fetchCorpBrands();
        })();
    }, []);

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
                title="Staff Shift List"
                secondary={
                    <Box display={'flex'} gap={3}>
                        <Button variant="contained" sx={{ color: 'white', borderRadius: 2, backgroundColor: '#199088' }} onClick={handleAddProduct}>
                            Add Shift
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
                                <ShiftTabs
                                    setCurrentRowData={setCurrentRowData}
                                    tab={value}
                                    setOpen={setOpen}
                                    staffShift={staffShift}
                                    setStaffShift={setStaffShift}
                                />
                            </TabContext>
                        </Grid>
                    </Grid>
                </Grid>
            </MainCard>
            <AddStaffShift
                currentRowData={currentRowData}
                open={open}
                setOpen={setOpen}
                staff={staff}
                setStaffShift={setStaffShift}
            />
        </>
    );
};

export default Products;
