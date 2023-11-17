/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { NumericFormat } from 'react-number-format';
import MainCard from 'ui-component/cards/MainCard';
import { Typography, Stack, useTheme, Box, Card } from '@mui/material';
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';
import chartData from 'views/dashboard/Default/chart-data/bajaj-area-chart';

const EconomicsCard = ({ title, count, isRupees }) => {
    const theme = useTheme();
    return (
        <Card sx={{ backgroundColor: theme.palette.white, height: '140px', width: '240px', border: '0.5px solid #A6A4A5 !important', borderRadius: '8px' }}>
            <Stack spacing={1} sx={{ p: 1, pb: 0, color: '#fff' }}>
                <Typography variant="h5" color="#C7C8CA" fontFamily={'inter'} letterSpacing="0.6">
                    {title}
                </Typography>
                <Typography variant="h4" color="primary">
                    {isRupees ? (
                        <NumericFormat
                            thousandsGroupStyle="thousand"
                            value={count || 0}
                            prefix="RS"
                            decimalSeparator="."
                            displayType="text"
                            type="text"
                            thousandSeparator={true}
                            allowNegative={false}
                            fixedDecimalScale={true}
                            decimalScale={2}
                            allowEmptyFormatting={false}
                            allowLeadingZeros={false}
                            isNumericString={true}
                        />
                    ) : (
                        count
                    )}
                </Typography>
            </Stack>
            <Chart {...chartData} type='area'/>
        </Card>
    );
};
export default EconomicsCard;
