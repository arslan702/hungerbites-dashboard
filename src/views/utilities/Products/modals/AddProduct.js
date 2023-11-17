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

const producturl = resourceUrl('menuitem');

const AddInvoice = ({ open, setOpen, categoryList, currentRowData, setProductsList }) => {
    const theme = useTheme();
    const [catId, setCatId] = useState('');
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
        const data = _.get(await apiGet(producturl), 'data');
        setProductsList(data?.items);
    }

    console.log({ currentRowData });

    return (
        <Dialog maxWidth="md" open={open} fullWidth>
            <Box p={2} mt={2}>
                <Typography variant="h2">Add Product</Typography>
            </Box>
            <DialogContent>
                <Formik
                    initialValues={{
                        name: currentRowData?.name,
                        restaurant_id: currentRowData?.restaurant_id,
                        price: currentRowData?.price,
                        description: currentRowData?.description,
                        available: currentRowData?.available
                        // submit: null
                    }}
                    validationSchema={Yup.object().shape({
                        name: Yup.string().max(255).required('Name is required'),
                        restaurant_id: Yup.number().required('Restaurant is required'),
                        price: Yup.number().required('Unit Price is required')
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
                                await apiPut(producturl, { id, ...formData });
                            } else {
                                const formData = new FormData();
                                for (let value in values) {
                                    formData.set(value, values[value]);
                                }

                                formData.append('image', selectedFile);
                                await apiPost(
                                    producturl,
                                    {
                                        ...values,
                                        image: selectedFile
                                    }
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
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth error={Boolean(touched.category_id && errors.category_id)}>
                                        <InputLabel htmlFor="add-product-category">Category*</InputLabel>
                                        <Select
                                            id="add-product-category"
                                            value={values.category_id}
                                            name="category_id"
                                            label="Category"
                                            onChange={(e) => {
                                                handleChange(e);
                                                setCatId(e.target.value);
                                            }}
                                            onBlur={handleBlur}
                                        >
                                            {(categoryList || [])?.categories?.map((item) => (
                                                <MenuItem value={item.id}>{item.name}</MenuItem>
                                            ))}
                                        </Select>
                                        {touched.category_id && errors.category_id && (
                                            <FormHelperText error>{errors.category_id}</FormHelperText>
                                        )}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth error={Boolean(touched.price && errors.price)}>
                                        <InputLabel
                                            sx={{ '&.MuiFormLabel-root-MuiInputLabel-root.Mui-focused': { backgroundColor: 'blue' } }}
                                            htmlFor="add-product-price"
                                        >
                                            Price per Unit*
                                        </InputLabel>
                                        <OutlinedInput
                                            id="add-product-price"
                                            value={values.price}
                                            name="price"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            label="UnitPrice"
                                            inputProps={{}}
                                        />
                                        {touched.price && errors.price && <FormHelperText error>{errors.price}</FormHelperText>}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth error={Boolean(touched.description && errors.description)}>
                                        <InputLabel htmlFor="add-product-description">Description*</InputLabel>
                                        <OutlinedInput
                                            id="description"
                                            value={values.description}
                                            name="description"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            label="Description"
                                            inputProps={{}}
                                        />
                                        {touched.description && errors.description && (
                                            <FormHelperText error>{errors.description}</FormHelperText>
                                        )}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                        <Input type="file" id="fileInput" accept="image/*" onChange={handleFileChange} />
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
export default AddInvoice;
