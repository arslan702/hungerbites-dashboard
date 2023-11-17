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
    Stack,
    FormHelperText,
    Box,
    useTheme
} from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import _ from 'lodash';
import useScriptRef from 'hooks/useScriptRef';
import { gridSpacing } from 'store/constant';
import { apiPost, apiPut, resourceUrl, apiGet } from 'services';
import { generalApiDataFormatter } from 'utils/utils';
import { useRef } from 'react';

const url = resourceUrl('category');
const keysToReplace = { name: 'categoryName', updatedAt: 'updated' };
const dateFormatKeys = ['updated'];

const AddCategory = ({ open, setOpen, currentRowData, setCategoryList }) => {
    const theme = useTheme();
    const inputRef = useRef();
    const scriptedRef = useScriptRef();

    const handleClose = () => {
        setOpen(false);
    };

    async function fetchCategories() {
        const data = _.get(await apiGet('category/'), 'data');
        const formattedData = generalApiDataFormatter(data, keysToReplace, dateFormatKeys);
        setCategoryList(formattedData);
    }

    return (
        <Dialog open={open} fullWidth>
            <Box p={2} mt={2}>
                <Typography variant="h2">Add Category</Typography>
            </Box>
            <DialogContent>
                <Formik
                    initialValues={{
                        name: currentRowData?.categoryName || '',
                        submit: null
                    }}
                    validationSchema={Yup.object().shape({
                        name: Yup.string().max(255).required('Name is required')
                    })}
                    onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                        try {
                            // if (scriptedRef.current) {
                            //     setStatus({ success: true });
                            //     setSubmitting(false);
                            //     // login(values);
                            // }

                            const { name } = values || {};
                            setSubmitting(true);

                            if (currentRowData?.id) {
                                await apiPut(url, { ...currentRowData, name });
                            } else {
                                await apiPost(url, {
                                    name
                                });
                            }
                            await fetchCategories();
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
                    {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => {
                        // values.name = currentRowData?.categoryName;
                        return (
                            <form noValidate onSubmit={handleSubmit}>
                                <Grid container spacing={gridSpacing}>
                                    <Grid item xs>
                                        <FormControl fullWidth error={Boolean(touched.name && errors.name)}>
                                            <InputLabel htmlFor="add-product-name">Name*</InputLabel>
                                            <OutlinedInput
                                                id="add-product-name"
                                                value={values.name}
                                                name="name"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                label="Name"
                                                inputProps={{}}
                                            />
                                            {touched.name && errors.name && <FormHelperText error>{errors.name}</FormHelperText>}
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
                        );
                    }}
                </Formik>
            </DialogContent>
        </Dialog>
    );
};
export default AddCategory;
