/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { Grid, Link, Button, Box, Tab } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import MainCard from 'ui-component/cards/MainCard';
import Tabs from './Tabs';
import { gridSpacing } from 'store/constant';
import EconomicsCard from 'components/economicsCard';
import AddDiscount from './modals/AddDiscount';
import AddOffer from './modals/AddOffer';
import { useEffect } from 'react';
import axios from 'axios';
import { API_ROOT } from 'configuration';

const tabs = [
    {
        id: 1,
        label: 'Current Discounted Products',
        value: 'Discounted Products'
    },
    {
        id: 2,
        label: 'Trade Offers',
        value: 'Trade Offers'
    }
];

const Offers = () => {
    const [value, setValue] = useState('Discounted Products');
    const [open, setOpen] = useState(false);
    const [offerOpen, setOfferOpen] = useState(false);
    const [currentRowData, setCurrentRowData] = useState({});
    const [discountsList, setDiscountsList] = useState([]);
    const [offersList, setOffersList] = useState([]);
    const [offerCount, setOfferCount] = useState([]);
    const [discountCount, setDiscountCount] = useState([]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        setCurrentRowData([]);
    };

    const handleAddDiscount = () => {
        setOpen(true);
        setCurrentRowData([]);
    };

    const handleAddOffer = () => {
        setOfferOpen(true);
        setCurrentRowData([]);
    }

    useEffect(() => {
        axios.get(`${API_ROOT}/tradeoffer/offertotal`)
        .then((res) => {
            setOfferCount(res?.data)
        })
        axios.get(`${API_ROOT}/discount/discounttotal`)
        .then((res) => {
            setDiscountCount(res?.data)
        })
    },[])

    return (
        <>
            <MainCard
                title={`${value} List`}
                secondary={
                    <Box display={'flex'} gap={3}>
                        <Button variant="contained" sx={{ color: 'white', borderRadius: 2, backgroundColor: '#199088' }} onClick={handleAddDiscount}>
                            Add Discount
                        </Button>
                        {/* <Button variant="contained" sx={{ color: 'white', borderRadius: 2, backgroundColor: '#199088' }} onClick={handleAddOffer}>
                            Add Offer
                        </Button> */}
                    </Box>
                }
            >
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid container spacing={gridSpacing}>
                                    <Grid item lg={3} md={6} xs={12}>
                                        <EconomicsCard title="Current Discounted Products" count={discountCount} />
                                    </Grid>
                                    <Grid item lg={3} md={6} xs={12}>
                                        <EconomicsCard title="Trade Offers" count={offerCount} />
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
                                            <Tab
                                                label={tab.label} 
                                                value={tab.value} 
                                                key={tab.id} 
                                                sx={{ color: '#BCC0C8' }} 
                                            />
                                        ))}
                                    </TabList>
                                </Box>
                                <Tabs 
                                    tab={value}
                                    setCurrentRowData={setCurrentRowData}
                                    discountsList={discountsList}
                                    setDiscountsList={setDiscountsList}
                                    setOpen={setOpen}
                                    setOfferOpen={setOfferOpen}
                                    offersList={offersList}
                                    setOffersList={setOffersList}
                                />
                            </TabContext>
                        </Grid>
                    </Grid>
                </Grid>
            </MainCard>
            <AddDiscount
                currentRowData={currentRowData}
                setDiscountsList={setDiscountsList} 
                open={open} 
                setOpen={setOpen} 
            />
            <AddOffer
                currentRowData={currentRowData}
                setOffersList={setOffersList} 
                open={offerOpen}
                setOpen={setOfferOpen} 
            />
        </>
    );
};

export default Offers;
