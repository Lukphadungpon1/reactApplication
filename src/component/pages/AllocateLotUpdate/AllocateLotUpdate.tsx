import * as React from "react";
import { useSelector } from "react-redux";
import {
  AllocateLotEditUpdatedb,
  ClearallocateLotEdit,
  UpdateQty,
  allocateLotEditSelector,
} from "../../../store/slices/allocateLotEditSlice";
import { useAppDispatch } from "../../../store/store";
import {
  Alert,
  Box,
  Button,
  Grid,
  Stack,
  Typography,
  TextField as TextFieldmui,
} from "@mui/material";
import { Field, Form, Formik, FormikProps } from "formik";
import {
  AllocateLotResponse,
  AllocateLotSize,
} from "../../../types/allocatelot.type";
import { TextField } from "formik-material-ui";
import { useNavigate } from "react-router-dom";
import { current } from "@reduxjs/toolkit";
import { opensnackbar } from "../../../store/slices/snackbarSlice";

type AllocateLotUpdateProps = {
  //
};

const AllocateLotUpdate: React.FC<any> = () => {
  const dataFetchedRef = React.useRef(false);

  const allocatelotEditReducer = useSelector(allocateLotEditSelector);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  React.useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;

    console.log("useeffect allocatelotEdit");
    return () => {
      console.log("clear");
      //dispatch(ClearallocateLotEdit());
    };
  }, []);

  const initialValue: any = {};

  const handlechangeqty = ({ id, qty }: { id: number; qty: number }) => {
    // console.log(id);
    // console.log(qty);

    const newlotsize =
      allocatelotEditReducer.allocateLotEdit?.allocateLotSizes?.map((obj) => {
        if (obj.id === id) {
          return { ...obj, qty: qty };
        }
        return obj;
      });

    console.log(newlotsize);

    dispatch(UpdateQty(newlotsize!));

    // const newedit = { ...dataedit, allocateLotSizes: lotsize };

    // let _data = allocatelotEditReducer.allocateLotEdit;
  };

  const showfrom = ({
    values,
    errors,
    setFieldValue,
    isSubmitting,
    handleChange,
  }: FormikProps<AllocateLotResponse>) => {
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
                  Update Lot
                </Typography>
              </Grid>

              <Grid item xs={2} sm={2} md={3}>
                <Field
                  style={{ marginTop: 5 }}
                  variant="standard"
                  fullWidth
                  component={TextField}
                  id="buy"
                  name="buy"
                  type="text"
                  label="Buy"
                  disabled
                />
              </Grid>
              <Grid item xs={2} sm={2} md={3}>
                <Field
                  style={{ marginTop: 5 }}
                  variant="standard"
                  fullWidth
                  component={TextField}
                  id="soNumber"
                  name="soNumber"
                  type="text"
                  label="Sale Order"
                  disabled
                />
              </Grid>
              <Grid item xs={2} sm={2} md={3}>
                <Field
                  style={{ marginTop: 5 }}
                  variant="standard"
                  fullWidth
                  component={TextField}
                  id="lot"
                  name="lot"
                  type="text"
                  label="Lot"
                  disabled
                />
              </Grid>
              <Grid item xs={2} sm={2} md={3}>
                <Field
                  style={{ marginTop: 5 }}
                  variant="standard"
                  fullWidth
                  component={TextField}
                  id="purOrder"
                  name="purOrder"
                  type="text"
                  label="PU Order"
                  disabled
                />
              </Grid>
              <Grid item xs={1} sm={2} md={2}>
                <Field
                  style={{ marginTop: 5 }}
                  variant="standard"
                  fullWidth
                  component={TextField}
                  id="itemNo"
                  name="itemNo"
                  type="text"
                  label="itemNo"
                  disabled
                />
              </Grid>
              <Grid item xs={2} sm={4} md={4}>
                <Field
                  style={{ marginTop: 5 }}
                  variant="standard"
                  fullWidth
                  component={TextField}
                  id="itemName"
                  name="itemName"
                  type="text"
                  label="itemName"
                  disabled
                />
              </Grid>
              <Grid item xs={1} sm={1} md={1}>
                <Field
                  style={{ marginTop: 5 }}
                  variant="standard"
                  fullWidth
                  component={TextField}
                  id="width"
                  name="width"
                  type="text"
                  label="width"
                  disabled
                />
              </Grid>
              <Grid item xs={1} sm={3} md={2}>
                <Field
                  style={{ marginTop: 5 }}
                  variant="standard"
                  fullWidth
                  component={TextField}
                  id="shipToCode"
                  name="shipToCode"
                  type="text"
                  label="shipToCode"
                  disabled
                />
              </Grid>
              <Grid item xs={3} sm={5} md={3}>
                <Field
                  style={{ marginTop: 5 }}
                  variant="standard"
                  fullWidth
                  component={TextField}
                  id="shipToName"
                  name="shipToName"
                  type="text"
                  label="shipToName"
                  disabled
                />
              </Grid>
              <Grid item xs={12} sx={{ paddingTop: 5 }}>
                <Typography variant="h5" sx={{ textAlign: "left" }}>
                  Size Detail...
                </Typography>
              </Grid>
              <Grid item xs={12}>
                {allocatelotEditReducer.allocateLotEdit &&
                  allocatelotEditReducer.allocateLotEdit.allocateLotSizes.map(
                    (item, index) => {
                      return (
                        <Stack
                          key={"a" + index}
                          direction="row"
                          justifyContent="flex-start"
                          alignItems="flex-start"
                          spacing={5}
                          sx={{ marginTop: 2 }}
                        >
                          <Typography key={"b" + index}>{index + 1}</Typography>
                          <Typography key={"c" + index}>
                            {item.itemCode}
                          </Typography>
                          <TextFieldmui
                            key={"d" + index}
                            id="standard-basic"
                            label="Qty ADJ"
                            variant="outlined"
                            type="number"
                            defaultValue={item.qty}
                            size="small"
                            onChange={(e: React.ChangeEvent<any>) => {
                              e.preventDefault();
                              handleChange(e);
                              console.log(e.target.value);

                              // item.qty = e.target.value;
                              let _qty = 0;

                              if (
                                e.target.value !== null &&
                                !isNaN(e.target.value)
                              )
                                _qty = e.target.value;

                              handlechangeqty({ id: item.id, qty: _qty });
                            }}
                          />
                        </Stack>
                      );
                    }
                  )}
              </Grid>

              {allocatelotEditReducer.isFetching && (
                <Grid item xs={12} sm={12} md={12}>
                  {" "}
                  <Alert
                    sx={{ margin: 1 }}
                    variant="outlined"
                    severity="warning"
                  >
                    {allocatelotEditReducer.message}
                  </Alert>
                </Grid>
              )}
              {allocatelotEditReducer.isError && (
                <Grid item xs={12} sm={12} md={12}>
                  {" "}
                  <Alert sx={{ margin: 1 }} variant="outlined" severity="error">
                    {allocatelotEditReducer.message}
                  </Alert>
                </Grid>
              )}

              <Grid item xs={12} sm={12} md={12}>
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{ marginTop: 2, justifyContent: "center" }}
                >
                  <Button
                    variant="outlined"
                    type="button"
                    onClick={(e: React.ChangeEvent<any>) => {
                      e.preventDefault();
                      handleChange(e);

                      dispatch(ClearallocateLotEdit());
                      navigate("/lotList", { state: { types: "UpdateQty" } });
                    }}
                  >
                    Clear
                  </Button>
                  <Button
                    disabled={allocatelotEditReducer.isFetching}
                    variant="contained"
                    color="success"
                    type="submit"
                    sx={{ marginRight: 1 }}
                  >
                    Update
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Form>
        </Box>
      </>
    );
  };

  return (
    <Box sx={{ display: "flex", height: "auto" }}>
      <Formik
        validate={(values: AllocateLotSize) => {
          let errors: any = {};
          // if (!values.soNumber && !values.buy && !values.purOrder) {
          //   if (!values.soNumber) errors.soNumber = "Enter Sale Order";
          //   if (!values.buy) errors.buy = "Enter Buy";
          //   if (!values.purOrder) errors.purOrder = "Enter PU Order";
          // }

          // if (values.stock < 10) errors.stock = "Min stock is not lower than 10";
          // if (values.price < 100) errors.price = "Min price is not lower than 100";
          return errors;
        }}
        enableReinitialize
        initialValues={
          allocatelotEditReducer.allocateLotEdit
            ? allocatelotEditReducer.allocateLotEdit
            : initialValue
        }
        onSubmit={async (values, { resetForm, setSubmitting }) => {
          // const resultaction = await dispatch(GetLotasync(values));

          // const _resultdata: AllocateLotResponse =
          //   allocatelotEditReducer.allocateLotEdit!;

          const resultaction = await dispatch(
            AllocateLotEditUpdatedb({
              id: allocatelotEditReducer.allocateLotEdit?.id!,
              values: allocatelotEditReducer.allocateLotEdit!,
            })
          );

          if (AllocateLotEditUpdatedb.fulfilled.match(resultaction)) {
            dispatch(ClearallocateLotEdit());
            dispatch(
              opensnackbar({
                isOpen: true,
                message:
                  "Update Qiantity of Lot : " +
                  allocatelotEditReducer.allocateLotEdit?.lot +
                  " Complete..",
                types: "success",
              })
            );
            navigate("/lotList", { state: { types: "UpdateQty" } });
          }
        }}
        // onReset={(values) => {
        //   console.log("reset");

        //   navigate("/lotList", { state: { types: "UpdateQty" } });
        //   // dispatch(ClearallocateLotEdit());
        // }}
      >
        {(props: any) => showfrom(props)}
      </Formik>
    </Box>
  );
};

export default AllocateLotUpdate;
