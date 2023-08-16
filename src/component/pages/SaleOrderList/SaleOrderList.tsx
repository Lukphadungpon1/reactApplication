import * as React from "react";
import { useSelector } from "react-redux";
import {
  SOEditClearData,
  saleOrderEditSelector,
} from "../../../store/slices/saleOrderEditSlice";
import {
  SaleOrderClear,
  SaleOrderSearch,
  saleOrderSelector,
} from "../../../store/slices/saleOrderSlice";
import { useAppDispatch } from "../../../store/store";
import { Alert, Box, Button, Grid, Stack, Typography } from "@mui/material";
import { ErrorMessage, Field, Form, Formik, FormikProps } from "formik";
import { TextField } from "formik-material-ui";
import SaleOrderListDetail from "./SaleOrderListDetail";
import { SOListRequest } from "../../../types/saleOrder.type";

type SaleOrderListProps = {
  //
};

const SaleOrderList: React.FC<any> = () => {
  const saleOrderReducer = useSelector(saleOrderSelector);
  const saleOrderEditReducer = useSelector(saleOrderEditSelector);

  const dispatch = useAppDispatch();

  const [fillterdata, setfillterdata] = React.useState<SOListRequest>();

  const dataFetchedRef = React.useRef(false);

  const initialValue: SOListRequest = {
    soNumber: "",
    cardCode: "",
    cardName: "",
    buy: "",
    docNum: "",
  };

  React.useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;

    return () => {
      dispatch(SaleOrderClear());
    };
  }, []);

  const handlecleardata = async () => {
    dispatch(SOEditClearData());
    dispatch(SaleOrderClear());
  };

  const showfromSearch = ({
    values,
    errors,
    setFieldValue,
    isSubmitting,
  }: FormikProps<SOListRequest>) => {
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
              spacing={{ xs: 1, md: 1 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              <Grid item xs={6} sm={6} md={2}>
                <Field
                  style={{ marginTop: 5 }}
                  variant="standard"
                  fullWidth
                  component={TextField}
                  id="cardCode"
                  name="cardCode"
                  type="text"
                  label="Customer Code"
                />
              </Grid>
              <Grid item xs={6} sm={6} md={2}>
                <Field
                  style={{ marginTop: 5 }}
                  variant="standard"
                  fullWidth
                  component={TextField}
                  id="cardName"
                  name="cardName"
                  type="text"
                  label="Customer Name"
                />
              </Grid>
              <Grid item xs={4} sm={4} md={2}>
                <Field
                  style={{ marginTop: 5 }}
                  variant="standard"
                  fullWidth
                  component={TextField}
                  id="soNumber"
                  name="soNumber"
                  type="text"
                  label="SO Number"
                />
              </Grid>
              <Grid item xs={4} sm={4} md={2}>
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
              <Grid item xs={4} sm={4} md={2}>
                <Field
                  style={{ marginTop: 5 }}
                  variant="standard"
                  fullWidth
                  component={TextField}
                  id="docNum"
                  name="docNum"
                  type="text"
                  label="DocNum (Sap)"
                />
              </Grid>
              <Grid item xs={12} sm={12} md={2}>
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{ marginTop: 2, justifyContent: "center" }}
                >
                  <Button
                    variant="outlined"
                    type="reset"
                    color="warning"
                    onClick={handlecleardata}
                  >
                    Clear
                  </Button>
                  <Button
                    disabled={saleOrderReducer.isFetching}
                    variant="contained"
                    color="info"
                    type="submit"
                    sx={{ marginRight: 1 }}
                  >
                    Fillter
                  </Button>
                </Stack>
              </Grid>
              {saleOrderReducer.isFetching && (
                <Grid item xs={12} sm={12} md={12}>
                  {" "}
                  <Alert
                    sx={{ margin: 1 }}
                    variant="outlined"
                    severity="warning"
                  >
                    Loading...
                  </Alert>
                </Grid>
              )}
              {saleOrderEditReducer.isFetching && (
                <Grid item xs={12} sm={12} md={12}>
                  {" "}
                  <Alert sx={{ margin: 1 }} variant="outlined" severity="info">
                    Loading...
                  </Alert>
                </Grid>
              )}
              {saleOrderEditReducer.isError && (
                <Grid item xs={12} sm={12} md={12}>
                  {" "}
                  <Alert sx={{ margin: 1 }} variant="outlined" severity="error">
                    {saleOrderEditReducer.message}
                  </Alert>
                </Grid>
              )}
            </Grid>
          </Form>
        </Box>
      </>
    );
  };

  const getSOList = async () => {
    const resultaction = await dispatch(
      SaleOrderSearch(fillterdata ? fillterdata : initialValue)
    );
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", width: "90%" }}>
      <Stack
        direction="column"
        spacing={2}
        sx={{ marginTop: 2, justifyContent: "center", width: "100%" }}
      >
        <Typography variant="h5" gutterBottom sx={{ textAlign: "center" }}>
          SaleOrder List
        </Typography>

        <Formik
          initialValues={initialValue}
          enableReinitialize
          onSubmit={async (values, { setSubmitting }) => {
            //console.log(values);

            setfillterdata(values);

            getSOList();
          }}
        >
          {(props: any) => showfromSearch(props)}
        </Formik>

        <Box
          sx={{
            backgroundColor: "white",
            opacity: [0.9, 0.9, 0.9],
            padding: "1rem",
            borderRadius: "5px",
            height: "100vh",
          }}
        >
          <SaleOrderListDetail getSOList={getSOList} />
        </Box>
      </Stack>
    </Box>
  );
};

export default SaleOrderList;
