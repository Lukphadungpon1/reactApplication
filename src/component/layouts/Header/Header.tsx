import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

import Typography from "@mui/material/Typography";

import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import { Badge, Box } from "@mui/material";

import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";

import { useSelector } from "react-redux";
import { Logout, authSelector } from "../../../store/slices/authSlice";
import { useAppDispatch } from "../../../store/store";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

type HProps = {
  open: boolean;
  onhandleDrawerOpen: () => void;
};

export default function Header({ open, onhandleDrawerOpen }: HProps) {
  const handleDrawerOpen = () => {
    //setOpen(true);
    onhandleDrawerOpen();
  };

  const authredecer = useSelector(authSelector);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <AppBar position="fixed" open={open}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            marginRight: 5,
            ...(open && { display: "none" }),
          }}
        >
          <MenuIcon />
        </IconButton>

        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
          onClick={() => {
            navigate("/dashboard");
          }}
        >
          <HomeIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          AddOn SAP
        </Typography>

        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          {/* <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
          >
            <Badge badgeContent={17} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton> */}
          {authredecer.token && (
            <Typography variant="h6" noWrap component="div">
              {authredecer.account.iss + "    "}
              {" (" + authredecer.account.EmpDepartment + ") "}
            </Typography>
          )}
          {!authredecer.token && (
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              onClick={() => {
                // dispatch(loginActions.logout(navigate));
              }}
              color="inherit"
            >
              {" "}
              <AccountCircle />
            </IconButton>
          )}
          {authredecer.token && (
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              onClick={() => {
                dispatch(Logout());
              }}
              color="inherit"
            >
              {" "}
              <LogoutIcon />
            </IconButton>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
