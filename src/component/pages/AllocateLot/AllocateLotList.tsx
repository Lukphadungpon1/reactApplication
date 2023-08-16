import React from "react";
import { useSelector } from "react-redux";
import {
  AddlotlistRequestParam,
  ClearallocateLot,
  GetLotasync,
  allocateLotSelector,
} from "../../../store/slices/allocateLotSlice";
import { useAppDispatch } from "../../../store/store";
import { AllocateLotRequest } from "../../../types/allocatelot.type";
import { Alert, Box, Button, Grid, Stack, Typography } from "@mui/material";
import { Field, Form, Formik, FormikProps } from "formik";
import LotList from "./LotList";
import { opensnackbar } from "../../../store/slices/snackbarSlice";
import { TextField } from "formik-material-ui";
import { useLocation } from "react-router-dom";
import { allocateLotEditSelector } from "../../../store/slices/allocateLotEditSlice";

type Props = {};

const AllocateLotList = (props: Props) => {
  const dataFetchedRef = React.useRef(false);

  const { state } = useLocation();
  const allocatelotReducer = useSelector(allocateLotSelector);

  const dispatch = useAppDispatch();

  const initialValues: AllocateLotRequest = {
    soNumber: "",
    buy: "",
    purOrder: "",
    lot: "",
  };

  React.useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;

    if (state) {
      if (state.types === "UpdateQty") {
        getLotList(allocatelotReducer.allocateLotLisrequest);
      }
    }

    console.log("useeffect allocatelot");
    return () => {
      dispatch(ClearallocateLot());
    };
  }, []);

  const handlecleardata = () => {
    dispatch(ClearallocateLot());
  };

  const showfrom = ({
    values,
    errors,
    setFieldValue,
    isSubmitting,
  }: FormikProps<AllocateLotRequest>) => {
    return (
      <>
        <Box
          sx={{
            flexGrow: 1,
            backgroundColor: "white",
            opacity: [0.9, 0.9, 0.9],
            padding: "1rem",
            borderRadius: "5px",
            height: "auto",
          }}
        >
          <Form>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              <Grid item xs={12} sm={12} md={12}>
                <Typography variant="h5" sx={{ textAlign: "center" }}>
                  Lot List
                </Typography>
              </Grid>
              <Grid item xs={4} sm={3} md={3}>
                <Field
                  style={{ marginTop: 5 }}
                  variant="standard"
                  fullWidth
                  component={TextField}
                  id="buy"
                  name="buy"
                  type="text"
                  label="Buy"
                />
              </Grid>
              <Grid item xs={4} sm={3} md={3}>
                <Field
                  style={{ marginTop: 5 }}
                  variant="standard"
                  fullWidth
                  component={TextField}
                  id="purOrder"
                  name="purOrder"
                  type="text"
                  label="PO Order"
                />
              </Grid>
              <Grid item xs={4} sm={3} md={3}>
                <Field
                  style={{ marginTop: 5 }}
                  variant="standard"
                  fullWidth
                  component={TextField}
                  id="soNumber"
                  name="soNumber"
                  type="text"
                  label="Sale Order"
                />
              </Grid>
              <Grid item xs={4} sm={3} md={3}>
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{ marginTop: 2, justifyContent: "center" }}
                >
                  <Button
                    variant="outlined"
                    type="reset"
                    onClick={handlecleardata}
                  >
                    Clear
                  </Button>
                  <Button
                    disabled={allocatelotReducer.isFetching}
                    variant="contained"
                    color="success"
                    type="submit"
                    sx={{ marginRight: 1 }}
                  >
                    Get Data
                  </Button>
                </Stack>
              </Grid>

              {allocatelotReducer.isFetching && (
                <Grid item xs={4} sm={12} md={12}>
                  <Alert sx={{ margin: 1 }} variant="outlined" severity="info">
                    {allocatelotReducer.message}
                  </Alert>
                </Grid>
              )}

              {allocatelotReducer.isError && (
                <Grid item xs={4} sm={12} md={12}>
                  <Alert
                    sx={{ margin: 1 }}
                    variant="outlined"
                    severity="warning"
                  >
                    {allocatelotReducer.message}
                  </Alert>
                </Grid>
              )}
            </Grid>
          </Form>
        </Box>
      </>
    );
  };

  const getLotList = async (values: AllocateLotRequest) => {
    const resultaction = await dispatch(GetLotasync(values));
  };

  return (
    <Box sx={{ display: "flex", height: "auto" }}>
      <Stack
        direction="column"
        justifyContent="start"
        alignItems="start"
        spacing={4}
      >
        <Box
          sx={{
            display: "flex",
            height: "auto",
            width: "150vh",
            justifyContent: "start",
          }}
        >
          <Formik
            validate={(values: AllocateLotRequest) => {
              let errors: any = {};
              if (!values.soNumber && !values.buy && !values.purOrder) {
                if (!values.soNumber) errors.soNumber = "Enter Sale Order";
                if (!values.buy) errors.buy = "Enter Buy";
                if (!values.purOrder) errors.purOrder = "Enter PU Order";
              }

              // if (values.stock < 10) errors.stock = "Min stock is not lower than 10";
              // if (values.price < 100) errors.price = "Min price is not lower than 100";
              return errors;
            }}
            enableReinitialize
            initialValues={
              allocatelotReducer.allocateLotLisrequest
                ? allocatelotReducer.allocateLotLisrequest
                : initialValues
            }
            onSubmit={async (values, { setSubmitting }) => {
              const resultaction = await dispatch(GetLotasync(values));

              console.log("aaa");
            }}
          >
            {(props: any) => showfrom(props)}
          </Formik>
        </Box>

        <Box
          sx={{
            backgroundColor: "white",
            opacity: [0.9, 0.9, 0.9],
            padding: "1rem",
            borderRadius: "5px",
            height: "80vh",
            width: "160vh",
          }}
        >
          <LotList getLotList={getLotList} />
        </Box>
      </Stack>
    </Box>
  );
};

export default AllocateLotList;
