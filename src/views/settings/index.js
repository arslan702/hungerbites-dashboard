/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
"use client";
import {
  Grid,
  Card,
  CardHeader,
  Typography,
  TextField,
  Button,
} from "@mui/material";
// import MainCard from "@/ui-component/cards/MainCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import { API_URL } from "configuration";

const SettingsView = () => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const authUser = JSON?.parse(localStorage.getItem('user'));
    setUser(authUser);
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={6}>
            <Card>
              <CardHeader
                disableTypography
                title={<Typography variant="h3">Change Password</Typography>}
              />
              <Formik
                initialValues={{
                  password: "",
                  confirmPassword: "",
                }}
                validate={(values) => {
                  const errors = {};
                  if (!values.password) {
                    errors.password = "Required";
                  }
                  if (!values.confirmPassword) {
                    errors.confirmPassword = "Required";
                  } else if (values.confirmPassword !== values.password) {
                    errors.confirmPassword = "Passwords do not match";
                  }
                  return errors;
                }}
                onSubmit={(values) => {
                  console.log(values);
                  axios
                    .put(`${API_URL}/auth/resetpassword/${user?.id}`, values)
                    .then((res) => {
                      setMessage("Password reset successfully");
                      setOpen(true);
                    });
                }}
              >
                {({ errors, touched }) => (
                  <Form>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <Field
                        name="password"
                        label="New Password"
                        required
                        as={TextField}
                        size="small"
                        sx={{
                          width: "90%",
                          borderRadius: "10px",
                          margin: "15px",
                        }}
                      />
                      {errors.password && touched.password && (
                        <div>{errors.password}</div>
                      )}
                      <Field
                        name="confirmPassword"
                        label="Confirm Password"
                        required
                        as={TextField}
                        size="small"
                        sx={{
                          width: "90%",
                          borderRadius: "10px",
                          margin: "15px",
                        }}
                      />
                      {errors.confirmPassword && touched.confirmPassword && (
                        <div>{errors.confirmPassword}</div>
                      )}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          marginRight: "7%",
                          marginBottom: "10px",
                        }}
                      >
                        <Button
                          variant="contained"
                          sx={{
                            bgcolor: "custom.green",
                            fontWeight: "bold",
                            textTransform: "capitalize",
                            boxShadow: "none",
                          }}
                          type="submit"
                        >
                          Save
                        </Button>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </Card>
          </Grid>
        </Grid>
    </>
  );
};
export default SettingsView;
