import * as React from "react";
import { useSelector } from "react-redux";
import { authSelector } from "../../../store/slices/authSlice";
import { Box, Grid, Typography } from "@mui/material";

import CustomCard from "./CustomCard";
import {
  DashboardCardAsync,
  dashboardSelector,
} from "../../../store/slices/dashboardSlice";
import { useAppDispatch } from "../../../store/store";

type DashboardProps = {
  //
};

const Dashboard: React.FC<any> = () => {
  const authredecer = useSelector(authSelector);
  const dispatch = useAppDispatch();

  const dashboardreducer = useSelector(dashboardSelector);

  const getdashboardCard = async () => {
    await dispatch(DashboardCardAsync());
  };

  React.useEffect(() => {
    getdashboardCard();
    return () => {};
  }, []);

  return (
    <>
      <Box sx={{ width: "100%", height: "100vh" }}>
        <Typography variant="h5">Welcome Back..</Typography>

        <Grid
          container
          style={{ marginBottom: 16 }}
          sx={{ mt: 0.5 }}
          spacing={7}
        >
          <Grid item lg={3} md={6} sm={12}>
            <CustomCard
              title="Draft SO"
              subtitle={dashboardreducer.dashboardCard.draftSO.toString()}
              color={"#65929B"}
              icon={"shopping_basket"}
            />
          </Grid>
          <Grid item lg={3} md={6} sm={12}>
            <CustomCard
              title="wait CV SO"
              subtitle={dashboardreducer.dashboardCard.wtConvertSO.toString()}
              color={"#50AFC2"}
              icon={"upload"}
            />
          </Grid>
          <Grid item lg={3} md={6} sm={12}>
            <CustomCard
              title="Wait Allocate"
              subtitle={dashboardreducer.dashboardCard.wtAllocate.toString()}
              color={"#085E6F"}
              icon={"rebase_edit"}
            />
          </Grid>
          <Grid item lg={3} md={6} sm={12}></Grid>
          <Grid item lg={3} md={6} sm={12}>
            <CustomCard
              title="Allcate Lot"
              subtitle={dashboardreducer.dashboardCard.allocate.toString()}
              color={"#2AAC13"}
              icon={"dynamic_form"}
            />
          </Grid>
          <Grid item lg={3} md={6} sm={12}>
            <CustomCard
              title="Wait Gen MC"
              subtitle={dashboardreducer.dashboardCard.wtGenMC.toString()}
              color={"#A8B02D"}
              icon={"qr_code_scanner"}
            />
          </Grid>
          <Grid item lg={3} md={6} sm={12}>
            <CustomCard
              title="Wait Gen PD"
              subtitle={dashboardreducer.dashboardCard.wtGenPD.toString()}
              color={"#B08B2D"}
              icon={"view_list"}
            />
          </Grid>
          <Grid item lg={3} md={6} sm={12}>
            <CustomCard
              title="Wait CV PD"
              subtitle={dashboardreducer.dashboardCard.wtConvertPD.toString()}
              color={"#50AFC2"}
              icon={"upload"}
            />
          </Grid>
          <Grid item lg={3} md={6} sm={12}>
            <CustomCard
              title="Released PD"
              subtitle={dashboardreducer.dashboardCard.wtReleasedPD.toString()}
              color={"#8F1F14"}
              icon={"playlist_add_check"}
            />
          </Grid>
          <Grid item lg={3} md={6} sm={12}></Grid>
        </Grid>

        {/* <Typography noWrap>{authredecer.token}</Typography>
        {authredecer.message} */}
      </Box>
    </>
  );
};

export default Dashboard;
