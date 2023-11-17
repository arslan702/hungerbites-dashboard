/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
import EarningCard from './EarningCard';
import PopularCard from './PopularCard';
import TotalOrderLineChartCard from './TotalOrderLineChartCard';
import TotalIncomeDarkCard from './TotalIncomeDarkCard';
import TotalIncomeLightCard from './TotalIncomeLightCard';
import TotalGrowthBarChart from './TotalGrowthBarChart';
import TotalDeliveredOrderLineChartCard from './TotalDeliveredOrderLineChartCard';
import TotalProductsCard from './TotalProductsCard';
import { gridSpacing } from 'store/constant';
import axios from 'axios';
import { API_ROOT } from 'configuration';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
    const [isLoading, setLoading] = useState(true);
    const [amount, setAmount] = useState([]);
    const [orderNumber, setOrderNumber] = useState([]);
    const [delivered, setDelivered] = useState([]);
    const [profit, setProfit] = useState([]);
    const [totalOrders, setTotalOrders] = useState([]);

    useEffect(() => {
        setLoading(false);
        axios.get(`${API_ROOT}/order/orderamount`)
        .then((res) => {
            setAmount(res?.data)
        })
        axios.get(`${API_ROOT}/order/ordernumber`)
        .then((res) => {
            setOrderNumber(res?.data)
        })
        axios.get(`${API_ROOT}/order/delivered`)
        .then((res) => {
            setDelivered(res?.data)
        })
        axios.get(`${API_ROOT}/order/profit`)
        .then((res) => {
            setProfit(res?.data)
        })
        axios.get(`${API_ROOT}/order/total`)
        .then((res) => {
            setTotalOrders(res?.data);
        })
    }, []);

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={3} md={6} xs={12}>
                        <EarningCard isLoading={isLoading} yearEarning={amount?.totalAmount} monthEarning={amount?.sum_current_month}/>
                    </Grid>
                    <Grid item lg={3} md={6} xs={12}>
                        <TotalOrderLineChartCard isLoading={isLoading} yearOrders={orderNumber?.ordersCount} monthOrders={orderNumber?.thisyear}/>
                    </Grid>
                    <Grid item lg={3} md={6} xs={12}>
                        <TotalDeliveredOrderLineChartCard isLoading={isLoading} yearOrders={delivered?.ordersCount} monthOrders={delivered?.thisyear}/>
                    </Grid>
                    <Grid item lg={3} md={12} xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <TotalIncomeDarkCard isLoading={isLoading} income={profit?.delivered}/>
                            </Grid>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <TotalIncomeLightCard isLoading={isLoading} profit={profit?.profit}/>
                            </Grid>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <TotalProductsCard isLoading={isLoading} total={totalOrders}/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={8}>
                        <TotalGrowthBarChart isLoading={isLoading}/>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <PopularCard isLoading={isLoading} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Dashboard;
