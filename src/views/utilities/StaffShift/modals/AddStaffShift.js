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
import { useEffect } from 'react';
import axios from 'axios';
import { API_URL } from 'configuration';

const staffshifturl = resourceUrl('staffshift');

const AddStaffShift = ({ open, setOpen, staff, currentRowData, setStaffShift }) => {
    const theme = useTheme();
    const [catId, setCatId] = useState('');
    const [corpId, setCorpId] = useState('');
    const scriptedRef = useScriptRef();
    const handleClose = () => {
        setOpen(false);
    };

    const [selectedFile, setSelectedFile] = useState(null);
    const handleFileChange = (e) => {
        // setSelectedFile(event.target.files[0]);
        const file = e.target.files[0];
        console.log({ file });
        setSelectedFile(null);
        //   setImagesPreview(null);

        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                //   setImagesPreview(reader.result);
                setSelectedFile(reader.result);
            }
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    console.log({ selectedFile });

    async function fetchProducts() {
        const data = _.get(await apiGet(staffshifturl), 'data');
        setStaffShift(data);
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
                        shift_start_time: currentRowData?.shift_start_time,
                        shift_end_time: currentRowData?.shift_end_time,
                        extra_working_time: currentRowData?.extra_working_time
                        // submit: null
                    }}
                    validationSchema={Yup.object().shape({
                        staff_id: Yup.number().max(255).required('Name is required'),
                        shift_start_time: Yup.string().required('Start time is required'),
                        shift_end_time: Yup.string().required('End time is required')
                    })}
                    onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                        console.log({ values });
                        try {
                            if (currentRowData?.id) {
                                const formData = new FormData();
                                console.log({ values });
                                for (let value in values) {
                                    formData.set(value, values[value]);
                                }
                                formData.append('image', selectedFile);
                                const id = currentRowData?.id;
                                await apiPut(staffshifturl, { id, values });
                            } else {
                                const formData = new FormData();
                                for (let value in values) {
                                    formData.set(value, values[value]);
                                }

                                formData.append('image', selectedFile);
                                await apiPost(
                                    staffshifturl,
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
                                                setCatId(e.target.value);
                                            }}
                                            onBlur={handleBlur}
                                        >
                                            {(staff || [])?.map((item) => (
                                                <MenuItem value={item.id}>{item.name}</MenuItem>
                                            ))}
                                        </Select>
                                        {touched.category_id && errors.category_id && (
                                            <FormHelperText error>{errors.category_id}</FormHelperText>
                                        )}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth error={Boolean(touched.shift_start_time && errors.shift_start_time)}>
                                        <InputLabel htmlFor="shift_start_time">Shift Start Time</InputLabel>
                                        <OutlinedInput
                                            id="shift_start_time"
                                            value={values.shift_start_time}
                                            name="shift_start_time"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            label="Shift Start Time"
                                            inputProps={{}}
                                        />
                                        {touched.shift_start_time && errors.shift_start_time && (
                                            <FormHelperText error>{errors.shift_start_time}</FormHelperText>
                                        )}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth error={Boolean(touched.shift_end_time && errors.shift_end_time)}>
                                        <InputLabel htmlFor="shift_end_time">Shift End Time</InputLabel>
                                        <OutlinedInput
                                            id="shift_end_time"
                                            value={values.shift_end_time}
                                            name="shift_end_time"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            label="Shift End Time"
                                            inputProps={{}}
                                        />
                                        {touched.shift_end_time && errors.shift_end_time && (
                                            <FormHelperText error>{errors.shift_end_time}</FormHelperText>
                                        )}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth error={Boolean(touched.extra_working_time && errors.extra_working_time)}>
                                        <InputLabel htmlFor="extra_working_time">Extra Working Time</InputLabel>
                                        <OutlinedInput
                                            id="extra_working_time"
                                            value={values.extra_working_time}
                                            name="extra_working_time"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            label="Extra Working Time"
                                            inputProps={{}}
                                        />
                                        {touched.extra_working_time && errors.extra_working_time && (
                                            <FormHelperText error>{errors.extra_working_time}</FormHelperText>
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
export default AddStaffShift;
