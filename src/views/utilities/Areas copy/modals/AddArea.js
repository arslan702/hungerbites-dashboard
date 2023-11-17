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
    useTheme
} from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import useScriptRef from 'hooks/useScriptRef';
import { gridSpacing } from 'store/constant';
import { apiPost, apiPut, resourceUrl, apiGet } from 'services';
import { generalApiDataFormatter } from 'utils/utils';

const url = resourceUrl('tradeoffer');
const keysToReplace = { updatedAt: 'updated' };
const dateFormatKeys = ['updated'];

const AddArea = ({ open, setOpen, currentRowData, setAreaList }) => {
    const theme = useTheme();
    const scriptedRef = useScriptRef();
    const handleClose = () => {
        setOpen(false);
    };

    async function fetchAreas() {
        const data = _.get(await apiGet(url), 'data');
        const formattedData = generalApiDataFormatter(data, keysToReplace, dateFormatKeys);
        setAreaList(formattedData);
    }

    return (
        <Dialog open={open} onClose={handleClose} fullWidth>
            <Box p={2} mt={2}>
                <Typography variant="h2">Add Area</Typography>
            </Box>
            <DialogContent>
                <Formik
                    initialValues={{
                        name: currentRowData?.name,
                        pincode: currentRowData?.pincode,
                        submit: null
                    }}
                    validationSchema={Yup.object().shape({
                        name: Yup.string().max(255).required('Name is required'),
                        pincode: Yup.number().required('PinCode is required')
                    })}
                    onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                        try {
                            // if (scriptedRef.current) {
                            //     setStatus({ success: true });
                            //     setSubmitting(false);
                            //     // login(values);
                            // }
                            const { name, pincode } = values || {};
                            setSubmitting(true);

                            if (currentRowData?.id) {
                                await apiPut(url, { ...currentRowData, name, pincode });
                            } else {
                                await apiPost(url, { name, pincode });
                            }
                            await fetchAreas();
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
                                <Grid item xs={12}>
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
                                <Grid item xs={12}>
                                    <FormControl fullWidth error={Boolean(touched.pincode && errors.pincode)}>
                                        <InputLabel htmlFor="add-product-pincode">PinCode*</InputLabel>
                                        <OutlinedInput
                                            id="add-product-pincode"
                                            value={values.pincode}
                                            name="pincode"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            label="PinCode"
                                            inputProps={{}}
                                        />
                                        {touched.pincode && errors.pincode && <FormHelperText error>{errors.pincode}</FormHelperText>}
                                    </FormControl>
                                </Grid>
                                {errors.submit && (
                                    <Box sx={{ mt: 3 }}>
                                        <FormHelperText error>{errors.submit}</FormHelperText>
                                    </Box>
                                )}
                                <Grid container sx={{ py: 2, mt: 2 }} justifyContent="flex-end">
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
export default AddArea;
