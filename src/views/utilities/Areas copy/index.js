import { useState } from 'react';
import { Grid, Link, Button, Box, Tab } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import MainCard from 'ui-component/cards/MainCard';
import Tabs from './Tabs';
import { gridSpacing } from 'store/constant';
import EconomicsCard from 'components/economicsCard';
import AddArea from './modals/AddArea';

const tabs = [
    // {
    //     id: 1,
    //     label: 'Total Cities',
    //     value: 'Total Cities'
    // },
    {
        id: 1,
        label: 'Total Areas',
        value: 'Total Areas'
    }
    // {
    //     id: 3,
    //     label: 'Per Area Hubs',
    //     value: 'Per Area Hubs'
    // },
    // {
    //     id: 4,
    //     label: 'Inactive hub',
    //     value: 'Inactive hub'
    // }
];

const Areas = () => {
    const [value, setValue] = useState('Total Areas');
    const [open, setOpen] = useState(false);
    const [areaList, setAreaList] = useState([]);
    const [currentRowData, setCurrentRowData] = useState({});

    const handleChange = (event, newValue) => {
        setValue(newValue);
        setCurrentRowData({});
    };

    const handleAddArea = () => {
        setOpen(true);
        setCurrentRowData({});
    };

    const handleDeleteArea = () => {};
    return (
        <>
            <MainCard
                title="Area List"
                secondary={
                    <Box display={'flex'} gap={3}>
                        <Button variant="contained" color="brightBlue" sx={{ color: 'white', borderRadius: 2 }} onClick={handleAddArea}>
                            Add Area
                        </Button>
                        {/* <Button variant="contained" color="error" sx={{ borderRadius: 2 }} onClick={handleDeleteArea}>
                            Delete Area
                        </Button> */}
                    </Box>
                }
            >
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid container spacing={gridSpacing}>
                                {[...new Array(4)].map((item, index) => (
                                    <Grid item lg={3} md={6} xs={12} key={index}>
                                        <EconomicsCard title="Title" count={2000} />
                                    </Grid>
                                ))}
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
