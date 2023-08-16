import * as React from "react";

import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { LoginAsync, authSelector } from "../../../store/slices/authSlice";
import { FormikProps, Form, Field, Formik } from "formik";
import { TextField } from "formik-material-ui";
import { User } from "../../../types/user.type";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../store/store";
import Alert from "@mui/material/Alert";

import CustomizedSnackbars from "../CustomizedSnackbars";

type LoginPageProps = {
  //
};

const LoginPage: React.FC<any> = () => {
  const dispatch = useAppDispatch();
  const authredecer = useSelector(authSelector);
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);

  const handleopen = () => {
    setOpen(true);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const showfrom = ({ values, isSubmitting }: FormikProps<User>) => {
    return (
      <Form>
        <Card sx={{ width: "40vw" }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Login
            </Typography>
            <Field
              style={{ marginTop: 16 }}
              fullWidth
              component={TextField}
              id="empUsername"
              name="empUsername"
              type="text"
              label="Username"
            />
            <br />
            <Field
              style={{ marginTop: 16 }}
              fullWidth
              component={TextField}
              id="empPassword"
              name="empPassword"
              type="password"
              label="Password"
            />
            <br />
            {authredecer.isFetching && (
              <Typography gutterBottom variant="h5" component="h2">
                Loading....
              </Typography>
            )}
            {authredecer.isError && (
              // <CustomizedSnackbars
              //   open={open}
              //   onclose={handleClose}
              //   message={authredecer.message}
              //   serverity="warning"
              // />

              <Alert sx={{ margin: 1 }} variant="outlined" severity="warning">
                {authredecer.message}
              </Alert>
            )}
          </CardContent>

          <CardActions>
            <Box sx={{ width: "100%" }}>
              <Stack direction="row" spacing={2} sx={{ marginTop: 2 }}>
                <Button variant="outlined" fullWidth type="reset">
                  Clear
                </Button>
                <Button
                  disabled={authredecer.isFetching}
                  fullWidth
                  variant="contained"
                  color="primary"
                  type="submit"
                  sx={{ marginRight: 1 }}
                >
                  Login
                </Button>
              </Stack>
            </Box>
          </CardActions>
        </Card>
      </Form>
    );
  };

  const initialValues: User = {
    empUsername: "",
    empPassword: "",
    program: "AddOnSap",
  };

  return (
    <>
      <Box sx={{ display: "flex", height: "100vh", justifyContent: "center" }}>
        <Formik
          validate={(values: User) => {
            let errors: any = {};
            if (!values.empUsername) errors.empUsername = "Enter username";
            if (!values.empPassword) errors.empPassword = "Enter password";

            return errors;
          }}
          initialValues={initialValues}
          onSubmit={async (values, { setSubmitting }) => {
            //alert(JSON.stringify(values));

            const resultaction = await dispatch(LoginAsync(values));

            if (LoginAsync.fulfilled.match(resultaction)) {
              console.log("Login Success");
              console.log(authredecer.token);
            } else {
              console.log(JSON.stringify(authredecer.message));

              // handleopen();
            }
          }}
        >
          {(props: any) => showfrom(props)}
        </Formik>
      </Box>
    </>
  );
};

export default LoginPage;
