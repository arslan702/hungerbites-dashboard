/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {
    Dialog,
    DialogContent,
    Button,
    Typography,
    Grid,
    InputLabel,
    OutlinedInput,
    FormControl,
    FormHelperText,
    Box,
    Select,
    MenuItem,
    useTheme
} from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import useScriptRef from 'hooks/useScriptRef';
import { gridSpacing } from 'store/constant';
import { useState } from 'react';
import { apiGet, apiPost, apiPut, resourceUrl } from 'services';
import { useEffect } from 'react';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import moment from 'moment';

const url = resourceUrl('menuitem/discount');
const discounturl = resourceUrl('discount');

const AddDiscount = ({ open, setOpen, setDiscountsList, currentRowData }) => {
    const theme = useTheme();
    const [productsList, setProductsList] = useState([]);
    const [start_date, setStartDate] = useState('');
    const [end_date, setEndDate] = useState('');
    const scriptedRef = useScriptRef();
    const handleClose = () => {
        setOpen(false);
    };

    async function fetchProducts() {
        const data = _.get(await apiGet(url), 'data');
        setProductsList(data);
    }

    async function fetchDiscounts() {
        const data = _.get(await apiGet(discounturl), 'data');
        setDiscountsList(data)
    }

    useEffect(() => {
        (async function () {
            await fetchProducts();
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    console.log({start_date})

    return (
        <Dialog maxWidth="md" open={open} fullWidth>
            <Box p={2} mt={2}>
                <Typography variant="h2">Add Discount</Typography>
            </Box>
            <DialogContent>
                <Formik
                    initialValues={{
                        menuItem_id: currentRowData?.menuItem_id,
                        discount_amount: currentRowData?.discount_amount,
                        start_date: currentRowData?.start_date,
                        end_date: currentRowData?.end_date,
                        submit: null
                    }}
                    validationSchema={Yup.object().shape({
                        menuItem_id: Yup.number().required('MenuItem is required'),
                        discount_amount: Yup.number().min(1, 'Amount must be greater than 0').required('Amount is required'),
                        // start_date: Yup.date().required('Start date is required'),
                        // end_date: Yup.date().required('End date is required'),
                    })}
                    onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                        console.log({values})
                        try {
                            if(currentRowData?.id) {
                                await apiPut(discounturl, { ...currentRowData, values
                                    // ...values, start_date, end_date
                                })
                            } else {
                                await apiPost(
                                    discounturl,
                                    values
                                    // {...values, start_date, end_date}
                                )
                            }
                            await fetchDiscounts()
                            // if (scriptedRef.current) {
                                setStatus({ success: true });
                                setSubmitting(false);
                                setOpen(false)
                                // login(values);
                            // }
                        } catch (err) {
                            console.error(err);
                            // if (scriptedRef.current) {
                                setStatus({ success: false });
                                setErrors({ submit: err.message });
                                setSubmitting(false);
                            // }
                        }
                    }}
                >
                    {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                        <form noValidate onSubmit={handleSubmit}>
                            <Grid container spacing={gridSpacing}>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth error={Boolean(touched.menuItem_id && errors.menuItem_id)}>
                                        <InputLabel htmlFor="menuItem-id">Product*</InputLabel>
                                        <Select
                                            id="menuItem-id"
                                            value={values.menuItem_id}
                                            name="menuItem_id"
                                            label="Product"
                                            onChange={handleChange}
                                            // onBlur={handleBlur}
                                        >
                                            {productsList?.map((item) => (
                                                <MenuItem value={item.id}>{item?.name}</MenuItem>
                                            ))}
                                        </Select>
                                        {touched.menuItem_id && errors.menuItem_id && <FormHelperText error>{errors.menuItem_id}</FormHelperText>}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth error={Boolean(touched.discount_amount && errors.discount_amount)}>
                                        <InputLabel htmlFor="add-discount-amount">Discount Amount*</InputLabel>
                                        <OutlinedInput
                                            id="add-discount-amount"
                                            value={values?.discount_amount}
                                            name="discount_amount"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            label="Discount Amount"
                                            // inputProps={{}}
                                        />
                                        {touched.discount_amount && errors.discount_amount && <FormHelperText error>{errors.discount_amount}</FormHelperText>}
                                    </FormControl>
                                </Grid>
                                {/* <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            label="Start Date"
                                            value={!values.start_date ? values?.start_date : moment(values.start_date).format('DD/MM/YYYY')}
                                            onChange={(value) => setStartDate(value)}
                                            onBlur={handleBlur}
                                            error={Boolean(touched.start_date && errors.start_date)}
                                            helperText={touched.start_date && errors.start_date}
                                        />
                                    </LocalizationProvider>
                                    </FormControl>
                                </Grid> */}
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth error={Boolean(touched.start_date && errors.start_date)}>
                                        <InputLabel htmlFor="add-start-date">Start Date</InputLabel>
                                        <OutlinedInput
                                            id="add-start-date"
                                            value={values.start_date}
                                            name="start_date"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            label="Start Date"
                                            inputProps={{}}
                                        />
                                        {touched.start_date && errors.start_date && <FormHelperText error>{errors.start_date}</FormHelperText>}
                                    </FormControl>
                                </Grid>
                                {/* <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            label="End Date"
                                            value={!values?.end_date ? values?.end_date : moment(values.end_date).format('DD/MM/YYYY')}
                                            onChange={(value) => setEndDate(value)}
                                            onBlur={handleBlur}
                                            error={Boolean(touched.end_date && errors.end_date)}
                                            helperText={touched.end_date && errors.end_date}
                                        />
                                    </LocalizationProvider>
                                    </FormControl>
                                </Grid> */}
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth error={Boolean(touched.end_date && errors.end_date)}>
                                        <InputLabel htmlFor="add-end-date">End Date</InputLabel>
                                        <OutlinedInput
                                            id="add-end-date"
                                            value={values.end_date}
                                            name="end_date"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            label="End Date"
                                            // inputProps={{}}
                                        />
                                        {touched.end_date && errors.end_date && <FormHelperText error>{errors.end_date}</FormHelperText>}
                                    </FormControl>
                                </Grid>
                                {errors.submit && (
                                    <Box sx={{ mt: 3 }}>
                                        <FormHelperText error>{errors.submit}</FormHelperText>
                                    </Box>
                                )}
                                <Grid container sx={{ py: 2, mt: 2 }} justifyContent="flex-end">
                                    <Grid item xs={2} mr={2}>
                                        <Button
                                            onClick={handleClose}
                                            disableElevation
                                            disabled={isSubmitting}
                                            fullWidth
                                            size="large"
                                            variant="contained"
                                            color="primary"
                                            sx={{ backgroundColor: '#9B2915' }}
                                        >
                                            Cancel
                                        </Button>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Button
                                            disableElevation
                                            disabled={isSubmitting}
                                            fullWidth
                                            size="large"
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                        >
                                            Save
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    );
};
export default AddDiscount;
