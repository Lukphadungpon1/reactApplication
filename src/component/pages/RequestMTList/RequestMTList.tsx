import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { Field, Form, Formik, FormikProps } from "formik";
import * as React from "react";
import { IssueMTByAPRSearch } from "../../../types/issueMTAPR.type";
import { useSelector } from "react-redux";
import {
  ClearReqIssueMTAPR,
  getRequestMTListasync,
  issueMTAPRSelector,
} from "../../../store/slices/issueMTAPRSlice";
import { authSelector } from "../../../store/slices/authSlice";
import { useAppDispatch } from "../../../store/store";
import RequestList from "../RequestMTApprove/RequestList";
import { TextField } from "formik-material-ui";
import DetailList from "../RequestMTApprove/DetailList";
import LogList from "../RequestMTApprove/LogList";

type RequestMTListProps = {
  //
};

const RequestMTList: React.FC<any> = () => {
  const issueMTAPRReducer = useSelector(issueMTAPRSelector);
  const authReducer = useSelector(authSelector);
  const dispatch = useAppDispatch();

  const initialValues: IssueMTByAPRSearch = {
    id: 0,
    reqNumber: "",
    lot: "",
    location: "",
    itemCode: "",
    itemName: "",
    reqDept: "",
    requestBy: "",
    requestDate: "",
  };

  const dataFetchedRef = React.useRef(false);
  React.useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;

    console.log("useeffect apr issue mt");

    getRequestList(initialValues);

    return () => {
      dispatch(ClearReqIssueMTAPR());
    };
  }, []);

  const [openDiarlog, setopenDiarlog] = React.useState(false);
  const [headerdetail, setheaderdetail] = React.useState("");

  const getRequestList = (param: IssueMTByAPRSearch) => {
    console.log(param);

    var resultaction = dispatch(getRequestMTListasync(param));
  };

  const handlecloseDialog = () => {
    setopenDiarlog(false);
  };

  const handleopenDialog = (type: string) => {
    console.log(type);
    setheaderdetail(type);
    setopenDiarlog(true);
  };

  const handlecleardata = () => {
    dispatch(ClearReqIssueMTAPR());
  };

  const showDialog = () => {
    return (
      <Dialog
        fullWidth
        maxWidth="xl"
        PaperProps={{ sx: { height: "100vh" } }}
        open={openDiarlog}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          <Typography>{headerdetail}</Typography>
        </DialogTitle>
        <DialogContent>
          {/* <Typography>{JSON.stringify(props.values)}</Typography> */}
          {headerdetail === "Detail" && <DetailList />}
          {headerdetail === "Log" && <LogList />}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handlecloseDialog()} color="info">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  const showfrom = ({
    values,
    errors,
    setFieldValue,
    isSubmitting,
  }: FormikProps<IssueMTByAPRSearch>) => {
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
          <Grid container spacing={2}>
            <Grid xs={2}>
              <Form>
                <Grid
                  container
                  spacing={{ xs: 2, md: 3 }}
                  columns={{ xs: 4, sm: 8, md: 12 }}
                  sx={{ padding: 2 }}
                >
                  <Grid item xs={12} sm={12} md={12}>
                    <Typography variant="h5" sx={{ textAlign: "center" }}>
                      Request Issue MT List
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={12} md={12}>
                    <Field
                      style={{ marginTop: 5 }}
                      variant="standard"
                      fullWidth
                      component={TextField}
                      id="lot"
                      name="lot"
                      type="text"
                      label="Lot"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <Field
                      style={{ marginTop: 5 }}
                      variant="standard"
                      fullWidth
                      component={TextField}
                      id="reqDept"
                      name="reqDept"
                      type="text"
                      label="Department"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <Field
                      style={{ marginTop: 5 }}
                      variant="standard"
                      fullWidth
                      component={TextField}
                      id="reqNumber"
                      name="reqNumber"
                      type="text"
                      label="Request Number"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <Field
                      style={{ marginTop: 5 }}
                      variant="standard"
                      fullWidth
                      component={TextField}
                      id="requestDate"
                      name="requestDate"
                      type="date"
                      label="request Date"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
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
                        disabled={issueMTAPRReducer.isFetching}
                        variant="contained"
                        color="success"
                        type="submit"
                        sx={{ marginRight: 1 }}
                      >
                        Search
                      </Button>
                    </Stack>
                  </Grid>
                </Grid>
              </Form>
            </Grid>
            <Grid xs={10}>
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
                <Grid
                  container
                  spacing={{ xs: 2, md: 3 }}
                  columns={{ xs: 4, sm: 8, md: 12 }}
                  sx={{ marginLeft: 2 }}
                >
                  {issueMTAPRReducer.isFetching && (
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
                  {issueMTAPRReducer.isError && (
                    <Grid item xs={12} sm={12} md={12}>
                      {" "}
                      <Alert
                        sx={{ margin: 1 }}
                        variant="outlined"
                        severity="warning"
                      >
                        {issueMTAPRReducer.message}
                      </Alert>
                    </Grid>
                  )}
                </Grid>

                <RequestList handleopenDialog={handleopenDialog} />
              </Box>
            </Grid>
          </Grid>

          {/* {showDialog()}
              {showDialogDetail()} */}
        </Box>
      </>
    );
  };

  return (
    <Box sx={{ display: "flex", height: "auto" }}>
      <Formik
        validate={(values: IssueMTByAPRSearch) => {
          let errors: any = {};
          // if (!values.lot) errors.lot = "Enter Code";
          // if (!values.reqDept) errors.reqDept = "Enter Name";
          // if (!values.requestBy) errors.requestBy = "Enter RequestBy";
          // if (!values.requestDate) errors.BuyYear = "Enter request Date";

          // if (values.stock < 10) errors.stock = "Min stock is not lower than 10";
          // if (values.price < 100) errors.price = "Min price is not lower than 100";
          return errors;
        }}
        enableReinitialize
        initialValues={
          issueMTAPRReducer.IssueMTAPRSearch
            ? issueMTAPRReducer.IssueMTAPRSearch
            : initialValues
        }
        onSubmit={async (values, { setSubmitting }) => {
          console.log(values);
          getRequestList(values);
          // console.log(values.FormFiles.name);
          // console.log(excelData.length);
        }}
      >
        {(props: any) => showfrom(props)}
      </Formik>
      {showDialog()}
    </Box>
  );
};

export default RequestMTList;
