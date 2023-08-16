import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { typographyClasses } from "@mui/material";
import { FieldProps } from "formik";
import { useSelector } from "react-redux";
import { saleOrderSelector } from "../store/slices/saleOrderSlice";
import { issueMTSelector } from "../store/slices/issueMTSlice";

interface props extends FieldProps {
  types: string;
}

export default function CustomSelecte(props: props) {
  const dataFetchedRef = React.useRef(false);
  const saleOrderReducer = useSelector(saleOrderSelector);
  const issueMTReducer = useSelector(issueMTSelector);
  const errorsmessage = props.form.errors[props.field.name];

  const [age, setAge] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    props.form.setFieldValue(props.field.name, event.target.value);

    setAge(event.target.value as string);
  };

  React.useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
  }, []);

  return (
    <Box sx={{ minWidth: 120 }}>
      <Box sx={{ color: "red" }}>{errorsmessage?.toString()}</Box>

      <FormControl fullWidth>
        <InputLabel id={props.field.name}>{props.field.name}</InputLabel>
        <Select
          labelId={props.field.name}
          id={props.field.name}
          value={props.field.value}
          label={props.field.name}
          onChange={handleChange}
        >
          <MenuItem value="" key={0}>
            Please select
          </MenuItem>
          {props.field.name === "SaleTypes" &&
            saleOrderReducer.saleType.map((item, index) => (
              <MenuItem value={item.value} key={index}>
                {item.name}
              </MenuItem>
            ))}
          {props.field.name === "BuyMonth" &&
            saleOrderReducer.buyMonth.map((item, index) => (
              <MenuItem value={item.value} key={index}>
                {item.name}
              </MenuItem>
            ))}
          {props.field.name === "BuyYear" &&
            saleOrderReducer.buyYear.map((item, index) => (
              <MenuItem value={item.value} key={index}>
                {item.name}
              </MenuItem>
            ))}
          {props.field.name === "location" &&
            issueMTReducer.LocationIssue.map((item, index) => (
              <MenuItem value={item.code} key={index}>
                {item.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </Box>
  );
}
