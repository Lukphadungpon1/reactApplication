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
  Stack,
  Typography,
} from "@mui/material";
import { Field, Form, Formik, FormikProps } from "formik";
import * as React from "react";
import { AllocateLotRequest } from "../../../types/allocatelot.type";
import { TextField } from "formik-material-ui";
import { useSelector } from "react-redux";
import {
  ClearallocateLot,
  GetLotAsyncGenMC,
  allocateLotSelector,
} from "../../../store/slices/allocateLotSlice";
import { useAppDispatch } from "../../../store/store";
import LotListGenMC from "./LotListGenMC";
import {
  CVPdToSAP,
  CancelPdToSAP,
  CleanGenMCPDResultList,
  ClearGenerateMCPD,
  ClearMClist,
  DelMCSync,
  DelPDSync,
  DelReleasedPDSync,
  GenMCSync,
  GenPDSync,
  ReleasedPDSync,
  ReleasedPdToSAP,
  generateMCandPDSelector,
} from "../../../store/slices/generateMCandPDSlice";
import { opensnackbar } from "../../../store/slices/snackbarSlice";
import MainCardList from "../MainCardList/MainCardList";
import {
  GenPDMCResponselist,
  mclisthead,
} from "../../../types/generateMCPD.type";
import { useLocation } from "react-router-dom";
import { red } from "@mui/material/colors";
type GenerateMCProps = {
  //
};

