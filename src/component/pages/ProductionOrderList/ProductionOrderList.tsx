import {
  Alert,
  Box,
  Button,
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
import {
  AddProductionOrderRequest,
  ClearProductionOrder,
  ClearselectedPD,
  FindPDSync,
  SearchPD,
  productionOrderSelector,
} from "../../../store/slices/productionOrderSlice";
import { useAppDispatch } from "../../../store/store";
import { useSelector } from "react-redux";
import { TextField } from "formik-material-ui";
import PDList from "./PDList";
import PDdetail from "./PDdetail";
import { useLocation, useNavigate } from "react-router-dom";

type ProductionOrderListProps = {
  //
  genmcscreen?: boolean;
};

const ProductionOrderList: React.FC<any> = (
  props: ProductionOrderListProps
) => {
  const dataFetchedRef = React.useRef(false);
  const { state } = useLocation();

  const productionOrderReducer = useSelector(productionOrderSelector);

  const [openDialog, setopenDialog] = React.useState<boolean>(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;

    if (state) {
      if (state.type === "genMC") {
        // console.log("LOAD");
        handlegetdata(state.datarequest);
      }
    }

    return () => {
      if (!state) {
        dispatch(ClearProductionOrder());
      }
    };
  }, []);

  const handlegetdata = async (value: AllocateLotRequest) => {
    dispatch(AddProductionOrderRequest(value));
    //  console.log(value);

    var resultaction = await dispatch(FindPDSync(value));

    if (FindPDSync.fulfilled.match(resultaction)) {
    }
  };

  const handlecleardata = () => {
    dispatch(ClearProductionOrder());

    if (state) {
      if (state.type === "genMC") {
        navigate("/generateMC", { state: { types: "showPD" } });
      }
    }

    // console.log("close");
  };

  const handlecloseDialog = async () => {
    await dispatch(ClearselectedPD());
    setopenDialog(false);
  };

  const handleOpenDialog = async () => {
    setopenDialog(true);
  };

  const showDialog = () => {
    return (
      <Dialog
        fullWidth
        maxWidth="xl"
        PaperProps={{ sx: { height: "70vh" } }}
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
          {/* <MainCardList mclisthead={mclisthead} /> */}
          <PDdetail />
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
                  Production Order List
                </Typography>
              </Grid>
              <Grid item xs={4} sm={3} md={3}>
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
                    disabled={productionOrderReducer.isFetching}
                    variant="contained"
                    color="success"
                    type="submit"
                    sx={{ marginRight: 1 }}
                  >
                    Get Data
                  </Button>
                </Stack>
              </Grid>

              {productionOrderReducer.isFetching && (
                <Grid item xs={4} sm={12} md={12}>
                  <Alert sx={{ margin: 1 }} variant="outlined" severity="info">
                    {productionOrderReducer.message}
                  </Alert>
                </Grid>
              )}

              {productionOrderReducer.isError && (
                <Grid item xs={4} sm={12} md={12}>
                  <Alert
                    sx={{ margin: 1 }}
                    variant="outlined"
                    severity="warning"
                  >
                    {productionOrderReducer.message}
                  </Alert>
                </Grid>
              )}
            </Grid>
          </Form>

          {showDialog()}
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
            width: "150vh",
            justifyContent: "start",
          }}
        >
          <Formik
            validate={(values: AllocateLotRequest) => {
              let errors: any = {};
              if (
                !values.soNumber &&
                !values.buy &&
                !values.purOrder &&
                !values.lot
              ) {
                if (!values.soNumber) errors.soNumber = "Enter Sale Order";
                if (!values.lot) errors.buy = "Enter Lot";
                if (!values.purOrder) errors.purOrder = "Enter PU Order";
              }

              // if (values.stock < 10) errors.stock = "Min stock is not lower than 10";
              // if (values.price < 100) errors.price = "Min price is not lower than 100";
              return errors;
            }}
            enableReinitialize
            initialValues={productionOrderReducer.productionOrderrequest}
            onSubmit={async (values, { setSubmitting }) => {
              handlegetdata(values);

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
            width: "160vh",
          }}
        >
          <PDList handleOpenDialog={handleOpenDialog} />
        </Box>
      </Stack>
    </Box>
  );
};

export default ProductionOrderList;
