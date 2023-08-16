import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

import Header from "./component/layouts/Header";
import Menu from "./component/layouts/Menu";
import { Navigate, Route, Routes } from "react-router-dom";

import LoginPage from "./component/pages/LoginPage";
import Test from "./component/pages/Test";
import SaleOrder from "./component/pages/SaleOrder";
import NotFound from "./component/pages/NotFound";
import AllocateLot from "./component/pages/AllocateLot";
import { blue, blueGrey } from "@mui/material/colors";
import { useSelector } from "react-redux";
import authSlice, {
  authSelector,
  restoreLogin,
} from "./store/slices/authSlice";
import PublicRoutes from "./router/public.routes";
import ProtectedRoutes from "./router/protected.routes";
import Dashboard from "./component/pages/dashboard/dashboard";
import { useAppDispatch } from "./store/store";
import SaleOrderList from "./component/pages/SaleOrderList/SaleOrderList";
import AllocateLotList from "./component/pages/AllocateLot/AllocateLotList";
import AllocateLotUpdate from "./component/pages/AllocateLotUpdate/AllocateLotUpdate";
import GenerateMC from "./component/pages/GenerateMC/GenerateMC";
import ProductionOrderList from "./component/pages/ProductionOrderList/ProductionOrderList";
import RequestMT from "./component/pages/RequestMT/RequestMT";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const theme = createTheme({
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundImage:
            "url(" +
            `${process.env.PUBLIC_URL}/images/background_menu.jpg` +
            ")",
          width: drawerWidth,
        },
      },
    },
  },
  typography: {
    fontFamily: "Fredoka",
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
  },
  spacing: 8,
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,

  palette: {
    text: {
      primary: "#173A5E",
      secondary: "#46505A",
    },
  },
}));

export default function App() {
  const authredecer = useSelector(authSelector);
  const dispatch = useAppDispatch();

  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    dispatch(restoreLogin());
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
        }}
      >
        <CssBaseline />
        {authredecer.token && (
          <Header open={open} onhandleDrawerOpen={handleDrawerOpen} />
        )}
        {authredecer.token && (
          <Menu open={open} onhandleDrawerOpen={handleDrawerClose} />
        )}

        <Main
          open={open}
          sx={{
            backgroundImage:
              "url(" + `${process.env.PUBLIC_URL}/images/bgMain.png` + ")",
            height: "100%",
          }}
        >
          <DrawerHeader />

          <Routes>
            <Route path="/" element={<PublicRoutes />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="*" element={<NotFound />} />
            </Route>

            <Route path="/" element={<ProtectedRoutes />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/test" element={<Test />} />
              <Route path="/saleOrder" element={<SaleOrder />} />
              <Route path="/SaleOrderList" element={<SaleOrderList />} />
              <Route path="/allocateLot" element={<AllocateLot />} />
              <Route path="/lotList" element={<AllocateLotList />} />
              <Route path="/generateMC" element={<GenerateMC />} />
              <Route path="/pdList" element={<ProductionOrderList />} />
              <Route path="/requestIssue" element={<RequestMT />} />

              <Route
                path="/allocateLotUpdate"
                element={<AllocateLotUpdate />}
              />
            </Route>
          </Routes>
        </Main>
      </Box>
    </ThemeProvider>
  );
}
