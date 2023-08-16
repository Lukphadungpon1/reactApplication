import { ErrorMessage, Field, Form, Formik, FormikProps } from "formik";
import * as React from "react";
import {
  SaleOrderDetailExcel,
  SaleOrderExcel,
  SaleOrderGetCustomer,
  SaleOrderMasterResult,
  saleOrderRequest,
} from "../../../types/saleOrder.type";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Select, TextField } from "formik-material-ui";
import Button from "@mui/material/Button";
import {
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
  TextField as TextFieldmui,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector } from "react-redux";
import {
  SaleOrderMasterData,
  SaleOrderMasterDataBuyMonth,
  SaleOrderMasterDataBuyYear,
  SaleOrderMasterDataSaleType,
  saleOrderSelector,
} from "../../../store/slices/saleOrderSlice";
import { useAppDispatch } from "../../../store/store";
import axios from "axios";
import CustomSelecte from "../../CustomSelecte";
import CustomerList from "./CustomerList";
import {
  SOEditAdd,
  SOEditClearData,
  SOEditUpdate,
  saleOrderEditSelector,
  SaleOrderExcelDatadetail,
  SOEditGeyByID,
  SOEditUpdateDB,
  SOEditGetFile,
} from "../../../store/slices/saleOrderEditSlice";
import * as xlsx from "xlsx";
import { error } from "console";
import CustomizedSnackbars from "../CustomizedSnackbars";
import {
  opensnackbar,
  snackbarSelector,
} from "../../../store/slices/snackbarSlice";
import { useLocation, useMatch } from "react-router-dom";
import SaleOrderDetailExcelList from "./SaleOrderDetailExcelList";
import { header, httpClient } from "../../../utils/httpclient";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { TOKEN, apiUrl } from "../../../constants/Constants";

type SaleOrderProps = {};

type downloadfile = {
  filename: string;
  sonumber: string;
};

