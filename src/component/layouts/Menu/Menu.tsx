import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { NavLink } from "react-router-dom";

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import { title } from "process";
import { Collapse, Stack } from "@mui/material";
import NavIcon from "./NavIcon";

import {
  MenuSale,
  MenuAllocate,
  MenuIssueMat,
  MenuReqIssueMat,
} from "./../../../constants/MenuData";
import { useState } from "react";

const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

type MProps = {
  open: boolean;
  onhandleDrawerOpen: () => void;
};

export default function Menu({ open, onhandleDrawerOpen }: MProps) {
  const theme = useTheme();

  const [opens, setopens] = useState(true);
  const [openSaleOrderList, setopenSaleOrderList] = useState(false);
  const [openallocate, setopenallocate] = useState(false);
  const [openIssue, setopenIssue] = useState(false);
  const [openReqIssue, setopenReqIssue] = useState(false);
  const [openproduction, setopenproduction] = useState(false);

  const handleDrawerClose = () => {
    //setOpen(false);
    onhandleDrawerOpen();
  };

  const handleClick = (type: string) => {
    type === "saleOrder" && setopens(!opens);
    type === "SaleOrderList" && setopenSaleOrderList(!openSaleOrderList);
    type === "allocateLot" && setopenallocate(!openallocate);
    type === "issue" && setopenIssue(!openIssue);
    type === "requestMT" && setopenReqIssue(!openReqIssue);
  };

  const MyNavLink = React.forwardRef<any, any>((props, ref) => (
    <NavLink
      ref={ref}
      to={props.to}
      className={({ isActive }) =>
        `${props.className} ${isActive ? props.activeClassName : ""}`
      }
    >
      {props.children}
    </NavLink>
  ));

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <Stack direction="row" alignItems="center">
          <img
            src={`${process.env.PUBLIC_URL}/images/logoaddOn.png`}
            style={{ height: 30 }}
          />
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </Stack>
      </DrawerHeader>
      <Divider />
      {/* <List>
        <ListItem
          button
          to="/saleOrder"
          component={MyNavLink}
          activeClassName="Mui-selected"
          exact
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : "auto",
              justifyContent: "center",
            }}
          >
            <NavIcon name="shopping_basket" />
          </ListItemIcon>
          <ListItemText primary="SaleOrder" sx={{ opacity: open ? 1 : 0 }} />
        </ListItem>
      </List> */}
      {/* <Divider /> */}

      <List>
        {MenuSale.map(({ id, title, path, icon, submenu }) =>
          submenu.length > 0 ? (
            <ListItemButton key={id} onClick={() => handleClick("saleOrder")}>
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 1 : "auto",
                  justifyContent: "center",
                }}
              >
                <NavIcon name={icon} />
              </ListItemIcon>
              <ListItemText primary={title} />
              {opens ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          ) : (
            <ListItem
              key={id}
              button
              to={path}
              component={MyNavLink}
              activeClassName="Mui-selected"
              exact
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 1 : "auto",
                  justifyContent: "center",
                }}
              >
                <NavIcon name={icon} />
              </ListItemIcon>
              <ListItemText primary={title} sx={{ opacity: open ? 1 : 0 }} />
            </ListItem>
          )
        )}
        <Collapse in={opens} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {MenuSale.map(({ submenu }) =>
              submenu.map(({ id, title, path, icon }) => (
                <ListItemButton
                  sx={{ pl: 4 }}
                  key={id}
                  button
                  to={path}
                  component={MyNavLink}
                  activeClassName="Mui-selected"
                  exact
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 1 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <NavIcon name={icon} />
                  </ListItemIcon>
                  <ListItemText primary={title} />
                </ListItemButton>
              ))
            )}
          </List>
        </Collapse>
      </List>
      <Divider />
      <List>
        {/* Allocate Menu */}

        {MenuAllocate.map(({ id, title, path, icon, submenu }) =>
          submenu.length > 0 ? (
            <ListItemButton key={id} onClick={() => handleClick("allocateLot")}>
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 1 : "auto",
                  justifyContent: "center",
                }}
              >
                <NavIcon name={icon} />
              </ListItemIcon>
              <ListItemText primary={title} />
              {openallocate ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          ) : (
            <ListItem
              key={id}
              button
              to={path}
              component={MyNavLink}
              activeClassName="Mui-selected"
              exact
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 1 : "auto",
                  justifyContent: "center",
                }}
              >
                <NavIcon name={icon} />
              </ListItemIcon>
              <ListItemText primary={title} sx={{ opacity: open ? 1 : 0 }} />
            </ListItem>
          )
        )}
        <Collapse in={openallocate} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {MenuAllocate.map(({ submenu }) =>
              submenu.map(({ id, title, path, icon }) => (
                <ListItemButton
                  sx={{ pl: 4 }}
                  key={id}
                  button
                  to={path}
                  component={MyNavLink}
                  activeClassName="Mui-selected"
                  exact
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 1 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <NavIcon name={icon} />
                  </ListItemIcon>
                  <ListItemText primary={title} />
                </ListItemButton>
              ))
            )}
          </List>
        </Collapse>
      </List>

      <Divider />

      <List>
        {/* Request Issue MT Menu */}

        {MenuReqIssueMat.map(({ id, title, path, icon, submenu }) =>
          submenu.length > 0 ? (
            <ListItemButton key={id} onClick={() => handleClick("requestMT")}>
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 1 : "auto",
                  justifyContent: "center",
                }}
              >
                <NavIcon name={icon} />
              </ListItemIcon>
              <ListItemText primary={title} />
              {openReqIssue ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          ) : (
            <ListItem
              key={id}
              button
              to={path}
              component={MyNavLink}
              activeClassName="Mui-selected"
              exact
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 1 : "auto",
                  justifyContent: "center",
                }}
              >
                <NavIcon name={icon} />
              </ListItemIcon>
              <ListItemText primary={title} sx={{ opacity: open ? 1 : 0 }} />
            </ListItem>
          )
        )}
        <Collapse in={openReqIssue} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {MenuReqIssueMat.map(({ submenu }) =>
              submenu.map(({ id, title, path, icon }) => (
                <ListItemButton
                  sx={{ pl: 4 }}
                  key={id}
                  button
                  to={path}
                  component={MyNavLink}
                  activeClassName="Mui-selected"
                  exact
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 1 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <NavIcon name={icon} />
                  </ListItemIcon>
                  <ListItemText primary={title} />
                </ListItemButton>
              ))
            )}
          </List>
        </Collapse>
      </List>

      <Divider />

      <List>
        {/* Issue Mat */}

        {MenuIssueMat.map(({ id, title, path, icon, submenu }) =>
          submenu.length > 0 ? (
            <ListItemButton key={id} onClick={() => handleClick("issue")}>
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 1 : "auto",
                  justifyContent: "center",
                }}
              >
                <NavIcon name={icon} />
              </ListItemIcon>
              <ListItemText primary={title} />
              {openIssue ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          ) : (
            <ListItem
              key={id}
              button
              to={path}
              component={MyNavLink}
              activeClassName="Mui-selected"
              exact
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 1 : "auto",
                  justifyContent: "center",
                }}
              >
                <NavIcon name={icon} />
              </ListItemIcon>
              <ListItemText primary={title} sx={{ opacity: open ? 1 : 0 }} />
            </ListItem>
          )
        )}
        <Collapse in={openIssue} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {MenuIssueMat.map(({ submenu }) =>
              submenu.map(({ id, title, path, icon }) => (
                <ListItemButton
                  sx={{ pl: 4 }}
                  key={id}
                  button
                  to={path}
                  component={MyNavLink}
                  activeClassName="Mui-selected"
                  exact
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 1 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <NavIcon name={icon} />
                  </ListItemIcon>
                  <ListItemText primary={title} />
                </ListItemButton>
              ))
            )}
          </List>
        </Collapse>
      </List>
      <Divider />

      {/* <List>
        {MenuProduction.map(({ id, title, path, icon, submenu }) =>
          submenu.length > 0 ? (
            <ListItemButton onClick={() => handleClick("Production")}>
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 1 : "auto",
                  justifyContent: "center",
                }}
              >
                <NavIcon name={icon} />
              </ListItemIcon>
              <ListItemText primary={title} />
              {openproduction ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          ) : (
            <ListItem
              key={id}
              button
              to={path}
              component={MyNavLink}
              activeClassName="Mui-selected"
              exact
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 1 : "auto",
                  justifyContent: "center",
                }}
              >
                <NavIcon name={icon} />
              </ListItemIcon>
              <ListItemText primary={title} sx={{ opacity: open ? 1 : 0 }} />
            </ListItem>
          )
        )}
        <Collapse in={openproduction} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {MenuProduction.map(({ submenu }) =>
              submenu.map(({ id, title, path }) => (
                <ListItemButton
                  sx={{ pl: 4 }}
                  key={id}
                  button
                  to={path}
                  component={MyNavLink}
                  activeClassName="Mui-selected"
                  exact
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 1 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <ArrowForwardIosIcon />
                  </ListItemIcon>
                  <ListItemText primary={title} />
                </ListItemButton>
              ))
            )}
          </List>
        </Collapse>

        
      </List> */}
      <Divider />
    </Drawer>
  );
}
