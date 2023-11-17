/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
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
import axios from 'axios';
import { API_URL } from 'configuration';
import { apiGet, resourceUrl } from 'services';

const AddStaff = ({ open, setOpen, fetchStaff, setStores }) => {
    const theme = useTheme();
    const scriptedRef = useScriptRef();
    const handleClose = () => {
        setOpen(false);
    };

    const url = resourceUrl(`staff`);

    async function fetchStaff() {
        const data = _.get(await apiGet(url), 'data');
        setStores(data);
    }

    return (
        <Dialog maxWidth="md" open={open} fullWidth>
            <Box p={2} mt={2}>
                <Typography variant="h2">Add Staff Member</Typography>
            </Box>
            <DialogContent>
                <Formik
                    initialValues={{
                        name: '',
                        email: '',
                        kitchen_access: '',
                        phone: '',
                        role: '',
                        submit: null
                    }}
                    validationSchema={Yup.object().shape({
                        name: Yup.string().max(255).required('Name is required'),
                        email: Yup.string().email("Must a valid email").required('Email is required'),
                        phone: Yup.string().required('Phone no. is required'),
                        role: Yup.string().required('role is required'),
                        kitchen_access: Yup.string().required('Kitchen is required')
                    })}
                    onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                        try {
                            // if (scriptedRef.current) {
                            //     setStatus({ success: true });
                            //     setSubmitting(false);
                                // login(values);
                                console.log(values)
                                axios
                                    .post(`${API_URL}/staff/create`, values )
                                    .then((res) => {
                                        console.log(res.status);
                                        fetchStaff();
                                        setOpen(false)
                                })
                                    .catch((err) => console.log(err));
                            // }
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
                                    <FormControl fullWidth error={Boolean(touched.email && errors.email)}>
                                        <InputLabel htmlFor="email">Email</InputLabel>
                                        <OutlinedInput
                                            id="email"
                                            value={values.email}
                                            name="email"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            label="Email"
                                            inputProps={{}}
                                        />
                                        {touched.email && errors.email && <FormHelperText error>{errors.email}</FormHelperText>}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth error={Boolean(touched.phone && errors.phone)}>
                                        <InputLabel htmlFor="phone">Phone Number</InputLabel>
                                        <OutlinedInput
                                            id="phone"
                                            value={values.phone}
                                            name="phone"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            label="Phone"
                                            inputProps={{}}
                                        />
                                        {touched.phone && errors.phone && <FormHelperText error>{errors.phone}</FormHelperText>}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth error={Boolean(touched.role && errors.role)}>
                                        <InputLabel htmlFor="role">role</InputLabel>
                                        <Select
                                            id="role"
                                            value={values.role}
                                            name="role"
                                            label="role"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        >
                                            <MenuItem value={'manager'}>Manager</MenuItem>
                                            <MenuItem value={'sheff'}>Sheff</MenuItem>
                                            <MenuItem value={'waiter'}>Waiter</MenuItem>
                                        </Select>
                                        {touched.role && errors.role && <FormHelperText error>{errors.role}</FormHelperText>}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth error={Boolean(touched.kitchen_access && errors.kitchen_access)}>
                                        <InputLabel htmlFor="kitchen_access">Kitchen Access</InputLabel>
                                        <Select
                                            id="role"
                                            value={values.kitchen_access}
                                            name="kitchen_access"
                                            label="Kitchen Access"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        >
                                            <MenuItem value={'allowed'}>Allowed</MenuItem>
                                            <MenuItem value={'not-allowed'}>Not Allowed</MenuItem>
                                        </Select>
                                        {touched.kitchen_access && errors.kitchen_access && (
                                            <FormHelperText error>{errors.kitchen_access}</FormHelperText>
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
export default AddStaff;
