import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import * as React from "react";
import BarcodeList from "./BarcodeList";
import { useSelector } from "react-redux";
import {
  SearchMCbyType,
  generateMCandPDSelector,
} from "../../../store/slices/generateMCandPDSlice";
import { useAppDispatch } from "../../../store/store";
import { mclisthead } from "../../../types/generateMCPD.type";

type MainCardListProps = {
  mclisthead: mclisthead;
};

const MainCardList: React.FC<MainCardListProps> = (prop) => {
  const [value, setValue] = React.useState(0);

  const [type, settype] = React.useState("All");

  const generateMCandPDReducer = useSelector(generateMCandPDSelector);
  const dispatch = useAppDispatch();

  const handleChange = (event: SelectChangeEvent) => {
    let value = event.target.value;

    settype(value);
    dispatch(SearchMCbyType(value));
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
      <Grid
        container
        spacing={{ xs: 1, md: 1 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid item xs={1} sm={1} md={2}>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small-label">Type</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select"
              value={type}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value={"All"}>All</MenuItem>
              <MenuItem value={"UP"}>UP</MenuItem>
              <MenuItem value={"CA"}>CA</MenuItem>
              <MenuItem value={"KD"}>KD</MenuItem>
              <MenuItem value={"MS"}>MS</MenuItem>
              <MenuItem value={"OS"}>OS</MenuItem>
              <MenuItem value={"US"}>US</MenuItem>
              <MenuItem value={"SK"}>SK</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={1} sm={2} md={3}>
          <Typography variant="h5" sx={{ textAlign: "left" }}>
            {prop.mclisthead.lot}
          </Typography>
        </Grid>
        <Grid item xs={2} sm={3} md={4}>
          <Typography variant="h5" sx={{ textAlign: "left" }}>
            {prop.mclisthead.style}
          </Typography>
        </Grid>
        <Grid item xs={1} sm={2} md={3}>
          <Typography variant="h5" sx={{ textAlign: "center" }}>
            {prop.mclisthead.total}
          </Typography>
        </Grid>
      </Grid>
      <BarcodeList type="UP" />
    </Box>
  );
};

export default MainCardList;
