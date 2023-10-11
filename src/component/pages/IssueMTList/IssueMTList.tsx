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
import { IssueMTSearch } from "../../../types/issueMT.type";
import {
  CleanissueMTListState,
  getissueMTListasync,
  issueMTListSelector,
} from "../../../store/slices/issueMTListSlice";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../store/store";
import { authSelector } from "../../../store/slices/authSlice";
import { TextField } from "formik-material-ui";
import ManualList from "./ManualList";
import LogList from "./LogList";
import DetailList from "./DetailList";
import IssueMTDetail from "./IssueMTDetail";

type IssueMTListProps = {
  //
};

const showfrom = () => {};

const IssueMTList: React.FC<any> = () => {
  const issueMTListReducer = useSelector(issueMTListSelector);
  const authReducer = useSelector(authSelector);
  const dispatch = useAppDispatch();

  const [openDialog, setopenDialog] = React.useState(false);
  const [headerdetail, setheaderdetail] = React.useState("");

  const initialValues: IssueMTSearch = {
    id: 0,
    issueNumber: "",
    location: "",
    lotlist: "",
    pickingBy: "",
    pickingDate: null,
    printDate: null,
    issueBy: "",
    issueDate: null,
  };

  const handlecleardata = () => {};

  const handleopenDialog = (type: string) => {
    console.log(type);
    setheaderdetail(type);
    setopenDialog(true);
  };

  const handlecloseDialog = () => {
    setopenDialog(false);
  };

  const showDialog = () => {
    return (
      <Dialog
        fullWidth
        maxWidth="xl"
        PaperProps={{ sx: { height: "100vh" } }}
        open={openDialog}
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
          {headerdetail === "Manual" && <ManualList />}
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
  }: FormikProps<IssueMTSearch>) => {
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
            <Grid xs={12}>
              <Form>
                <Grid
                  container
                  spacing={{ xs: 2, md: 3 }}
                  columns={{ xs: 4, sm: 8, md: 12 }}
                  sx={{ padding: 2 }}
                >
                  <Grid item xs={12} sm={12} md={12}>
                    <Typography variant="h5" sx={{ textAlign: "center" }}>
                      Issue MT List
                    </Typography>
                  </Grid>

                  <Grid item xs={6} sm={3} md={3}>
                    <Field
                      style={{ marginTop: 5 }}
                      variant="standard"
                      fullWidth
                      component={TextField}
                      id="issueNumber"
                      name="issueNumber"
                      type="text"
                      label="Issue Number"
                    />
                  </Grid>
                  <Grid item xs={6} sm={3} md={3}>
                    <Field
                      style={{ marginTop: 5 }}
                      variant="standard"
                      fullWidth
                      component={TextField}
                      id="location"
                      name="location"
                      type="text"
                      label="Location"
                    />
                  </Grid>
                  <Grid item xs={6} sm={3} md={3}>
                    <Field
                      style={{ marginTop: 5 }}
                      variant="standard"
                      fullWidth
                      component={TextField}
                      id="lotlist"
                      name="lotlist"
                      type="text"
                      label="Lot"
                    />
                  </Grid>
                  <Grid item xs={6} sm={3} md={3}>
                    <Field
                      style={{ marginTop: 5 }}
                      variant="standard"
                      fullWidth
                      component={TextField}
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
                      id="pickingDate"
                      name="pickingDate"
                      type="date"
                      label="Picking Date"
                    />
                  </Grid>
                  <Grid item xs={6} sm={3} md={3}>
                    <Field
                      style={{ marginTop: 5 }}
                      variant="standard"
                      fullWidth
                      component={TextField}
                      id="printDate"
                      name="printDate"
                      type="date"
                      label="Print Date"
                    />
                  </Grid>
                  <Grid item xs={6} sm={3} md={3}>
                    <Field
                      style={{ marginTop: 5 }}
                      variant="standard"
                      fullWidth
                      component={TextField}
                      id="issueBy"
                      name="issueBy"
                      type="text"
                      label="Issue By"
                    />
                  </Grid>
                  <Grid item xs={6} sm={3} md={3}>
                    <Field
                      style={{ marginTop: 5 }}
                      variant="standard"
                      fullWidth
                      component={TextField}
                      id="issueDate"
                      name="issueDate"
                      type="date"
                      label="Issue Date"
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
                        disabled={issueMTListReducer.isFetching}
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
                  {issueMTListReducer.isFetching && (
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
                  {issueMTListReducer.isError && (
                    <Grid item xs={12} sm={12} md={12}>
                      {" "}
                      <Alert
                        sx={{ margin: 1 }}
                        variant="outlined"
                        severity="warning"
                      >
                        {issueMTListReducer.message}
                      </Alert>
                    </Grid>
                  )}
                </Grid>
              </Box>
            </Grid>
          </Grid>

          {/* {showDialog()}
              {showDialogDetail()} */}
        </Box>
      </>
    );
  };

  const dataFetchedRef = React.useRef(false);
  React.useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;

    return () => {
      console.log("call back issuelist");
      dispatch(CleanissueMTListState());
    };
  }, []);

  return (
    <Box sx={{ display: "flex", height: "auto" }}>
      <Stack
        direction="column"
        spacing={2}
        sx={{ justifyContent: "center", width: "170vh" }}
      >
        <Formik
          validate={(values: IssueMTSearch) => {
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
            issueMTListReducer.issueMTListRequest
              ? issueMTListReducer.issueMTListRequest
              : initialValues
          }
          onSubmit={async (values, { setSubmitting }) => {
            console.log(values);

            dispatch(getissueMTListasync(values));
            // console.log(values.FormFiles.name);
            // console.log(excelData.length);
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
          <IssueMTDetail handleopenDialog={handleopenDialog} />
        </Box>
      </Stack>

      {showDialog()}
    </Box>
  );
};

export default IssueMTList;
