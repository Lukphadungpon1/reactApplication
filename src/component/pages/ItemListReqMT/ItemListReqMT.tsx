import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import * as React from "react";
import { useSelector } from "react-redux";
import { issueMTSelector } from "../../../store/slices/issueMTSlice";
import { useAppDispatch } from "../../../store/store";
import ItemPDList from "./ItemPDList";
import { Field, Formik, FormikProps } from "formik";
import { ReqIssueMTResponse } from "../../../types/issueMT.type";
import CustomSelecte from "../../CustomSelecte";

type ItemListReqMTProps = {
  //
};

const ItemListReqMT: React.FC<any> = () => {
  const [value, setValue] = React.useState(0);
  const [Location, setLocation] = React.useState("All");

  const issueMTReducer = useSelector(issueMTSelector);
  const dispatch = useAppDispatch();

  const handleChange = (event: SelectChangeEvent) => {
    let value = event.target.value;

    setLocation(value);
  };

  const initialValues: ReqIssueMTResponse = {
    id: 0,
    reqNumber: "0",
    lot: "",
    requestBy: "",
    requestDate: new Date().toLocaleDateString("sv"),
    reqDept: "",
    requireDate: new Date().toLocaleDateString("sv"),
    remark: "",
    createBy: "",
    createDate: new Date().toLocaleDateString("sv"),
    updateBy: "",
    updateDate: new Date().toLocaleDateString("sv"),
    status: "",
    reqIssueMaterialDs: [],
    reqIssueMaterialLogs: null,
  };

  const showfrom = ({
    values,
    errors,
    setFieldValue,
    isSubmitting,
  }: FormikProps<ReqIssueMTResponse>) => {
    return (
      <Grid
        container
        spacing={{ xs: 1, md: 1 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid item xs={1} sm={1} md={2}>
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
        <Grid item xs={1} sm={2} md={3}>
          <Typography variant="h5" sx={{ textAlign: "left" }}>
            aaa
          </Typography>
        </Grid>
        <Grid item xs={2} sm={3} md={4}>
          <Typography variant="h5" sx={{ textAlign: "left" }}>
            sss
          </Typography>
        </Grid>
        <Grid item xs={1} sm={2} md={3}>
          <Typography variant="h5" sx={{ textAlign: "center" }}>
            ddd
          </Typography>
        </Grid>
      </Grid>
    );
  };

  return (
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
      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={() => {}}
      >
        {(props: any) => showfrom(props)}
      </Formik>

      <ItemPDList />
    </Box>
  );
};

export default ItemListReqMT;
