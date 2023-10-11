import {
  Alert,
  Box,
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../store/store";
import {
  ClearReqIssueMTAPR,
  approvedRequestAPRasync,
  getRequestAPRListasync,
  issueMTAPRSelector,
} from "../../../store/slices/issueMTAPRSlice";
import { Field, Form, Formik, FormikProps } from "formik";
import { IssueMTByAPRSearch } from "../../../types/issueMTAPR.type";
import { TextField } from "formik-material-ui";
import CustomSelecte from "../../CustomSelecte";
import RequestList from "./RequestList";
import DetailList from "./DetailList";
import LogList from "./LogList";
import {
  ReqIssueMTResponse,
  ReqIssueMaterialLog,
} from "../../../types/issueMT.type";
import { authSelector } from "../../../store/slices/authSlice";

type Props = {};

const RequestMTApprove = (props: Props) => {
  const issueMTAPRReducer = useSelector(issueMTAPRSelector);
  const authReducer = useSelector(authSelector);
  const dispatch = useAppDispatch();

  const handlecleardata = () => {};

  const dataFetchedRef = React.useRef(false);
  React.useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;

    console.log("useeffect apr issue mt");

    loadMasterData();
    return () => {
      dispatch(ClearReqIssueMTAPR());
    };
  }, []);

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

  const [openDiarlog, setopenDiarlog] = React.useState(false);
  const [openResultDialog, setopenResultDialog] = useState(false);
  const [headerdetail, setheaderdetail] = React.useState("");

  const handlecloseDialog = () => {
    setopenDiarlog(false);
  };

  const handleopenDialog = (type: string) => {
    console.log(type);
    setheaderdetail(type);
    setopenDiarlog(true);
  };

  const showDialog = () => {
    return (
      <Dialog
        fullWidth
        maxWidth="xl"
        PaperProps={{ sx: { height: "70vh" } }}
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

  const loadMasterData = () => {
    getRequestList(initialValues);
  };

  const getRequestList = async (params: IssueMTByAPRSearch) => {
    await dispatch(getRequestAPRListasync(params));
  };

  const handleApproved = async (data: ReqIssueMTResponse[]) => {
    const resultaction = await dispatch(approvedRequestAPRasync(data));
    if (approvedRequestAPRasync.fulfilled.match(resultaction)) {
      loadMasterData();
    }

    setopenResultDialog(true);
  };

  const buttons = [
    <Button
      color="success"
      key="one"
      onClick={() => {
        const _data = issueMTAPRReducer.ItemSelectedList.map((obj) => {
          const _Loglist: ReqIssueMaterialLog[] = [
            {
              id: 0,
              reqHid: obj.id,
              users: authReducer.account.iss,
              logDate: new Date().toLocaleDateString("sv"),
              status: "Approved",
              levels: 0,
              comment: "",
              action: "Update",
              clientName: "Web",
            },
          ];

          let _aaa: ReqIssueMTResponse = {
            id: obj.id,
            reqNumber: obj.reqNumber,
            lot: obj.lot,
            requestBy: obj.requestBy,
            requestDate: obj.requestDate,
            reqDept: obj.reqDept,
            site: obj.site,
            requireDate: obj.requireDate,
            remark: obj.remark,
            createBy: obj.createBy,
            createDate: obj.createDate,
            updateBy: obj.updateBy,
            updateDate: obj.updateDate,
            status: obj.status,
            location: obj.location,
            reqIssueMaterialDs: obj.reqIssueMaterialDs,
            reqIssueMaterialLogs: _Loglist,
          };

          return _aaa;
        });
        handleApproved(_data);
      }}
    >
      Approved
    </Button>,
    <Button
      color="warning"
      key="three"
      onClick={() => {
        const _data = issueMTAPRReducer.ItemSelectedList.map((obj) => {
          const _Loglist: ReqIssueMaterialLog[] = [
            {
              id: 0,
              reqHid: obj.id,
              users: authReducer.account.iss,
              logDate: new Date().toLocaleDateString("sv"),
              status: "Request Discuss",
              levels: 0,
              comment: "",
              action: "Update",
              clientName: "Web",
            },
          ];

          let _aaa: ReqIssueMTResponse = {
            id: obj.id,
            reqNumber: obj.reqNumber,
            lot: obj.lot,
            requestBy: obj.requestBy,
            requestDate: obj.requestDate,
            reqDept: obj.reqDept,
            site: obj.site,
            requireDate: obj.requireDate,
            remark: obj.remark,
            createBy: obj.createBy,
            createDate: obj.createDate,
            updateBy: obj.updateBy,
            updateDate: obj.updateDate,
            status: obj.status,
            location: obj.location,
            reqIssueMaterialDs: obj.reqIssueMaterialDs,
            reqIssueMaterialLogs: _Loglist,
          };

          return _aaa;
        });
        handleApproved(_data);
      }}
    >
      Request For Discuss
    </Button>,
    <Button
      key="two"
      onClick={() => {
        const _data = issueMTAPRReducer.ItemSelectedList.map((obj) => {
          const _Loglist: ReqIssueMaterialLog[] = [
            {
              id: 0,
              reqHid: obj.id,
              users: authReducer.account.iss,
              logDate: new Date().toLocaleDateString("sv"),
              status: "Reject",
              levels: 0,
              comment: "",
              action: "Update",
              clientName: "Web",
            },
          ];

          let _aaa: ReqIssueMTResponse = {
            id: obj.id,
            reqNumber: obj.reqNumber,
            lot: obj.lot,
            requestBy: obj.requestBy,
            requestDate: obj.requestDate,
            reqDept: obj.reqDept,
            site: obj.site,
            requireDate: obj.requireDate,
            remark: obj.remark,
            createBy: obj.createBy,
            createDate: obj.createDate,
            updateBy: obj.updateBy,
            updateDate: obj.updateDate,
            status: obj.status,
            location: obj.location,
            reqIssueMaterialDs: obj.reqIssueMaterialDs,
            reqIssueMaterialLogs: _Loglist,
          };

          return _aaa;
        });
        handleApproved(_data);
      }}
    >
      Reject
    </Button>,
  ];

  const showresultlist = () => {
    return (
      <Box sx={{ height: "100%", width: "100%" }}>
        <Grid spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
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
                disabled={issueMTAPRReducer.isFetching}
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
              {issueMTAPRReducer.responselist.map((value, index) => (
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
          <Form>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              <Grid item xs={12} sm={12} md={12}>
                <Typography variant="h5" sx={{ textAlign: "center" }}>
                  Approve Request Issue Material
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
                  id="requestBy"
                  name="requestBy"
                  type="text"
                  label="Request By"
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
          {/* {showDialog()}
              {showDialogDetail()} */}
        </Box>
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
          <ButtonGroup
            color="secondary"
            aria-label="medium secondary button group"
            sx={{ padding: "1rem" }}
          >
            {buttons}
          </ButtonGroup>

          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
            sx={{ marginLeft: 2 }}
          >
            {issueMTAPRReducer.isFetching && (
              <Grid item xs={12} sm={12} md={12}>
                {""}
                <Alert sx={{ margin: 1 }} variant="outlined" severity="warning">
                  Locading...
                </Alert>
              </Grid>
            )}
            {issueMTAPRReducer.isError && (
              <Grid item xs={12} sm={12} md={12}>
                {" "}
                <Alert sx={{ margin: 1 }} variant="outlined" severity="warning">
                  {issueMTAPRReducer.message}
                </Alert>
              </Grid>
            )}
            <Grid item xs={12} sm={12} md={12}>
              {openResultDialog && showresultlist()}
            </Grid>
          </Grid>

          <RequestList handleopenDialog={handleopenDialog} />
        </Box>
      </>
    );
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
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

export default RequestMTApprove;
