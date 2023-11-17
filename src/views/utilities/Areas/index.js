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
import AddArea from './modals/AddArea';
import { useEffect } from 'react';
import axios from 'axios';
import { API_ROOT } from 'configuration';

const tabs = [
    {
        id: 1,
        label: 'Total Areas',
        value: 'Total Areas'
    }
];

const Areas = () => {
    const [value, setValue] = useState('Total Areas');
    const [open, setOpen] = useState(false);
    const [areaList, setAreaList] = useState([]);
    const [currentRowData, setCurrentRowData] = useState({});
    const [count, setCount] = useState();

    useEffect(() => {
        axios.get(`${API_ROOT}/area/areacount`)
        .then((res) => {
            setCount(res?.data)
        })
    },[])
    const handleChange = (event, newValue) => {
        setValue(newValue);
        setCurrentRowData({});
    };

    const handleAddArea = () => {
        setOpen(true);
        setCurrentRowData({});
    };

    return (
        <>
            <MainCard
                title="Area List"
                secondary={
                    <Box display={'flex'} gap={3}>
                        <Button variant="contained" color="brightBlue" sx={{ color: 'white', borderRadius: 2, backgroundColor: '#199088' }} onClick={handleAddArea}>
                            Add Area
                        </Button>
                    </Box>
                }
            >
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid container spacing={gridSpacing}>
                                    <Grid item lg={3} md={6} xs={12}>
                                        <EconomicsCard title="Total Areas" count={count} />
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
                                <Tabs
                                    tab={value}
                                    setOpen={setOpen}
                                    areaList={areaList}
                                    setAreaList={setAreaList}
                                    setCurrentRowData={setCurrentRowData}
                                />
                            </TabContext>
                        </Grid>
                    </Grid>
                </Grid>
            </MainCard>
            <AddArea open={open} setOpen={setOpen} setAreaList={setAreaList} currentRowData={currentRowData} />
        </>
    );
};

export default Areas;
