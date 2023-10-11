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
import * as React from "react";
import {
  AddLogIssue,
  AddLotLisrequestSelected,
  CleanpickingState,
  CreatePickingasync,
  GetItemForLotPickingasync,
  GetLocationPickasync,
  GetLotForPickingasync,
  pickingSelector,
} from "../../../store/slices/pickingSlice";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../store/store";
import {
  IssueMaterialHResponse,
  IssueMaterialLog,
  IssueMaterialManual,
  PickingItemD,
  PickingItemH,
} from "../../../types/picking.type.tx";
import CustomSelecte from "../../CustomSelecte";
import { AllocateLotRequest } from "../../../types/allocatelot.type";
import LotListPicking from "./LotListPicking";
import SearchIcon from "@mui/icons-material/Search";
import PickingMTItemList from "../PickingMTItemList/PickingMTItemList";
import PickingItemDList from "../PickingMTItemList/PickingItemDList";
import { TextField } from "formik-material-ui";
import { AddExternalLink, authSelector } from "../../../store/slices/authSlice";
import { Link } from "react-router-dom";
import { opensnackbar } from "../../../store/slices/snackbarSlice";

type PickingMTProps = {
  //
};

const PickingMT: React.FC<any> = () => {
  const pickingReducer = useSelector(pickingSelector);
  const authreducer = useSelector(authSelector);
  const dispatch = useAppDispatch();

  const dataFetchedRef = React.useRef(false);
  React.useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;

    loadMasterData();
    return () => {
      console.log("call back picking");
      dispatch(CleanpickingState());
    };
  }, []);

  const loadMasterData = async () => {
    await dispatch(GetLocationPickasync());

    await dispatch(
      GetLotForPickingasync({
        soNumber: "",
        buy: "",
        purOrder: "",
        lot: "",
      })
    );
  };

  const [openDialogLot, setopenDialogLot] = React.useState(false);
  const handlecloseDialogLot = () => {
    setopenDialogLot(false);
  };

  const [openDialogDetail, setopenDialogDetail] = React.useState(false);

  const [ItemHDetail, setItemHDetail] = React.useState<PickingItemD[]>([]);

  const handleselectLot = (value: AllocateLotRequest[]) => {
    value.length > 0 && dispatch(AddLotLisrequestSelected(value));
  };

  const handlegetItemForpick = async () => {
    // console.log(pickingReducer.LotLisrequestSelected);

    await dispatch(
      GetItemForLotPickingasync(pickingReducer.LotLisrequestSelected)
    );
    handlecloseDialogLot();
  };

  const showDialogLot = () => {
    return (
      <Dialog
        fullWidth
        maxWidth="xl"
        PaperProps={{ sx: { height: "100vh" } }}
        open={openDialogLot}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          <Typography>
            Lot List {pickingReducer.isFetching && "( Loading...)"}
          </Typography>
        </DialogTitle>
        <DialogContent>
          {/* <Typography>{JSON.stringify(props.values)}</Typography> */}
          <LotListPicking handleselectLot={handleselectLot} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handlecloseDialogLot()} color="info">
            Cancel
          </Button>
          <Button
            disabled={pickingReducer.isFetching}
            onClick={() => handlegetItemForpick()}
            color="success"
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  const handlecleardata = () => {
    dispatch(CleanpickingState());
  };

  const handlegetdataDetail = (value: PickingItemH) => {
    console.log(value);

    setItemHDetail(value.pickingItemD);

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
          <Typography>Item Detail</Typography>
        </DialogTitle>
        <DialogContent>
          {/* <Typography>{JSON.stringify(props.values)}</Typography> */}
          <PickingItemDList itemD={ItemHDetail} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setopenDialogDetail(false)} color="info">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  const handleprintpicking = async () => {
    console.log("print issue nember");

    window.open("www.google.co.th", "_blank");
  };

  const Home = () => {
    return (
      <div>
        <p>
          <Link to="/external-link" target="_blank" rel="noreferrer">
            Print Picking List
          </Link>
        </p>
      </div>
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
                  Picking
                </Typography>
              </Grid>

              <Grid item xs={6} sm={9} md={9}>
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{ justifyContent: "center" }}
                >
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

                  <IconButton
                    type="button"
                    aria-label="search"
                    onClick={(e: React.ChangeEvent<any>) => {
                      e.preventDefault();

                      const params: AllocateLotRequest = {
                        buy: "",
                        lot: "",
                        purOrder: "",
                        soNumber: "",
                      };

                      dispatch(GetLotForPickingasync(params));
                      setopenDialogLot(true);
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
              {/* <Grid item xs={6} sm={3} md={3}>
                <Field
                  style={{ marginTop: 5 }}
                  variant="standard"
                  fullWidth
                  component={TextField}
                  disabled
                  id="issueBy"
                  name="issueBy"
                  type="text"
                  label="IssueBy"
                />

              
              </Grid>

              <Grid item xs={6} sm={3} md={3}>
                <Field
                  style={{ marginTop: 5 }}
                  variant="standard"
                  fullWidth
                  component={TextField}
                  disabled
                  id="issueDate"
                  name="issueDate"
                  type="text"
                  label="IssueDate"
                />
              </Grid>

              <Grid item xs={6} sm={3} md={3}>
                <Field
                  style={{ marginTop: 5 }}
                  variant="standard"
                  fullWidth
                  component={TextField}
                  disabled
                  id="docEntry"
                  name="docEntry"
                  label="DocEntry"
                ></Field>
              </Grid>
              <Grid item xs={6} sm={3} md={3}>
                <Field
                  style={{ marginTop: 5 }}
                  variant="standard"
                  fullWidth
                  component={TextField}
                  disabled
                  id="docNum"
                  name="docNum"
                  label="DocNum"
                ></Field>
              </Grid> */}
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
                  component={TextField}
                  id="Remark"
                  name="Remark"
                  type="text"
                  label="Remark"
                />
              </Grid>

              {pickingReducer.isError && (
                <Grid item xs={12} sm={12} md={12}>
                  {" "}
                  <Alert
                    sx={{ margin: 1 }}
                    variant="outlined"
                    severity="warning"
                  >
                    {pickingReducer.message}
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

              {pickingReducer.isFetching && (
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

              <Grid item xs={12} sm={12} md={12}>
                <Stack
                  direction="row"
                  spacing={4}
                  sx={{ margin: 2, justifyContent: "center" }}
                >
                  <Button
                    variant="outlined"
                    type="reset"
                    onClick={handlecleardata}
                  >
                    Clear
                  </Button>

                  <Button
                    disabled={pickingReducer.isFetching}
                    variant="contained"
                    color="success"
                    type="submit"
                    sx={{ marginRight: 1 }}
                  >
                    Save
                  </Button>
                  {/* <Link to="/external-link" target="_blank" rel="noreferrer">
                    <Button
                      disabled={pickingReducer.isFetching}
                      variant="contained"
                      color="info"
                      type="button"
                      sx={{ marginRight: 1 }}
                    >
                      Print Picking List
                    </Button>
                  </Link> */}
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
    pickingDate: new Date().toLocaleDateString("sv"),
    printDate: new Date().toLocaleDateString("sv"),
    issueBy: "",
    issueDate: new Date().toLocaleDateString("sv"),
    createBy: "",
    createDate: new Date().toLocaleDateString("sv"),
    updateBy: "",
    updateDate: new Date().toLocaleDateString("sv"),
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
            if (!values.lotlist) errors.lotlist = "Enter Lot";
            if (!values.location) errors.location = "Enter Location";

            if (pickingReducer.IssueMTH.issueMaterialDs.length === 0)
              errors.createBy = "selected Item in List.";

            pickingReducer.PickingItemHSelected.length > 0 &&
              pickingReducer.PickingItemHSelected.map((obj) => {
                if (obj.onhandWH < obj.pickQty)
                  errors.createBy =
                    "Onhand is not match PickQty in Line (" +
                    obj.itemCode +
                    ")";
              });

            return errors;
          }}
          enableReinitialize
          initialValues={
            pickingReducer.IssueMTH ? pickingReducer.IssueMTH : initialValues
          }
          onSubmit={async (values, { setSubmitting }) => {
            // console.log(values);

            if (pickingReducer.IssueMTH.issueNumber !== "") {
              dispatch(
                opensnackbar({
                  isOpen: true,
                  message:
                    "Can't create picking : " +
                    pickingReducer.IssueMTH.issueNumber,
                  types: "warning",
                })
              );
              return;
            }

            const _iisLog: IssueMaterialLog[] = [
              {
                id: 0,
                issueHid: 0,
                users: authreducer.account.iss,
                logDate: new Date().toLocaleDateString("sv"),
                status: "Draft",
                levels: 0,
                comment: "",
                action: "Create",
                clientName: "Web",
              },
            ];

            const _data: IssueMaterialHResponse = {
              id: pickingReducer.IssueMTH.id,
              issueNumber: pickingReducer.IssueMTH.issueNumber,
              location: pickingReducer.IssueMTH.location,
              lotlist: pickingReducer.IssueMTH.lotlist,
              pickingBy: authreducer.account.iss,
              pickingDate: new Date().toLocaleDateString("sv"),
              printDate: pickingReducer.IssueMTH.printDate,
              issueBy: pickingReducer.IssueMTH.issueBy,
              issueDate: pickingReducer.IssueMTH.issueDate,
              createBy: authreducer.account.iss,
              createDate: new Date().toLocaleDateString("sv"),
              updateBy: pickingReducer.IssueMTH.updateBy,
              updateDate: pickingReducer.IssueMTH.updateDate,
              status: pickingReducer.IssueMTH.status,
              uploadFile: pickingReducer.IssueMTH.uploadFile,
              convertSap: pickingReducer.IssueMTH.convertSap,
              docEntry: pickingReducer.IssueMTH.docEntry,
              docNum: pickingReducer.IssueMTH.docNum,
              remark: values.remark,
              issueMaterialDs: pickingReducer.IssueMTH.issueMaterialDs,
              issueMaterialManuals:
                pickingReducer.IssueMTH.issueMaterialManuals,
              issueMaterialLogs: _iisLog,
            };

            console.log(_data);

            var resultaction = await dispatch(CreatePickingasync(_data));

            if (CreatePickingasync.fulfilled.match(resultaction)) {
              dispatch(AddExternalLink("http://kth-server-02/intranet/"));
              dispatch(
                opensnackbar({
                  isOpen: true,
                  message:
                    "Create picking : " +
                    pickingReducer.IssueMTH.issueNumber +
                    " Complete..",
                  types: "success",
                })
              );
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
          <PickingMTItemList handlegetdataDetail={handlegetdataDetail} />
        </Box>
      </Stack>

      {showDialogLot()}
      {showDialogDetail()}
    </Box>
  );
};

export default PickingMT;
