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

const url = resourceUrl('product/discount');
const offerurl = resourceUrl('tradeoffer');

const AddOffer = ({ open, setOpen, setOffersList, currentRowData }) => {
  const theme = useTheme();
  const [productsList, setProductsList] = useState([]);
  const scriptedRef = useScriptRef();
  const handleClose = () => {
      setOpen(false);
  };

  async function fetchProducts() {
      const data = _.get(await apiGet(url), 'data');
      setProductsList(data);
  }

  async function fetchDiscounts() {
      const data = _.get(await apiGet(offerurl), 'data');
      setOffersList(data)
  }

  useEffect(() => {
      (async function () {
          await fetchProducts();
      })();
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log({productsList})

  return (
      <Dialog maxWidth="md" open={open} fullWidth>
          <Box p={2} mt={2}>
              <Typography variant="h2">Add Offer</Typography>
          </Box>
          <DialogContent>
              <Formik
                  initialValues={{
                      product_id: currentRowData?.product_id,
                      offer_amount: currentRowData?.offer_amount,
                      start_date: currentRowData?.start_date,
                      end_date: currentRowData?.end_date,
                      submit: null
                  }}
                  validationSchema={Yup.object().shape({
                      product_id: Yup.number().required('Product is required'),
                      offer_amount: Yup.number().min(1, 'Amount must be greater than 0').required('Amount is required'),
                      start_date: Yup.date().required('Start date is required'),
                      end_date: Yup.date().required('End date is required'),
                  })}
                  onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                      console.log({values})
                      try {
                          if(currentRowData?.id) {
                              await apiPut(offerurl, { ...currentRowData, ...values})
                          } else {
                              await apiPost(
                                  offerurl,
                                  values
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
                                  <FormControl fullWidth error={Boolean(touched.product_id && errors.product_id)}>
                                      <InputLabel htmlFor="add-product-id">Product*</InputLabel>
                                      <Select
                                          id="product-id"
                                          value={values.product_id}
                                          name="product_id"
                                          label="Product"
                                          onChange={handleChange}
                                          // onBlur={handleBlur}
                                      >
                                          {productsList?.map((item) => (
                                              <MenuItem value={item.id}>{item?.name}</MenuItem>
                                          ))}
                                      </Select>
                                      {touched.product_id && errors.product_id && <FormHelperText error>{errors.product_id}</FormHelperText>}
                                  </FormControl>
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                  <FormControl fullWidth error={Boolean(touched.offer_amount && errors.offer_amount)}>
                                      <InputLabel htmlFor="add-offer-amount">Offer Amount*</InputLabel>
                                      <OutlinedInput
                                          id="add-offer-amount"
                                          value={values?.offer_amount}
                                          name="offer_amount"
                                          onBlur={handleBlur}
                                          onChange={handleChange}
                                          label="Offer Amount"
                                          // inputProps={{}}
                                      />
                                      {touched.offer_amount && errors.offer_amount && <FormHelperText error>{errors.offer_amount}</FormHelperText>}
                                  </FormControl>
                              </Grid>
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
export default AddOffer;
