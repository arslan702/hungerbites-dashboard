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
import AddCategory from './modals/AddCategory';
import { useEffect } from 'react';
import axios from 'axios';
import { API_ROOT } from 'configuration';

const tabs = [
    {
        id: 1,
        label: 'All Categories',
        value: 'Categories'
    },
];

const Categories = () => {
    const [value, setValue] = useState('Categories');
    const [open, setOpen] = useState(false);
    const [categoryList, setCategoryList] = useState([]);
    const [subCategoryList, setSubCategoryList] = useState([]);
    const [currentRowData, setCurrentRowData] = useState({});
    const [count, setCount] = useState();

    const handleChange = (event, newValue) => {
        setValue(newValue);
        setCurrentRowData([]);
    };

    const handleAddCategory = () => {
        setOpen(true);
        setCurrentRowData([]);
    };

    useEffect(() => {
        axios.get(`${API_ROOT}/category/count`)
        .then((res) => {
            setCount(res?.data)
        })
    },[])
    return (
        <>
            <MainCard
                title={`${value} List`}
                secondary={
                    <Box display={'flex'} gap={3}>
                        <Button variant="contained" sx={{ color: 'white', borderRadius: 2, backgroundColor: '#1A9890' }} onClick={handleAddCategory}>
                            Add Category
                        </Button>
                    </Box>
                }
            >
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid container spacing={gridSpacing}>
                                    <Grid item lg={3} md={6} xs={12}>
                                        <EconomicsCard title="Total Categories" count={count?.categoryCount} />
                                    </Grid>
                                    {/* <Grid item lg={3} md={6} xs={12}>
                                        <EconomicsCard title="Total Sub Categories" count={count?.subCategoryCount} />
                                    </Grid> */}
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
                                    setCurrentRowData={setCurrentRowData}
                                    categoryList={categoryList}
                                    setCategoryList={setCategoryList}
                                    subCategoryList={subCategoryList}
                                    setSubCategoryList={setSubCategoryList}
                                />
                            </TabContext>
                        </Grid>
                    </Grid>
                </Grid>
            </MainCard>
            <AddCategory
                    open={open}
                    setOpen={setOpen}
                    currentRowData={currentRowData}
                    categoryList={categoryList}
                    setCategoryList={setCategoryList}
                />
        </>
    );
};

export default Categories;
