/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
    Typography,
    Grid,
    InputLabel,
    OutlinedInput,
    FormControl,
    Stack,
    FormHelperText,
    Box,
    Select,
    MenuItem,
    useTheme,
    Input
} from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import _ from 'lodash';
import useScriptRef from 'hooks/useScriptRef';
import { gridSpacing } from 'store/constant';

import { apiPost, apiPut, resourceUrl, apiGet } from 'services';
import { useState } from 'react';

const expenseUrl = resourceUrl('expense');

const AddExpense = ({ open, setOpen, currentRowData, setExpense }) => {
    const theme = useTheme();
    const scriptedRef = useScriptRef();
    const handleClose = () => {
        setOpen(false);
    };

    async function fetchProducts() {
        const data = _.get(await apiGet(expenseUrl), 'data');
        setExpense(data);
    }

    console.log({ currentRowData });

    return (
        <Dialog maxWidth="md" open={open} fullWidth>
            <Box p={2} mt={2}>
                <Typography variant="h2">Add Expense</Typography>
            </Box>
            <DialogContent>
                <Formik
                    initialValues={{
                        item_name: currentRowData?.item_name,
                        amount: currentRowData?.amount,
                        expense_date: currentRowData?.expense_date
                        // submit: null
                    }}
                    validationSchema={Yup.object().shape({
                        item_name: Yup.string().max(255).required('Name is required'),
                        amount: Yup.number().required('Amount is required')
                    })}
                    onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                        console.log({ values });
                        try {
                            if (currentRowData?.id) {
                                const id = currentRowData?.id;
                                await apiPut(expenseUrl, { id, values });
                            } else {
                                await apiPost(
                                    expenseUrl,
                                    values
                                    // formData
                                );
                            }
                            await fetchProducts();
                            setStatus({ success: true });
                            setSubmitting(false);
                            setOpen(false);
                        } catch (err) {
                            console.error(err);
                            if (scriptedRef.current) {
                                setStatus({ success: false });
                                setErrors({ submit: err.message });
                                setSubmitting(false);
                            }
                        }
                    }}
                >
                    {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                        <form noValidate onSubmit={handleSubmit}>
                            <Grid container spacing={gridSpacing}>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth error={Boolean(touched.item_name && errors.item_name)}>
                                        <InputLabel htmlFor="item_name">Item Name</InputLabel>
                                        <OutlinedInput
                                            id="item_name"
                                            value={values.item_name}
                                            name="item_name"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            label="Item Name"
                                            inputProps={{}}
                                        />
                                        {touched.item_name && errors.item_name && <FormHelperText error>{errors.item_name}</FormHelperText>}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth error={Boolean(touched.amount && errors.amount)}>
                                        <InputLabel htmlFor="amount">Amount</InputLabel>
                                        <OutlinedInput
                                            id="amount"
                                            value={values.amount}
                                            name="amount"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            label="amount"
                                            inputProps={{}}
                                        />
                                        {touched.amount && errors.amount && <FormHelperText error>{errors.amount}</FormHelperText>}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth error={Boolean(touched.expense_date && errors.expense_date)}>
                                        <InputLabel htmlFor="expense_date">Expense Data</InputLabel>
                                        <OutlinedInput
                                            id="expense_date"
                                            value={values.expense_date}
                                            name="expense_date"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            label="Expense Date"
                                            inputProps={{}}
                                        />
                                        {touched.expense_date && errors.expense_date && (
                                            <FormHelperText error>{errors.expense_date}</FormHelperText>
                                        )}
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
                                            type="submit"
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
export default AddExpense;
