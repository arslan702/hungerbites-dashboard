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

const salaryurl = resourceUrl('salary');

const AddSalary = ({ open, setOpen, staff, currentRowData, setStaffSalary }) => {
    const theme = useTheme();
    const [catId, setCatId] = useState('');
    const scriptedRef = useScriptRef();
    const handleClose = () => {
        setOpen(false);
    };

    async function fetchProducts() {
        const data = _.get(await apiGet(salaryurl), 'data');
        setStaffSalary(data);
    }

    console.log({ currentRowData });

    return (
        <Dialog maxWidth="md" open={open} fullWidth>
            <Box p={2} mt={2}>
                <Typography variant="h2">Add Staff Shift</Typography>
            </Box>
            <DialogContent>
                <Formik
                    initialValues={{
                        staff_id: currentRowData?.staff_id,
                        status: currentRowData?.status,
                        month: currentRowData?.month,
                        year: currentRowData?.year,
                        total_salary: currentRowData?.total_salary
                        // submit: null
                    }}
                    validationSchema={Yup.object().shape({
                        staff_id: Yup.number().max(255).required('Name is required'),
                        status: Yup.string().required('Status is required'),
                        month: Yup.string().required('Month is required'),
                        year: Yup.string().required('Year is required')
                    })}
                    onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                        console.log({ values });
                        try {
                            if (currentRowData?.id) {
                                const id = currentRowData?.id;
                                await apiPut(salaryurl, { id, values });
                            } else {
                                await apiPost(
                                    salaryurl,
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
                                    <FormControl fullWidth error={Boolean(touched.staff_id && errors.staff_id)}>
                                        <InputLabel htmlFor="staff_id">Select Staff Name</InputLabel>
                                        <Select
                                            id="staff_id"
                                            value={values.staff_id}
                                            name="staff_id"
                                            label="Select Staff Name"
                                            onChange={(e) => {
                                                handleChange(e);
                                            }}
                                            onBlur={handleBlur}
                                        >
                                            {(staff || [])?.map((item) => (
                                                <MenuItem value={item.id}>{item.name}</MenuItem>
                                            ))}
                                        </Select>
                                        {touched.staff_id && errors.staff_id && <FormHelperText error>{errors.staff_id}</FormHelperText>}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth error={Boolean(touched.status && errors.status)}>
                                        <InputLabel htmlFor="status">Status</InputLabel>
                                        <Select
                                            id="role"
                                            value={values.status}
                                            name="status"
                                            label="status"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        >
                                            <MenuItem value={'paid'}>Paid</MenuItem>
                                            <MenuItem value={'not-paid'}>Not Piad</MenuItem>
                                        </Select>
                                        {touched.status && errors.status && <FormHelperText error>{errors.status}</FormHelperText>}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth error={Boolean(touched.month && errors.month)}>
                                        <InputLabel htmlFor="month">Month</InputLabel>
                                        <OutlinedInput
                                            id="month"
                                            value={values.month}
                                            name="month"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            label="Month"
                                            inputProps={{}}
                                        />
                                        {touched.month && errors.month && <FormHelperText error>{errors.month}</FormHelperText>}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth error={Boolean(touched.year && errors.year)}>
                                        <InputLabel htmlFor="year">Year</InputLabel>
                                        <OutlinedInput
                                            id="year"
                                            value={values.year}
                                            name="year"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            label="Year"
                                            inputProps={{}}
                                        />
                                        {touched.year && errors.year && <FormHelperText error>{errors.year}</FormHelperText>}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth error={Boolean(touched.total_salary && errors.total_salary)}>
                                        <InputLabel htmlFor="total_salary">Total Salary</InputLabel>
                                        <OutlinedInput
                                            id="total_salary"
                                            value={values.total_salary}
                                            name="total_salary"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            label="Total Salary"
                                            inputProps={{}}
                                        />
                                        {touched.total_salary && errors.total_salary && (
                                            <FormHelperText error>{errors.total_salary}</FormHelperText>
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
export default AddSalary;
