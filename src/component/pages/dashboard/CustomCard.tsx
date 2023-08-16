import { Card, Grid, Icon, Typography } from "@mui/material";
import React from "react";

type Props = {
  title: string;
  subtitle: string;
  color: any;
  icon: string;
};

const icon = (name: string) => {
  return <Icon fontSize="large">{name}</Icon>;
};

const CustomCard = (props: Props) => {
  return (
    <Card>
      {" "}
      <Grid container style={{ minHeight: 70 }}>
        <Grid item sx={{ flexGrow: 1, height: 80, padding: 1 }}>
          <Typography variant="h6" color="textPrimary">
            {props.title}
          </Typography>
          <Typography variant="h4" color="textSecondary">
            {props.subtitle}
          </Typography>
        </Grid>

        <Grid
          item
          style={{
            backgroundColor: props.color,
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minWidth: 50,
          }}
        >
          {/* <props.icon fontSize="large" /> */}

          {icon(props.icon)}

          {/* {React.createElement(props.icon, { fontSize: "large" })} */}
        </Grid>
      </Grid>
    </Card>
  );
};

export default CustomCard;
