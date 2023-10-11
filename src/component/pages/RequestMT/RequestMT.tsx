import {
  Alert,
  Box,
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  IconButton,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import { Field, Form, Formik, FormikProps } from "formik";
import * as React from "react";
import { AllocateLotRequest } from "../../../types/allocatelot.type";
import { useSelector } from "react-redux";
import {
  ClearIssueMTState,
  GetItemRequestHasync,
  GetLocationIssueasync,
  GetLotForRequestasync,
  NewLogRequest,
  RequestIssueasync,
  SearchItemIssuebyType,
  requestissueMTSelector,
} from "../../../store/slices/RequestissueMTSlice";
import { useAppDispatch } from "../../../store/store";
import { TextField } from "formik-material-ui";

import {
  ReqIssueMTResponse,
  ReqIssueMaterialLog,
} from "../../../types/issueMT.type";
import SearchIcon from "@mui/icons-material/Search";
import RequestMTLotList from "../RequestMTLotList/RequestMTLotList";
import CustomSelecte from "../../CustomSelecte";
import RequestMTItemList from "../RequestMTItemList";
import { authSelector } from "../../../store/slices/authSlice";

type RequestMTProps = {
  //
};

const RequestMT: React.FC<any> = () => {
  const dataFetchedRef = React.useRef(false);
  const requestissueMTReducer = useSelector(requestissueMTSelector);
  const authReducer = useSelector(authSelector);

  const dispatch = useAppDispatch();

  const [openDialog, setopenDialog] = React.useState(false);

  const [openResultDialog, setopenResultDialog] = React.useState(false);

  const [errorLocation, seterrorLocation] = React.useState(false);

  const loadMasterData = async () => {
    const LocationIssue = await dispatch(GetLocationIssueasync());
  };

  const [type, settype] = React.useState("All");

  const [requesIssueLog, setrequesIssueLog] = React.useState<
    ReqIssueMaterialLog[]
  >([]);

  React.useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;

    loadMasterData();

    return () => {
      console.log("call back");
      dispatch(ClearIssueMTState());
    };
  }, []);

  const handlecleardata = async () => {
    dispatch(ClearIssueMTState());
  };

  const getLotList = async (values: AllocateLotRequest) => {
    const resultaction = await dispatch(GetLotForRequestasync(values));
  };

  const handleopenDialog = () => {
    setopenDialog(true);
  };

  const handlecloseDialog = () => {
    setopenDialog(false);
  };

  const handleChangelocation = (value: string) => {
    dispatch(SearchItemIssuebyType(value));
  };

  const showDialog = () => {
    return (
      <Dialog
        fullWidth
        maxWidth="xl"
        PaperProps={{ sx: { height: "80vh" } }}
        open={openDialog}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        {/* <DialogTitle>
          <Typography variant="h5" sx={{ textAlign: "left" }}>
            MainCard List
          </Typography>
        </DialogTitle> */}
        <DialogContent>
          {/* <Typography>{JSON.stringify(props.values)}</Typography> */}
          <RequestMTLotList handlecloseDialog={handlecloseDialog} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handlecloseDialog()} color="info">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  const showresultlist = () => {
    return (
      <Box sx={{ height: "100%", width: "100%" }}>
        <Grid
          container
          spacing={{ xs: 1, md: 2 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Grid item xs={12} sm={12} md={12}>
            <Stack
              direction="row"
              spacing={2}
              sx={{ marginTop: 2, justifyContent: "left" }}
            >
              <Typography variant="h5" sx={{ textAlign: "left" }}>
                Result List
              </Typography>

              <Button
                disabled={requestissueMTReducer.isFetching}
                type="button"
                onClick={() => {
                  setopenResultDialog(false);
                }}
              >
                Close
              </Button>
            </Stack>
          </Grid>

          <Grid spacing={0} item xs={12} sm={12} md={12}>
            <Box sx={{ width: "100%", maxWidth: 500 }}>
              {requestissueMTReducer.responselist.map((value, index) => (
                <Stack
                  direction="row"
                  spacing={1}
                  key={index}
                  sx={{ marginTop: 0, justifyContent: "left" }}
                >
                  <Typography
                    variant="overline"
                    sx={{ textAlign: "left" }}
                    color={value.errorMessage !== "Complete" ? "red" : "green"}
                  >
                    {value.referenceNumber} : {value.errorMessage}.
                  </Typography>
                </Stack>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Box>
    );
  };

  const showfrom = ({
    values,
    errors,
    setFieldValue,
    isSubmitting,
  }: FormikProps<ReqIssueMTResponse>) => {
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
                  Request Issue Material
                </Typography>
              </Grid>
              <Grid item xs={4} sm={3} md={3}>
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{ justifyContent: "center" }}
                >
                  <Field
                    style={{ marginTop: 5 }}
                    variant="standard"
                    fullWidth
                    component={TextField}
                    id="lot"
                    name="lot"
                    type="text"
                    label="Lot Number"
                  />

                  <IconButton
                    type="button"
                    aria-label="search"
                    onClick={(e: React.ChangeEvent<any>) => {
                      e.preventDefault();

                      setopenDialog(true);
                    }}
                  >
                    <SearchIcon />
                  </IconButton>
                </Stack>
              </Grid>
              <Grid item xs={4} sm={3} md={3}>
                <Field
                  style={{ marginTop: 5 }}
                  variant="standard"
                  fullWidth
                  disabled
                  component={TextField}
                  id="reqNumber"
                  name="reqNumber"
                  type="text"
                  label="Request Number"
                />
              </Grid>
              <Grid item xs={4} sm={3} md={3}>
                <Field
                  style={{ marginTop: 5 }}
                  variant="standard"
                  fullWidth
                  component={TextField}
                  id="requestDate"
                  name="requestDate"
                  type="date"
                  label="Request Date"
                />
              </Grid>
              <Grid item xs={4} sm={3} md={3}>
                <Field
                  style={{ marginTop: 5 }}
                  variant="standard"
                  fullWidth
                  component={TextField}
                  id="requireDate"
                  name="requireDate"
                  type="date"
                  label="Require Date"
                />
              </Grid>
              <Grid item xs={6} sm={6} md={6}>
                <Field
                  style={{ marginTop: 5 }}
                  variant="standard"
                  fullWidth
                  component={TextField}
                  id="remark"
                  name="remark"
                  type="text"
                  label="Remark"
                />
              </Grid>
              <Grid item xs={3} sm={3} md={3}>
                <Field
                  style={{ marginTop: 5 }}
                  variant="standard"
                  fullWidth
                  disabled
                  component={TextField}
                  id="requestBy"
                  name="requestBy"
                  type="text"
                  label="RequestBy"
                />
              </Grid>
              <Grid item xs={3} sm={3} md={3}>
                <Field
                  style={{ marginTop: 5 }}
                  variant="standard"
                  fullWidth
                  disabled
                  component={TextField}
                  id="reqDept"
                  name="reqDept"
                  type="text"
                  label="Department"
                />
              </Grid>
              <Grid item xs={3} sm={3} md={3}>
                <Field
                  style={{ marginTop: 5 }}
                  variant="standard"
                  fullWidth
                  component={CustomSelecte}
                  id="location"
                  name="location"
                  label="Location"
                ></Field>
              </Grid>

              <Grid item xs={6} sm={6} md={6}>
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{ marginTop: 2, justifyContent: "center" }}
                >
                  <Button
                    variant="outlined"
                    type="reset"
                    onClick={(e: React.ChangeEvent<any>) => {
                      e.preventDefault();
                      console.log("aaa");

                      handlecleardata();
                    }}
                  >
                    Clear
                  </Button>
                  <Button
                    disabled={requestissueMTReducer.isFetching}
                    variant="contained"
                    color="success"
                    type="submit"
                    sx={{ marginRight: 1 }}
                  >
                    Save
                  </Button>
                </Stack>
              </Grid>

              {errors.site && (
                <Grid item xs={4} sm={12} md={12}>
                  <Alert
                    sx={{ margin: 1 }}
                    variant="outlined"
                    severity="warning"
                  >
                    {errors.site}
                  </Alert>
                </Grid>
              )}
              {requestissueMTReducer.isFetching && (
                <Grid item xs={4} sm={12} md={12}>
                  <Alert sx={{ margin: 1 }} variant="outlined" severity="info">
                    {requestissueMTReducer.message}
                  </Alert>
                </Grid>
              )}

              {requestissueMTReducer.isError && (
                <Grid item xs={4} sm={12} md={12}>
                  <Alert
                    sx={{ margin: 1 }}
                    variant="outlined"
                    severity="warning"
                  >
                    {requestissueMTReducer.message}
                  </Alert>
                </Grid>
              )}
            </Grid>
          </Form>

          {showDialog()}
          {openResultDialog && showresultlist()}
          {/* {openDialog && showresultlist()}

        
          {showDialogPDResult()} */}
        </Box>
      </>
    );
  };

  const initialValues: ReqIssueMTResponse = {
    id: 0,
    reqNumber: "0",
    lot: "",
    requestBy: "",
    requestDate: new Date().toLocaleDateString("sv"),
    reqDept: "",
    site: "",
    requireDate: new Date().toLocaleDateString("sv"),
    remark: "",
    createBy: "",
    createDate: new Date().toLocaleDateString("sv"),
    updateBy: "",
    updateDate: new Date().toLocaleDateString("sv"),
    status: "",
    location: "",
    reqIssueMaterialDs: [],
    reqIssueMaterialLogs: [],
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
            width: "165vh",
            justifyContent: "start",
          }}
        >
          <Formik
            validate={(values: ReqIssueMTResponse) => {
              let errors: any = {};

              if (!values.lot) errors.lot = "Enter Lot Number";
              if (!values.requestDate) errors.requestDate = "Enter RequestDate";
              if (!values.requireDate) errors.requireDate = "Enter RequireDate";

              if (
                requestissueMTReducer.RequestissueMTH.reqIssueMaterialDs
                  .length === 0
              )
                seterrorLocation(true);

              if (
                requestissueMTReducer.RequestissueMTH.reqIssueMaterialDs
                  .length > 0
              ) {
                if (
                  requestissueMTReducer.RequestissueMTH.reqIssueMaterialDs.filter(
                    (f) => {
                      return f.location === "";
                    }
                  ).length > 0
                ) {
                  seterrorLocation(true);
                  errors.site = "Please select Location.";
                } else {
                  seterrorLocation(false);
                }
              }

              // if (values.stock < 10) errors.stock = "Min stock is not lower than 10";
              // if (values.price < 100) errors.price = "Min price is not lower than 100";
              return errors;
            }}
            enableReinitialize
            initialValues={
              requestissueMTReducer.RequestissueMTH
                ? requestissueMTReducer.RequestissueMTH
                : initialValues
            }
            onSubmit={async (values, { setSubmitting }) => {
              const resultaction = await dispatch(
                RequestIssueasync(requestissueMTReducer.RequestissueMTH)
              );

              if (RequestIssueasync.fulfilled.match(resultaction)) {
                const _reqdata: AllocateLotRequest = {
                  soNumber: "",
                  buy: "",
                  purOrder: "",
                  lot: requestissueMTReducer.RequestissueMTH.lot,
                };
                dispatch(GetItemRequestHasync(_reqdata));
              }
              setopenResultDialog(true);

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
            height: "80vh",
            width: "165vh",
          }}
        >
          <RequestMTItemList />
        </Box>
      </Stack>
    </Box>
  );
};

export default RequestMT;
