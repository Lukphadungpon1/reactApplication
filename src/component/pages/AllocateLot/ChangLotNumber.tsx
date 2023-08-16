import { Alert, Box, Button, Grid, IconButton, Stack } from "@mui/material";
import { Field, Form, Formik, FormikProps } from "formik";
import React from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../store/store";
import {
  ChLotNumber,
  GetLotasync,
  allocateLotSelector,
} from "../../../store/slices/allocateLotSlice";
import { ChangeLotnumber } from "../../../types/allocatelot.type";
import { TextField } from "formik-material-ui";

type Props = {
  handleClearChangeLotNumber: () => any;
};

const ChangLotNumber = (props: Props) => {
  const allocateLotReducer = useSelector(allocateLotSelector);
  const dispatch = useAppDispatch();

  const showfrom = ({
    values,
    errors,
    setFieldValue,
    isSubmitting,
  }: FormikProps<ChangeLotnumber>) => {
    return (
      <>
        <Box
          sx={{
            flexGrow: 1,
            backgroundColor: "white",
            opacity: [0.9, 0.9, 0.9],
            padding: "1rem",
            borderRadius: "5px",
          }}
        >
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Stack
                  direction="row"
                  spacing={3}
                  sx={{ justifyContent: "center" }}
                >
                  <Field
                    style={{ marginTop: 5 }}
                    variant="standard"
                    fullWidth
                    component={TextField}
                    id="LotFrom"
                    name="LotFrom"
                    type="text"
                    label="Lot Form"
                  />
                  <Field
                    style={{ marginTop: 5 }}
                    variant="standard"
                    fullWidth
                    component={TextField}
                    id="LotTo"
                    name="LotTo"
                    type="text"
                    label="Lot To"
                  />
                </Stack>
              </Grid>
              {allocateLotReducer.isFetching && (
                <Grid item xs={12} sm={12} md={12}>
                  {""}
                  <Alert
                    sx={{ margin: 1 }}
                    variant="outlined"
                    severity="warning"
                  >
                    Locading...
                  </Alert>
                </Grid>
              )}
              {allocateLotReducer.isError && (
                <Grid item xs={12} sm={12} md={12}>
                  {" "}
                  <Alert
                    sx={{ margin: 1 }}
                    variant="outlined"
                    severity="warning"
                  >
                    {allocateLotReducer.message}
                  </Alert>
                </Grid>
              )}

              <Grid item xs={12}>
                <Button
                  disabled={allocateLotReducer.isFetching}
                  variant="contained"
                  color="success"
                  type="submit"
                  sx={{ marginRight: 1 }}
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </Form>
        </Box>
      </>
    );
  };

  const initialValues: ChangeLotnumber = {
    id: 0,
    LotFrom: "",
    LotTo: "",
  };

  return (
    <Box sx={{ display: "flex", height: "15vh" }}>
      <Formik
        validate={(values: ChangeLotnumber) => {
          let errors: any = {};
          if (values.LotFrom === "") errors.LotFrom = "Enter LotFrom";
          if (values.LotTo === "") errors.LotTo = "Enter LotTo";

          return errors;
        }}
        initialValues={
          allocateLotReducer.changeLotNumber
            ? allocateLotReducer.changeLotNumber
            : initialValues
        }
        enableReinitialize
        onSubmit={async (values, { setSubmitting }) => {
          const resultaction = await dispatch(ChLotNumber(values));

          if (ChLotNumber.fulfilled.match(resultaction)) {
            dispatch(GetLotasync(allocateLotReducer.allocateLotLisrequest!));
            props.handleClearChangeLotNumber();
          }
        }}
      >
        {(props: any) => showfrom(props)}
      </Formik>
    </Box>
  );
};

export default ChangLotNumber;
