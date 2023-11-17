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
    useTheme
} from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import useScriptRef from 'hooks/useScriptRef';
import { gridSpacing } from 'store/constant';

// eslint-disable-next-line react/prop-types
const AddOrder = ({ open, setOpen }) => {
    const theme = useTheme();
    const scriptedRef = useScriptRef();
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog maxWidth="md" open={open} fullWidth>
            <Box p={2} mt={2}>
                <Typography variant="h2">Add Order</Typography>
            </Box>
            <DialogContent>
                <Formik
                    initialValues={{
                        name: '',
                        quantity: '',
                        category: '',
                        subCategory: '',
                        cropBrand: '',
                        brand: '',
                        unitPrice: '',
                        sku: '',
                        submit: null
                    }}
                    validationSchema={Yup.object().shape({
                        name: Yup.string().max(255).required('Name is required'),
                        quantity: Yup.number().required('Quantity is required'),
                        category: Yup.number().required('Category is required'),
                        subCategory: Yup.number().required('Sub Category is required'),
                        cropBrand: Yup.number().required('Crop Brand is required'),
                        brand: Yup.string().max(255).required('Brand is required'),
                        unitPrice: Yup.number().required('Unit Price is required'),
                        sku: Yup.string().max(255).required('SKU is required')
                    })}
                    onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                        try {
                            if (scriptedRef.current) {
                                setStatus({ success: true });
                                setSubmitting(false);
                                // login(values);
                            }
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
                                    <FormControl fullWidth error={Boolean(touched.quantity && errors.quantity)}>
                                        <InputLabel htmlFor="add-product-quantity">Quantity*</InputLabel>
                                        <OutlinedInput
                                            id="add-product-quantity"
                                            value={values.quantity}
                                            name="quantity"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            label="Quantity"
                                            inputProps={{}}
                                        />
                                        {touched.quantity && errors.quantity && <FormHelperText error>{errors.quantity}</FormHelperText>}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth error={Boolean(touched.category && errors.category)}>
                                        <InputLabel htmlFor="add-product-category">Category*</InputLabel>
                                        <Select
                                            id="add-product-category"
                                            value={values.category}
                                            name="category"
                                            label="Category"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        >
                                            <MenuItem value={10}>Ten</MenuItem>
                                            <MenuItem value={20}>Twenty</MenuItem>
                                            <MenuItem value={30}>Thirty</MenuItem>
                                        </Select>
                                        {touched.category && errors.category && <FormHelperText error>{errors.category}</FormHelperText>}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth error={Boolean(touched.category && errors.category)}>
                                        <InputLabel htmlFor="add-product-category">Category*</InputLabel>
                                        <OutlinedInput
                                            id="add-product-category"
                                            value={values.category}
                                            name="category"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            label="Category"
                                            inputProps={{}}
                                        />
                                        {touched.category && errors.category && <FormHelperText error>{errors.category}</FormHelperText>}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth error={Boolean(touched.category && errors.category)}>
                                        <InputLabel htmlFor="add-product-category">Category*</InputLabel>
                                        <OutlinedInput
                                            id="add-product-category"
                                            value={values.category}
                                            name="category"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            label="Category"
                                            inputProps={{}}
                                        />
                                        {touched.category && errors.category && <FormHelperText error>{errors.category}</FormHelperText>}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth error={Boolean(touched.category && errors.category)}>
                                        <InputLabel htmlFor="add-product-category">Category*</InputLabel>
                                        <OutlinedInput
                                            id="add-product-category"
                                            value={values.category}
                                            name="category"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            label="Category"
                                            inputProps={{}}
                                        />
                                        {touched.category && errors.category && <FormHelperText error>{errors.category}</FormHelperText>}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth error={Boolean(touched.unitPrice && errors.unitPrice)}>
                                        <InputLabel htmlFor="add-product-unitPrice">Price per Unit*</InputLabel>
                                        <OutlinedInput
                                            id="add-product-unitPrice"
                                            value={values.unitPrice}
                                            name="unitPrice"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            label="UnitPrice"
                                            inputProps={{}}
                                        />
                                        {touched.unitPrice && errors.unitPrice && <FormHelperText error>{errors.unitPrice}</FormHelperText>}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth error={Boolean(touched.sku && errors.sku)}>
                                        <InputLabel htmlFor="add-product-sku">Sku*</InputLabel>
                                        <OutlinedInput
                                            id="add-product-sku"
                                            value={values.sku}
                                            name="sku"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            label="Sku"
                                            inputProps={{}}
                                        />
                                        {touched.sku && errors.sku && <FormHelperText error>{errors.sku}</FormHelperText>}
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
export default AddOrder;
