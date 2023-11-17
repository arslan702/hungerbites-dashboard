/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import _ from 'lodash';
import { Grid, Button, Box, Tab } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import MainCard from 'ui-component/cards/MainCard';
import ProductsTabs from './ProductsTabs';
import { gridSpacing } from 'store/constant';
import EconomicsCard from 'components/economicsCard';
import AddProduct from './modals/AddProduct';
import { resourceUrl, apiGet } from 'services';
import axios from 'axios';
import { API_ROOT } from 'configuration';

const caturl = resourceUrl('category');
const corpbrandurl = resourceUrl('corpbrand');

const tabs = [
    {
        id: 1,
        label: 'All Products',
        value: 'allProducts'
    },
];

const Products = () => {
    const [value, setValue] = useState('allProducts');
    const [open, setOpen] = useState(false);
    const [categoryList, setCategoryList] = useState([]);
    const [corpbrandList, setCorpBrandList] = useState([]);
    const [currentRowData, setCurrentRowData] = useState({});
    const [productsList, setProductsList] = useState([]);
    const [inStockProducts, setInStockProducts] = useState([]);
    const [outStock, setOutStock] = useState([]);
    const [discountsList, setDiscountsList] = useState([]);
    const [productsCount, setProductsCount] = useState([]);
    const [offerCount, setOfferCount] = useState([]);
    const [discountCount, setDiscountCount] = useState([]);

    async function fetchCategories() {
        const data = _.get(await apiGet(caturl), 'data');
        setCategoryList(data);
    }

    console.log({categoryList})
    async function fetchCorpBrands() {
        const data = _.get(await apiGet(corpbrandurl), 'data');
        setCorpBrandList(data);
    }

    useEffect(() => {
        (async function () {
            await fetchCategories();
            await fetchCorpBrands();
        })();
        axios.get(`${API_ROOT}/product/productscount`)
        .then((res) => {
            setProductsCount(res?.data);
        })
        axios.get(`${API_ROOT}/tradeoffer/offertotal`)
        .then((res) => {
            setOfferCount(res?.data)
        })
        axios.get(`${API_ROOT}/discount/discounttotal`)
        .then((res) => {
            setDiscountCount(res?.data)
        })
    }, []);
    console.log({productsCount})
    const handleChange = (event, newValue) => {
        setValue(newValue);
        setCurrentRowData([]);
    };

    const handleAddProduct = () => {
        setOpen(true);
        setCurrentRowData([]);
    };

    const handleDeleteProduct = () => {};

    return (
        <>
            <MainCard
                title="Menu List"
                secondary={
                    <Box display={'flex'} gap={3}>
                        <Button variant="contained" sx={{ color: 'white', borderRadius: 2, backgroundColor: '#199088' }} onClick={handleAddProduct}>
                            Add Item
                        </Button>
                        {/* <Button variant="contained" color="error" sx={{ borderRadius: 2 }} onClick={handleDeleteProduct}>
                            Delete Product
                        </Button> */}
                    </Box>
                }
            >
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <Grid container spacing={gridSpacing}>
                            {/* {[...new Array(4)].map((item, index) => ( */}
                                <Grid item lg={3} md={6} xs={12}>
                                    <EconomicsCard title="Total Products" count={productsCount?.totalProducts} />
                                </Grid>
                                <Grid item lg={3} md={6} xs={12}>
                                    <EconomicsCard title="Product on sale" count={discountCount+offerCount} />
                                </Grid>
                                <Grid item lg={3} md={6} xs={12}>
                                    <EconomicsCard title="In stock Products" count={productsCount?.inStock} />
                                </Grid>
                                <Grid item lg={3} md={6} xs={12}>
                                    <EconomicsCard title="Out of Stock Products" count={productsCount?.outOfStock} />
                                </Grid>
                            {/* // ))} */}
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
                                <ProductsTabs
                                    setCurrentRowData={setCurrentRowData}
                                    tab={value}
                                    setOpen={setOpen}
                                    open={open}
                                    discountsList={discountsList}
                                    setDiscountsList={setDiscountsList}
                                    inStockProducts={inStockProducts}
                                    setInStockProducts={setInStockProducts}
                                    outStock={outStock}
                                    setOutStock={setOutStock}
                                    productsList={productsList}
                                    setProductsList={setProductsList}
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
                inStockProducts={inStockProducts}
                setInStockProducts={setInStockProducts}
                outStock={outStock}
                setOutStock={setOutStock}
                corpbrandList={corpbrandList}
                categoryList={categoryList}
                setProductsList={setProductsList}
            />
        </>
    );
};

export default Products;
