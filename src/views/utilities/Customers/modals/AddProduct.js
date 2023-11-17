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
  Stack,
  FormHelperText,
  Box,
  useTheme,
  Input,
} from "@mui/material";
import * as Yup from "yup";
import { Formik } from "formik";
import _ from "lodash";
import useScriptRef from "hooks/useScriptRef";
import { gridSpacing } from "store/constant";

import { apiGet, apiPut, resourceUrl } from "services";

const url = resourceUrl("auth/updatestatus");
const customerUrl = resourceUrl('/auth/userscount');

const EditCustomers = ({ open, setOpen, currentRowData, setCustomersList }) => {
  const theme = useTheme();
  const scriptedRef = useScriptRef();
  const handleClose = () => {
    setOpen(false);
  };

  console.log({ currentRowData });

  const id = currentRowData?.id;
  const status = currentRowData?.status == 'inactive' ? 'active' : 'inactive';
  const handleClick = async() => {
    apiPut(`auth/updatestatus/${id}`, {status})
    setOpen(false);
    const data = _.get(await apiGet(customerUrl), 'data')
    setCustomersList(data);
  }

  return (
    <Dialog maxWidth="md" open={open} onClose={handleClose} fullWidth>
      <Box display={"flex"} justifyContent={"space-between"}>
      <Box p={2} mt={2}>
        <Typography variant="h2">Customer Profile</Typography>
      </Box>
      <Box p={2} paddingRight={5} mt={2}>
        <Button onClick={handleClick} sx={{ color: 'white', borderRadius: 2, backgroundColor: '#1A9890' }}>{currentRowData?.status === 'active' ? 'inactive' : 'active'}</Button>
      </Box>
      </Box>
      <DialogContent>
        <Formik
          initialValues={{
            name: currentRowData?.name,
            address: currentRowData?.address,
            contactNumber: currentRowData?.contactNumber,
            submit: null,
          }}
          validationSchema={Yup.object().shape({
          })}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          }}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            touched,
            values,
          }) => (
            <form noValidate onSubmit={handleSubmit}>
              <Grid container spacing={gridSpacing}>
                <Grid item xs={12} sm={6}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.name && errors.name)}
                  >
                    <InputLabel htmlFor="customer-name">
                      Customer Name
                    </InputLabel>
                    <OutlinedInput
                      id="customer-name"
                      value={values?.name}
                      name="name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label="Customer Name"
                    />
                    {touched.name && errors.name && (
                      <FormHelperText error>{errors.name}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.address && errors.address)}
                  >
                    <InputLabel htmlFor="address">Address</InputLabel>
                    <OutlinedInput
                      id="address"
                      value={values?.address}
                      name="address"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label="Address"
                    />
                    {touched.address && errors.address && (
                      <FormHelperText error>{errors.address}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.phone_number && errors.phone_number)}
                  >
                    <InputLabel htmlFor="ph_num">Phone Number</InputLabel>
                    <OutlinedInput
                      id="ph_num"
                      value={values?.phone_number}
                      name="Phone Number"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label="Phone Number"
                    />
                    {touched.phone_number && errors.phone_number && (
                      <FormHelperText error>
                        {errors.phone_number}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                {errors.submit && (
                  <Box sx={{ mt: 3 }}>
                    <FormHelperText error>{errors.submit}</FormHelperText>
                  </Box>
                )}
              </Grid>
            </form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};
export default EditCustomers;