const GenerateMC: React.FC<any> = () => {
  const dataFetchedRef = React.useRef(false);
  const allocatelotReducer = useSelector(allocateLotSelector);
  const generateMCandPDReducer = useSelector(generateMCandPDSelector);

  const dispatch = useAppDispatch();
  const { state } = useLocation();

  const mclistdef: mclisthead = {
    lot: "",
    style: "",
    total: 0,
  };

  const [openDialog, setopenDialog] = React.useState<boolean>(false);
  const [openDialogMC, setopenDialogMC] = React.useState<boolean>(false);
  const [openDialogResponPD, setopenDialogResponPD] =
    React.useState<boolean>(false);
  const [responValue, setresponValue] =
    React.useState<GenPDMCResponselist | null>(null);

  const [mclisthead, setmclisthead] = React.useState<mclisthead>(mclistdef);

  React.useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;

    if (state) {
      if (state.types === "showPD") {
        getLotList(allocatelotReducer.allocateLotLisrequest);
        dispatch(ClearGenerateMCPD());
      }
    }

    return () => {
      dispatch(ClearallocateLot());
      dispatch(ClearGenerateMCPD());
    };
  }, []);

  const handlecleardata = () => {
    dispatch(ClearallocateLot());
  };

  const initialValues: AllocateLotRequest = {
    soNumber: "",
    buy: "",
    purOrder: "",
    lot: "",
  };

  const getLotList = async (values: AllocateLotRequest) => {
    const resultaction = await dispatch(GetLotAsyncGenMC(values));
  };

  const handlegenerateMC = async (value: string) => {
    //console.log(value);

    if (generateMCandPDReducer.allocateLotLisrequest.length === 0) {
      dispatch(
        opensnackbar({
          isOpen: true,
          message: "Please select Lot in List...",
          types: "info",
        })
      );
    } else {
      setopenDialog(true);

      var resultgen;
      var param = generateMCandPDReducer.allocateLotLisrequest;
      if (value === "ADD") {
        resultgen = await dispatch(GenMCSync(param));

        if (GenMCSync.fulfilled.match(resultgen)) {
          getLotList(allocatelotReducer.allocateLotLisrequest);
        }
      } else {
        resultgen = await dispatch(DelMCSync(param));

        if (DelMCSync.fulfilled.match(resultgen)) {
          getLotList(allocatelotReducer.allocateLotLisrequest);
        }
      }
    }
  };

  const handlegeneratePD = async (value: string) => {
    if (generateMCandPDReducer.allocateLotLisrequest.length === 0) {
      dispatch(
        opensnackbar({
          isOpen: true,
          message: "Please select Lot in List...",
          types: "info",
        })
      );
    } else {
      setopenDialog(true);

      var resultgen;
      var param = generateMCandPDReducer.allocateLotLisrequest;
      if (value === "ADD") {
        resultgen = await dispatch(GenPDSync(param));
        if (GenPDSync.fulfilled.match(resultgen)) {
          getLotList(allocatelotReducer.allocateLotLisrequest);
        }
      } else {
        resultgen = await dispatch(DelPDSync(param));
        if (DelPDSync.fulfilled.match(resultgen)) {
          getLotList(allocatelotReducer.allocateLotLisrequest);
        }
      }
    }
  };

  const handlereleasedPDWEB = async (value: string) => {
    if (generateMCandPDReducer.allocateLotLisrequest.length === 0) {
      dispatch(
        opensnackbar({
          isOpen: true,
          message: "Please select Lot in List...",
          types: "info",
        })
      );
    } else {
      setopenDialog(true);

      var resultgen;
      var param = generateMCandPDReducer.allocateLotLisrequest;
      
      if (value === "ADD") {
        resultgen = await dispatch(ReleasedPDSync(param));
        if (GenPDSync.fulfilled.match(resultgen)) {
          getLotList(allocatelotReducer.allocateLotLisrequest);
        }
      } else {
        resultgen = await dispatch(DelReleasedPDSync(param));
        if (DelPDSync.fulfilled.match(resultgen)) {
          getLotList(allocatelotReducer.allocateLotLisrequest);
        }
      }
    }
  };

  const handlemclisthead = (value: mclisthead) => {
    setmclisthead(value);
  };

  const handlecloseDialog = async () => {
    await dispatch(ClearMClist());
    setopenDialogMC(false);
  };

  const handleopenDialog = () => {
    setopenDialogMC(true);
  };

  const handlecvPDtoSAP = async () => {
    if (generateMCandPDReducer.allocateLotLisrequest.length === 0) {
      dispatch(
        opensnackbar({
          isOpen: true,
          message: "Please select Lot in List...",
          types: "info",
        })
      );
    } else {
      setopenDialog(true);

      var param = generateMCandPDReducer.allocateLotLisrequest;

      var resultgen = await dispatch(CVPdToSAP(param));

      if (CVPdToSAP.fulfilled.match(resultgen)) {
        getLotList(allocatelotReducer.allocateLotLisrequest);
      }
    }
  };

  const handleReleasedPD = async () => {
    if (generateMCandPDReducer.allocateLotLisrequest.length === 0) {
      dispatch(
        opensnackbar({
          isOpen: true,
          message: "Please select Lot in List...",
          types: "info",
        })
      );
    } else {
      setopenDialog(true);

      var param = generateMCandPDReducer.allocateLotLisrequest;

      var resultgen = await dispatch(ReleasedPdToSAP(param));

      if (ReleasedPdToSAP.fulfilled.match(resultgen)) {
        getLotList(allocatelotReducer.allocateLotLisrequest);
      }
    }
  };

  const handleCancelPD = async () => {
    if (generateMCandPDReducer.allocateLotLisrequest.length === 0) {
      dispatch(
        opensnackbar({
          isOpen: true,
          message: "Please select Lot in List...",
          types: "info",
        })
      );
    } else {
      setopenDialog(true);

      var param = generateMCandPDReducer.allocateLotLisrequest;

      var resultgen = await dispatch(CancelPdToSAP(param));

      if (CancelPdToSAP.fulfilled.match(resultgen)) {
        getLotList(allocatelotReducer.allocateLotLisrequest);
      }
    }
  };

  const showDialog = () => {
    return (
      <Dialog
        fullWidth
        maxWidth="xl"
        PaperProps={{ sx: { height: "70vh" } }}
        open={openDialogMC}
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
          <MainCardList mclisthead={mclisthead} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handlecloseDialog()} color="info">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  const showDialogPDResult = () => {
    return (
      <Dialog
        fullWidth
        maxWidth="sm"
        PaperProps={{ sx: { height: "70vh" } }}
        open={openDialogResponPD}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          <Typography sx={{ textAlign: "left" }}>
            {responValue &&
              responValue.referenceNumber + " : " + responValue.errorMessage}
          </Typography>
        </DialogTitle>
        <DialogContent>
          {/* <Typography>{JSON.stringify(props.values)}</Typography> */}

          {responValue &&
            responValue.generatePD &&
            responValue.generatePD.length > 0 &&
            responValue.generatePD.map((value, index) => (
              <Grid item xs={12} sm={12} md={12} key={index}>
                <Typography
                  sx={{ textAlign: "left" }}
                  color={value.errorMessage !== "Complete" ? "red" : "green"}
                >
                  {value.id + "|" + value.itemCode + " : " + value.errorMessage}
                  .
                </Typography>
              </Grid>
            ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setopenDialogResponPD(false)} color="info">
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
                disabled={generateMCandPDReducer.isFetching}
                type="button"
                onClick={() => {
                  setopenDialog(false);
                  dispatch(CleanGenMCPDResultList());
                }}
              >
                Close
              </Button>
            </Stack>
          </Grid>

          {generateMCandPDReducer.isFetching && (
            <Grid item xs={4} sm={12} md={12}>
              <Alert sx={{ margin: 1 }} variant="outlined" severity="info">
                {generateMCandPDReducer.message}
              </Alert>
            </Grid>
          )}
          {generateMCandPDReducer.isError &&
            generateMCandPDReducer.responselist.length == 0 && (
              <Grid item xs={4} sm={12} md={12}>
                <Alert sx={{ margin: 1 }} variant="outlined" severity="error">
                  {generateMCandPDReducer.message}
                </Alert>
              </Grid>
            )}

          <Grid spacing={0} item xs={12} sm={12} md={12}>
            <Box sx={{ width: "100%", maxWidth: 500 }}>
              {generateMCandPDReducer.responselist.map((value, index) => (
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

                  <Button
                    key={index}
                    disabled={
                      value.generatePD
                        ? value.generatePD.length > 0
                          ? false
                          : true
                        : true
                    }
                    type="button"
                    onClick={() => {
                      setresponValue(value);
                      setopenDialogResponPD(true);
                    }}
                  >
                    Detail PD
                  </Button>
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
                  Generate [ Main Card & Production Order ]
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
              <Grid item xs={4} sm={6} md={4}>
                <ButtonGroup size="small" aria-label="small button group">
                  <Button
                    disabled={generateMCandPDReducer.isFetching}
                    variant="contained"
                    type="button"
                    onClick={() => handlegenerateMC("ADD")}
                  >
                    Generate MC
                  </Button>
                  <Button
                    disabled={generateMCandPDReducer.isFetching}
                    variant="contained"
                    color="secondary"
                    type="button"
                    sx={{ marginRight: 1 }}
                    onClick={() => handlegenerateMC("DEL")}
                  >
                    Delete MC
                  </Button>
                </ButtonGroup>
              </Grid>

              <Grid item xs={4} sm={6} md={4}>
                <ButtonGroup size="small" aria-label="small button group">
                  <Button
                    disabled={generateMCandPDReducer.isFetching}
                    variant="contained"
                    type="button"
                    onClick={() => handlegeneratePD("ADD")}
                  >
                    Generate PD
                  </Button>
                  <Button
                    disabled={generateMCandPDReducer.isFetching}
                    variant="contained"
                    color="secondary"
                    type="button"
                    sx={{ marginRight: 1 }}
                    onClick={() => handlegeneratePD("DEL")}
                  >
                    Delete PD
                  </Button>
                </ButtonGroup>
              </Grid>

              <Grid item xs={4} sm={6} md={4}>
                <ButtonGroup size="small" aria-label="small button group">
                  <Button
                    disabled={generateMCandPDReducer.isFetching}
                    variant="contained"
                    type="button"
                    onClick={() => handlereleasedPDWEB("ADD")}
                  >
                    Released PD
                  </Button>
                  <Button
                    disabled={generateMCandPDReducer.isFetching}
                    variant="contained"
                    color="secondary"
                    type="button"
                    sx={{ marginRight: 1 }}
                    onClick={() => handlereleasedPDWEB("DEL")}
                  >
                    CN Released PD
                  </Button>
                </ButtonGroup>
              </Grid>

              <Grid item xs={4} sm={6} md={4}>
                <ButtonGroup size="small" aria-label="small button group">
                  <Button
                    disabled={generateMCandPDReducer.isFetching}
                    variant="contained"
                    type="button"
                    onClick={() => handlecvPDtoSAP()}
                  >
                    CV TO SAP
                  </Button>
                  <Button
                    disabled={generateMCandPDReducer.isFetching}
                    variant="contained"
                    color="secondary"
                    type="button"
                    sx={{ marginRight: 1 }}
                    onClick={() => handleReleasedPD()}
                  >
                    Released To SAP
                  </Button>
                </ButtonGroup>
              </Grid>

              <Grid item xs={4} sm={6} md={4}>
                <ButtonGroup size="small" aria-label="small button group">
                  <Button
                    disabled={generateMCandPDReducer.isFetching}
                    variant="contained"
                    color="warning"
                    type="button"
                    sx={{ marginRight: 1 }}
                    onClick={() => handleCancelPD()}
                  >
                    Cancel to SAP
                  </Button>
                </ButtonGroup>
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

          {openDialog && showresultlist()}

          {showDialog()}
          {showDialogPDResult()}
        </Box>
      </>
    );
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
            width: "170vh",
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
            initialValues={allocatelotReducer.allocateLotLisrequest}
            onSubmit={async (values, { setSubmitting }) => {
              const resultaction = await dispatch(GetLotAsyncGenMC(values));

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
            width: "170vh",
          }}
        >
          <LotListGenMC
            getLotList={getLotList}
            handleopenDialog={handleopenDialog}
            handlemclisthead={handlemclisthead}
          />
        </Box>
      </Stack>
    </Box>
  );
};

export default GenerateMC;