const SaleOrder: React.FC<any> = () => {
  const saleOrderEditReducer = useSelector(saleOrderEditSelector);
  const saleOrderReducer = useSelector(saleOrderSelector);
  const dispatch = useAppDispatch();

  const dataFetchedRef = React.useRef(false);
  const [openDialogCus, setopenDialogCus] = React.useState<boolean>(false);
  const [openDialogDetail, setopenDialogDetail] =
    React.useState<boolean>(false);

  const [excelData, setexcelData] = React.useState<SaleOrderDetailExcel[]>([]);
  const [excelError, setexcelError] = React.useState(false);

  const { state } = useLocation();

  const loadMasterData = async () => {
    const Customer = await dispatch(SaleOrderMasterData());
    const SaleType = await dispatch(SaleOrderMasterDataSaleType());
    const BuyMonth = await dispatch(SaleOrderMasterDataBuyMonth());
    const BuyYear = await dispatch(SaleOrderMasterDataBuyYear());
  };

  const leadSObyID = async (value: Number) => {
    //console.log(value);
    await dispatch(SOEditGeyByID(value));
  };

  React.useEffect(() => {
    // const headers = {
    //   Authorization:
    //     "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJUaGVlcmF5dXQuTCIsIkVtcE5hbWUiOiJUaGVlcmF5dXQiLCJFbXBMbmFtZSI6Ikx1a3BoYWR1bmdwb24iLCJFbXBQb3NpdGlvbiI6IlByb2dyYW1tZXIiLCJFbXBTZWN0aW9uIjoiSVQiLCJFbXBEZXBhcnRtZW50IjoiSVQiLCJFbXBFbWFpbCI6InRoZWVyYXl1dC5sQHJvZnV0aC5jb20iLCJTaXRlIjoiS1RIIiwiUm9sZSI6IklUIiwiZXhwIjoxNjgxODk0MDQxLCJpc3MiOiJUaGVlcmF5dXQubCIsImF1ZCI6InJvZnUoVGhhaWxhbmQpIEx0ZC4ifQ.c7wd8agvCv4IPHDlumof1lsL0F_qGy909jDFcJYrrbs",
    // };
    // axios
    //   .get("http://localhost:8088/api/SaleOrder/GetCustomer", { headers })
    //   .then((response) => {
    //     console.log(response.data);
    //   })
    //   .catch((error) => {
    //     console.log(error.data);
    //   });

    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;

    if (state) {
      leadSObyID(state.rowid);
    }
    loadMasterData();

    return () => {
      console.log("call back");
      dispatch(SOEditClearData());
    };
  }, []);

  const handlecloseDialog = () => {
    setopenDialogCus(false);
  };

  const showDialog = () => {
    return (
      <Dialog
        fullWidth
        maxWidth="md"
        PaperProps={{ sx: { height: "70vh" } }}
        open={openDialogCus}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          <Typography>Customer List</Typography>
        </DialogTitle>
        <DialogContent>
          {/* <Typography>{JSON.stringify(props.values)}</Typography> */}
          <CustomerList handlecloseDialog={handlecloseDialog} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handlecloseDialog()} color="info">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  const showDialogDetail = () => {
    return (
      <Dialog
        fullWidth
        maxWidth="xl"
        PaperProps={{ sx: { height: "70vh" } }}
        open={openDialogDetail}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          <Typography>
            Detail List (Count : {saleOrderEditReducer.excelDetail.length})
          </Typography>
        </DialogTitle>
        <DialogContent>
          {/* <Typography>{JSON.stringify(props.values)}</Typography> */}
          <SaleOrderDetailExcelList />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setopenDialogDetail(false)} color="info">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  const handleSoDetail = async (props: downloadfile) => {
    const token = localStorage.getItem(TOKEN);
    axios
      .get(
        apiUrl +
          "/SaleOrder/DownloadSoDetailFile?filename=" +
          props.filename +
          "&sonumber=" +
          props.sonumber,
        {
          headers: {
            "Content-Disposition":
              "attachment; filename=" + props.sonumber + ".xlsx",
            "Content-Type":
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            Authorization: `Bearer ${token}`,
          },
          responseType: "arraybuffer",
        }
      )
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", props.sonumber + ".xlsx");
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => console.log(error));
  };

  const handleSoDetailDW = async () => {
    // const downloaddata = saleOrderEditReducer.excelDetail.forEach

    let data: SaleOrderExcel[] = [];

    saleOrderEditReducer.excelDetail.forEach((item, index) => {
      let _data: SaleOrderExcel = {
        id: index,
        itemCode: item.itemCode,
        quantity: item.quantity,
        shipToCode: item.shipToCode,
        shipToName: item.shipToDesc,
        poNumber: item.poNumber,
        width: item.width,
      };

      data.push(_data);
    });
    console.log(data);

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    //let buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
    //XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(
      workbook,
      saleOrderEditReducer.saleorderRequest.SoNumber + ".xlsx"
    );
  };

  const handleTemplate = async () => {
    const token = localStorage.getItem(TOKEN);
    const templatename = "TemplateSaleOrderD";
    axios
      .get(apiUrl + "/SaleOrder/DownloadTemplateFile", {
        headers: {
          "Content-Disposition":
            "attachment; filename=" + templatename + ".xlsx",
          "Content-Type":
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          Authorization: `Bearer ${token}`,
        },
        responseType: "arraybuffer",
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", templatename + ".xlsx");
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => console.log(error));
  };

  const handlecleardata = () => {
    dispatch(SOEditClearData());
  };

  const showfrom = ({
    values,
    errors,
    setFieldValue,
    isSubmitting,
  }: FormikProps<saleOrderRequest>) => {
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
                  New SaleOrder
                </Typography>
              </Grid>

              <Grid item xs={6} sm={3} md={3}>
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
                    id="CardCode"
                    name="CardCode"
                    type="text"
                    label="Customer Code"
                  />

                  <IconButton
                    type="button"
                    aria-label="search"
                    onClick={(e: React.ChangeEvent<any>) => {
                      e.preventDefault();

                      dispatch(SOEditUpdate(values));
                      setopenDialogCus(true);
                    }}
                  >
                    <SearchIcon />
                  </IconButton>
                </Stack>
              </Grid>
              <Grid item xs={6} sm={4} md={4}>
                <Field
                  style={{ marginTop: 5 }}
                  variant="standard"
                  fullWidth
                  component={TextField}
                  disabled
                  id="CardName"
                  name="CardName"
                  type="text"
                  label="Customer Name"
                />
              </Grid>
              <Grid item xs={2} sm={2} md={2}>
                <Field
                  style={{ marginTop: 5 }}
                  variant="standard"
                  fullWidth
                  component={TextField}
                  disabled
                  id="Currency"
                  name="Currency"
                  type="text"
                  label="Currency"
                />
              </Grid>
              <Grid item xs={2} sm={3} md={3}>
                <Field
                  style={{ marginTop: 5 }}
                  variant="standard"
                  fullWidth
                  component={TextField}
                  disabled
                  id="DocStatus"
                  name="DocStatus"
                  type="text"
                  label="Status"
                />
              </Grid>
              <Grid item xs={6} sm={3} md={3}>
                <Field
                  style={{ marginTop: 5 }}
                  variant="standard"
                  fullWidth
                  component={TextField}
                  disabled
                  id="SoNumber"
                  name="SoNumber"
                  type="text"
                  label="SoNumber"
                />
              </Grid>
              <Grid item xs={2} sm={3} md={3}>
                <Field
                  style={{ marginTop: 5 }}
                  variant="standard"
                  fullWidth
                  component={CustomSelecte}
                  id="BuyYear"
                  name="BuyYear"
                  label="Buy Year"
                ></Field>
              </Grid>
              <Grid item xs={2} sm={3} md={3}>
                <Field
                  style={{ marginTop: 5 }}
                  variant="standard"
                  fullWidth
                  component={CustomSelecte}
                  id="BuyMonth"
                  name="BuyMonth"
                  type="text"
                  label="Buy Month"
                />

                {/* {errors.BuyMonth && <div>{errors.BuyMonth}</div>} */}
              </Grid>
              <Grid item xs={2} sm={3} md={3}>
                <Field
                  style={{ marginTop: 5 }}
                  variant="standard"
                  component={CustomSelecte}
                  id="SaleTypes"
                  name="SaleTypes"
                  label="SaleType"
                >
                  {/* {saleOrderReducer.saleType.length > 0 && saleTypeOP()} */}
                </Field>
              </Grid>
              <Grid item xs={2} sm={3} md={3}>
                <Field
                  style={{ marginTop: 5 }}
                  variant="standard"
                  fullWidth
                  component={TextField}
                  id="DeliveryDate"
                  name="DeliveryDate"
                  type="date"
                  label="DeliveryDate"
                />
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

              <Grid item xs={3} sm={3} md={3}>
                <div>
                  <span style={{ color: "#00B0CD", marginLeft: 10 }}>
                    SaleOrder Detail Upload (Excel File)
                  </span>
                  <TextFieldmui
                    id="FormFiles-basic"
                    label=""
                    variant="standard"
                    type="file"
                    inputProps={{
                      accept:
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                    }}
                    name="FormFiles"
                    onChange={(e: React.ChangeEvent<any>) => {
                      e.preventDefault();

                      const filetype = [
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                      ];

                      if (
                        e.target.files[0] &&
                        filetype.includes(e.target.files[0].type)
                      ) {
                        setexcelError(false);
                        setexcelData([]);

                        const reader = new FileReader();
                        reader.onload = (e) => {
                          const data = e.target?.result;
                          const workbook = xlsx.read(data, { type: "array" });
                          const sheetName = workbook.SheetNames[0];
                          const worksheet = workbook.Sheets[sheetName];
                          const json = xlsx.utils.sheet_to_json(worksheet);

                          json.map((item: any, index) => {
                            let _data: SaleOrderDetailExcel = {
                              id: index,
                              itemCode: item.ItemNo,
                              style: "",
                              quantity: item.Quanlity,
                              shipToCode: String(item.ShipToCode),
                              shipToDesc: item.ShitToName,
                              poNumber: String(item.PoNumber),
                              width: "",
                              status: "",
                              colors: "",
                              category: "",
                              gender: "",
                            };
                            // console.log(_data);

                            setexcelData((excelData) => [...excelData, _data]);
                          });

                          // console.log(json);
                        };
                        reader.readAsArrayBuffer(e.target.files[0]);

                        setFieldValue("FormFiles", e.target.files[0]); // for upload
                      } else {
                        setexcelError(true);
                      }
                    }}
                  />
                  {/* <input
                    type="file"
                    onChange={(e: React.ChangeEvent<any>) => {
                      e.preventDefault();
                      setFieldValue("FormFiles", e.target.files[0]); // for upload
                    }}
                    name="FormFiles"
                    click-type="type1"
                    accept="image/*"
                    id="files"
                    style={{ padding: "20px 0 0 20px" }}
                  /> */}
                </div>
              </Grid>
              <Grid item xs={1} sm={2} md={2}>
                <Button
                  variant="outlined"
                  color="info"
                  type="button"
                  sx={{ marginRight: 1 }}
                  onClick={async (e: React.ChangeEvent<any>) => {
                    e.preventDefault();

                    console.log(excelData);
                    if (excelData.length > 0) {
                      const detail = await dispatch(
                        SaleOrderExcelDatadetail(excelData)
                      );

                      setopenDialogDetail(true);
                    } else {
                      if (saleOrderEditReducer.excelDetail.length > 0) {
                        setopenDialogDetail(true);
                      } else {
                        dispatch(
                          opensnackbar({
                            isOpen: true,
                            message: "Please input Excel File",
                            types: "warning",
                          })
                        );
                      }
                    }
                  }}
                >
                  Get Detail
                </Button>
              </Grid>

              {state ? (
                <Grid item xs={1} sm={2} md={2}>
                  <Button
                    variant="outlined"
                    color="info"
                    type="button"
                    sx={{ marginRight: 1 }}
                    onClick={async (e: React.ChangeEvent<any>) => {
                      e.preventDefault();

                      //console.log(excelData);

                      if (saleOrderEditReducer.excelDetail.length > 0) {
                        handleSoDetailDW();
                      } else {
                        dispatch(
                          opensnackbar({
                            isOpen: true,
                            message: "Can't Download Excel File...",
                            types: "warning",
                          })
                        );
                      }

                      //console.log(filename + " " + sonumber);
                    }}
                  >
                    Download Detail
                  </Button>
                </Grid>
              ) : (
                <Grid item xs={1} sm={2} md={2}>
                  <Button
                    variant="outlined"
                    color="info"
                    type="button"
                    sx={{ marginRight: 1 }}
                    onClick={async (e: React.ChangeEvent<any>) => {
                      e.preventDefault();
                      handleTemplate();

                      //console.log(filename + " " + sonumber);
                    }}
                  >
                    Template
                  </Button>
                </Grid>
              )}

              {excelError ||
                (errors.FormFiles && (
                  <Grid item xs={12} sm={12} md={12}>
                    <Alert
                      sx={{ margin: 1 }}
                      variant="outlined"
                      severity="warning"
                    >
                      Please input Excel File (*.xlsx)
                    </Alert>
                  </Grid>
                ))}

              {saleOrderReducer.isError && (
                <Grid item xs={12} sm={12} md={12}>
                  {" "}
                  <Alert
                    sx={{ margin: 1 }}
                    variant="outlined"
                    severity="warning"
                  >
                    {saleOrderReducer.message}
                  </Alert>
                </Grid>
              )}
              {saleOrderEditReducer.isFetching && (
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
              {saleOrderEditReducer.isError && (
                <Grid item xs={12} sm={12} md={12}>
                  {" "}
                  <Alert
                    sx={{ margin: 1 }}
                    variant="outlined"
                    severity="warning"
                  >
                    {saleOrderEditReducer.message}
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
                    type="reset"
                    onClick={handlecleardata}
                  >
                    Clear
                  </Button>
                  <Button
                    disabled={saleOrderEditReducer.isFetching}
                    variant="contained"
                    color="success"
                    type="submit"
                    sx={{ marginRight: 1 }}
                  >
                    {state ? "Update" : "Save"}
                  </Button>
                </Stack>
              </Grid>

              {/* {Array.from(Array(6)).map((_, index) => (
                <Grid item xs={2} sm={4} md={4} key={index}>
                  <Item>xs=2</Item>
                </Grid>
              ))} */}
            </Grid>
          </Form>
          {showDialog()}
          {showDialogDetail()}
        </Box>
      </>
    );
  };

  const initialValues: saleOrderRequest = {
    DocEntry: 0,
    SoNumber: "0",
    CardCode: "",
    CardName: "",
    Currency: "",
    BuyYear: "",
    BuyMonth: "",
    DocStatus: "Draft",
    SaleTypes: "",
    DeliveryDate: new Date().toLocaleDateString("sv"),
    Remark: "",
    FormFiles: "",
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Formik
        validate={(values: saleOrderRequest) => {
          let errors: any = {};
          if (!values.CardCode) errors.CardCode = "Enter Code";
          if (!values.CardName) errors.CardName = "Enter Name";
          if (!values.Currency) errors.Currency = "Enter Currency";
          if (!values.BuyYear) errors.BuyYear = "Enter Buy Year";
          if (!values.BuyMonth) errors.BuyMonth = "Enter Buy Month";
          if (!values.SaleTypes) errors.SaleTypes = "Enter Sale Type";

          if (!values.FormFiles && values.FormFiles !== "" && !state)
            errors.FormFiles = "Please input File";

          // if (values.stock < 10) errors.stock = "Min stock is not lower than 10";
          // if (values.price < 100) errors.price = "Min price is not lower than 100";
          return errors;
        }}
        enableReinitialize
        initialValues={
          saleOrderEditReducer.saleorderRequest
            ? saleOrderEditReducer.saleorderRequest
            : initialValues
        }
        onSubmit={async (values, { setSubmitting }) => {
          // console.log(values);
          // console.log(values.FormFiles.name);
          // console.log(excelData.length);

          if (state) {
            const resultaction = await dispatch(
              SOEditUpdateDB({
                id: state.rowid ? state.rowid : 0,
                values: values,
              })
            );
            if (SOEditUpdateDB.fulfilled.match(resultaction)) {
              dispatch(SOEditClearData);
              dispatch(
                opensnackbar({
                  isOpen: true,
                  message:
                    "Update SO : " +
                    saleOrderEditReducer.saleorderRequest.SoNumber +
                    " Complete..",
                  types: "success",
                })
              );
            }
          } else {
            const resultaction = await dispatch(SOEditAdd(values));
            if (SOEditAdd.fulfilled.match(resultaction)) {
              dispatch(SOEditClearData);
              dispatch(
                opensnackbar({
                  isOpen: true,
                  message:
                    "Create SO : " +
                    saleOrderEditReducer.saleorderRequest.SoNumber +
                    " Complete..",
                  types: "success",
                })
              );
            }
          }
        }}
      >
        {(props: any) => showfrom(props)}
      </Formik>
    </Box>
  );
};

export default SaleOrder;
