import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppDispatch } from "../../../store/store";
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { Field, Form, Formik, FormikProps } from "formik";
import { authSelector } from "../../../store/slices/authSlice";
import {
  CleanIssueMTState,
  CreateIssueMTasync,
  GetIssueByIdasync,
  GetissueMTListDasync,
  issueMTSelector,
} from "../../../store/slices/issueMTSlice";
import { useSelector } from "react-redux";
import { IssueMaterialHResponse } from "../../../types/picking.type.tx";
import IssueMTListD from "./IssueMTListD";
import { TextField } from "formik-material-ui";
import CustomSelecte from "../../CustomSelecte";
import { GetLocationPickasync } from "../../../store/slices/pickingSlice";
import { ClearIssueMTState } from "../../../store/slices/RequestissueMTSlice";
import IssueMTListDDetail from "./IssueMTListDDetail";
import IssueMTListDManual from "./IssueMTListDManual";
import IssueMTListTrans from "./IssueMTListTrans";
import { IssueMTSearch } from "../../../types/issueMT.type";
import { opensnackbar } from "../../../store/slices/snackbarSlice";

type IssueMTProps = {
  //
};

const IssueMT: React.FC<any> = () => {
  const { state } = useLocation();
  const dataFetchedRef = React.useRef(false);

  const issueMTReducer = useSelector(issueMTSelector);
  const authreducer = useSelector(authSelector);
  const dispatch = useAppDispatch();

  const loadIssByID = async (value: Number) => {
    var resultaction = await dispatch(GetIssueByIdasync(value));

    if (GetIssueByIdasync.fulfilled.match(resultaction)) {
      await dispatch(GetissueMTListDasync(value));
    }
  };

  const [typedetail, settypedetail] = React.useState("");
  const [openDialogDetail, setopenDialogDetail] = React.useState(false);

  const loadMasterData = async () => {
    await dispatch(GetLocationPickasync());
  };

  React.useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;

    if (state) {
      loadIssByID(state.rowid);
    }

    loadMasterData();

    return () => {
      dispatch(CleanIssueMTState());
      console.log("call back");
    };
  }, []);

  const handlegetdataDetail = () => {};

  const handlecleardata = () => {
    dispatch(ClearIssueMTState());
  };

  const handledetail = (types: string) => {
    settypedetail(types);
    setopenDialogDetail(true);
  };

  const showDialogDetail = () => {
    return (
      <Dialog
        fullWidth
        maxWidth="xl"
        PaperProps={{ sx: { height: "100vh" } }}
        open={openDialogDetail}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          <Typography>{typedetail} List</Typography>
        </DialogTitle>
        <DialogContent>
          {typedetail === "Detail" && <IssueMTListDDetail />}
          {typedetail === "Manual Issue" && <IssueMTListDManual />}
          {typedetail === "Transection" && <IssueMTListTrans />}
          {/* <Typography>{JSON.stringify(props.values)}</Typography> */}
          {/* <PickingItemDList itemD={ItemHDetail} /> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setopenDialogDetail(false)} color="info">
            Close
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
  }: FormikProps<IssueMaterialHResponse>) => {
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
              <Grid item xs={12} sm={12} md={12}>
                <Typography variant="h5" sx={{ textAlign: "center" }}>
                  Issue
                </Typography>
              </Grid>

              <Grid item xs={6} sm={9} md={9}>
                <Field
                  style={{ marginTop: 5 }}
                  variant="standard"
                  fullWidth
                  disabled
                  component={TextField}
                  id="lotlist"
                  name="lotlist"
                  type="text"
                  label="Lot List"
                />
              </Grid>
              <Grid item xs={4} sm={3} md={3}>
                <Field
                  style={{ marginTop: 5 }}
                  variant="standard"
                  fullWidth
                  component={TextField}
                  disabled
                  id="status"
                  name="status"
                  type="text"
                  label="status"
                />
              </Grid>
              <Grid item xs={6} sm={3} md={3}>
                <Field
                  style={{ marginTop: 5 }}
                  variant="standard"
                  fullWidth
                  component={TextField}
                  disabled
                  id="issueNumber"
                  name="issueNumber"
                  type="text"
                  label="Doc Number"
                />
              </Grid>
              <Grid item xs={6} sm={3} md={3}>
                <Field
                  style={{ marginTop: 5 }}
                  variant="standard"
                  fullWidth
                  component={TextField}
                  disabled
                  id="pickingBy"
                  name="pickingBy"
                  type="text"
                  label="Picking By"
                />
              </Grid>
              <Grid item xs={6} sm={3} md={3}>
                <Field
                  style={{ marginTop: 5 }}
                  variant="standard"
                  fullWidth
                  component={TextField}
                  disabled
                  id="pickingDate"
                  name="pickingDate"
                  type="text"
                  label="PickingDate"
                />
              </Grid>
              <Grid item xs={6} sm={3} md={3}>
                <Field
                  style={{ marginTop: 5 }}
                  variant="standard"
                  fullWidth
                  component={TextField}
                  disabled
                  id="printDate"
                  name="printDate"
                  label="PrintDate"
                ></Field>
              </Grid>

              <Grid item xs={6} sm={3} md={3}>
                <Field
                  style={{ marginTop: 5 }}
                  variant="standard"
                  component={CustomSelecte}
                  id="location"
                  name="location"
                  label="Location"
                ></Field>
              </Grid>

              <Grid item xs={6} sm={9} md={9}>
                <Field
                  style={{ marginTop: 5 }}
                  variant="standard"
                  fullWidth
                  disabled
                  component={TextField}
                  id="Remark"
                  name="Remark"
                  type="text"
                  label="Remark"
                />
              </Grid>

              {issueMTReducer.isError && (
                <Grid item xs={12} sm={12} md={12}>
                  {" "}
                  <Alert
                    sx={{ margin: 1 }}
                    variant="outlined"
                    severity="warning"
                  >
                    {issueMTReducer.message}
                  </Alert>
                </Grid>
              )}

              {errors.createBy && (
                <Grid item xs={12} sm={12} md={12}>
                  {" "}
                  <Alert
                    sx={{ margin: 1 }}
                    variant="outlined"
                    severity="warning"
                  >
                    {errors.createBy}
                  </Alert>
                </Grid>
              )}

              {issueMTReducer.isFetching && (
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

              <Grid item xs={4} sm={4} md={4}>
                <Stack
                  direction="row"
                  spacing={4}
                  sx={{ margin: 2, justifyContent: "left" }}
                >
                  <Button
                    variant="outlined"
                    color="inherit"
                    type="button"
                    onClick={() => handledetail("Detail")}
                  >
                    Detail
                  </Button>
                  <Button
                    variant="outlined"
                    color="inherit"
                    type="button"
                    onClick={() => handledetail("Manual Issue")}
                  >
                    Manul
                  </Button>
                  <Button
                    variant="outlined"
                    color="inherit"
                    type="button"
                    onClick={() => handledetail("Transection")}
                  >
                    Trans..
                  </Button>
                </Stack>
              </Grid>

              <Grid item xs={8} sm={8} md={8}>
                <Stack
                  direction="row"
                  spacing={4}
                  sx={{ margin: 2, justifyContent: "left" }}
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
                    Save
                  </Button>
                  <Link to="/external-link" target="_blank" rel="noreferrer">
                    <Button
                      disabled={issueMTReducer.isFetching}
                      variant="contained"
                      color="info"
                      type="button"
                      sx={{ marginRight: 1 }}
                    >
                      Print Picking List
                    </Button>
                  </Link>
                </Stack>
              </Grid>

              {/* {Array.from(Array(6)).map((_, index) => (
                <Grid item xs={2} sm={4} md={4} key={index}>
                  <Item>xs=2</Item>
                </Grid>
              ))} */}
            </Grid>
          </Form>

          {/* {showDialogDetail()} */}
        </Box>
      </>
    );
  };

  const initialValues: IssueMaterialHResponse = {
    id: 0,
    issueNumber: "",
    location: "",
    lotlist: "",
    pickingBy: "",
    pickingDate: "",
    printDate: null,
    issueBy: "",
    issueDate: null,
    createBy: "",
    createDate: "",
    updateBy: "",
    updateDate: null,
    status: "",
    uploadFile: "",
    convertSap: 0,
    docEntry: 0,
    docNum: "",
    remark: "",
    issueMaterialDs: [],
    issueMaterialManuals: [],
    issueMaterialLogs: [],
  };

  return (
    <Box sx={{ display: "flex", height: "100%" }}>
      <Stack
        direction="column"
        spacing={2}
        sx={{ justifyContent: "center", width: "170vh" }}
      >
        <Formik
          validate={(values: IssueMaterialHResponse) => {
            let errors: any = {};

            if (!issueMTReducer.issueMT.issueNumber)
              errors.issueNumber = "Enter Issue Number";

            // if (!values.lotlist) errors.lotlist = "Enter Lot";
            // if (!values.location) errors.location = "Enter Location";

            // if (pickingReducer.IssueMTH.issueMaterialDs.length === 0)
            //   errors.createBy = "selected Item in List.";

            // pickingReducer.PickingItemHSelected.length > 0 &&
            //   pickingReducer.PickingItemHSelected.map((obj) => {
            //     if (obj.onhandWH < obj.pickQty)
            //       errors.createBy =
            //         "Onhand is not match PickQty in Line (" +
            //         obj.itemCode +
            //         ")";
            //   });

            return errors;
          }}
          enableReinitialize
          initialValues={
            issueMTReducer.issueMT ? issueMTReducer.issueMT : initialValues
          }
          onSubmit={async (values, { setSubmitting }) => {
            // console.log(values);
            // if (pickingReducer.IssueMTH.issueNumber !== "") {
            //   dispatch(
            //     opensnackbar({
            //       isOpen: true,
            //       message:
            //         "Can't create picking : " +
            //         pickingReducer.IssueMTH.issueNumber,
            //       types: "warning",
            //     })
            //   );
            //   return;
            // }
            // const _iisLog: IssueMaterialLog[] = [
            //   {
            //     id: 0,
            //     issueHid: 0,
            //     users: authreducer.account.iss,
            //     logDate: new Date().toLocaleDateString("sv"),
            //     status: "Draft",
            //     levels: 0,
            //     comment: "",
            //     action: "Create",
            //     clientName: "Web",
            //   },
            // ];
            const _data: IssueMTSearch = {
              id: issueMTReducer.issueMT.id,
              issueNumber: issueMTReducer.issueMT.issueNumber,
              location: issueMTReducer.issueMT.location,
              lotlist: issueMTReducer.issueMT.lotlist,
              pickingBy: "",
              pickingDate: null,
              printDate: null,
              issueBy: authreducer.account.iss,
              issueDate: null,
              createBy: authreducer.account.iss,
            };
            // console.log(_data);

            var resultaction = await dispatch(CreateIssueMTasync(_data));

            if (CreateIssueMTasync.fulfilled.match(resultaction)) {
              dispatch(
                opensnackbar({
                  isOpen: true,
                  message:
                    "Create Issue : " +
                    issueMTReducer.issueMT.issueNumber +
                    " Complete..",
                  types: "success",
                })
              );
            } else {
            }
          }}
        >
          {(props: any) => showfrom(props)}
        </Formik>
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
          <IssueMTListD handlegetdataDetail={handlegetdataDetail} />
        </Box>
      </Stack>

      {showDialogDetail()}
    </Box>
  );
};

export default IssueMT;
