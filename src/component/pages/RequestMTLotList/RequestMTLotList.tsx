import {
  Alert,
  Box,
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { Field, Form, Formik, FormikProps } from "formik";
import * as React from "react";
import { AllocateLotRequest } from "../../../types/allocatelot.type";
import { useSelector } from "react-redux";
import {
  ClearRequestMTLostList,
  GetLocationIssueasync,
  GetLotForRequestasync,
  issueMTSelector,
} from "../../../store/slices/issueMTSlice";
import { useAppDispatch } from "../../../store/store";
import { TextField } from "formik-material-ui";
import LotListReqMT from "./LotListReqMT";
import ItemListReqMT from "../ItemListReqMT/ItemListReqMT";

type RequestMTLotListProps = {
  handlecloseDialog: any;
};

const RequestMTLotList: React.FC<any> = (props: RequestMTLotListProps) => {
  const dataFetchedRef = React.useRef(false);
  const issueMTReducer = useSelector(issueMTSelector);

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
  }, []);

  const handlecleardata = async () => {
    dispatch(ClearRequestMTLostList());
  };

  const getLotList = async (values: AllocateLotRequest) => {
    const resultaction = await dispatch(GetLotForRequestasync(values));
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
            height: "100%",
          }}
        >
          <Form>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
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
                    disabled={issueMTReducer.isFetching}
                    variant="contained"
                    color="success"
                    type="submit"
                    sx={{ marginRight: 1 }}
                  >
                    Get Data
                  </Button>
                </Stack>
              </Grid>

              {issueMTReducer.isFetching && (
                <Grid item xs={4} sm={12} md={12}>
                  <Alert sx={{ margin: 1 }} variant="outlined" severity="info">
                    {issueMTReducer.message}
                  </Alert>
                </Grid>
              )}

              {issueMTReducer.isError && (
                <Grid item xs={4} sm={12} md={12}>
                  <Alert
                    sx={{ margin: 1 }}
                    variant="outlined"
                    severity="warning"
                  >
                    {issueMTReducer.message}
                  </Alert>
                </Grid>
              )}
            </Grid>
          </Form>
          {/* {openDialog && showresultlist()}
          {showDialogPDResult()} */}
        </Box>
      </>
    );
  };

  return (
    <Box sx={{ width: "auto", height: "auto" }}>
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
            width: "190vh",
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
            initialValues={issueMTReducer.allocateLotLisrequest}
            onSubmit={async (values, { setSubmitting }) => {
              const resultaction = await dispatch(
                GetLotForRequestasync(values)
              );

              // console.log("aaa");
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

            width: "190vh",
          }}
        >
          <LotListReqMT
            getLotList={getLotList}
            handlecloseDialog={props.handlecloseDialog}
          />
        </Box>
      </Stack>
    </Box>
  );
};

export default RequestMTLotList;
