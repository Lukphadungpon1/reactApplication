import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { useSelector } from "react-redux";
import {
  closesnackbar,
  snackbarSelector,
} from "../../store/slices/snackbarSlice";
import { useAppDispatch } from "../../store/store";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

type Props = {
  message: string;
  serverity: any;
  handlecloseMessage: any;
};

const CustomizedSnackbars = () => {
  const snackbarReducer = useSelector(snackbarSelector);
  const dispatch = useAppDispatch();

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(closesnackbar());
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar
        open={snackbarReducer.isOpen}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity={
            snackbarReducer.types === "success"
              ? "success"
              : snackbarReducer.types === "error"
              ? "error"
              : snackbarReducer.types === "info"
              ? "info"
              : snackbarReducer.types === "warning"
              ? "warning"
              : "info"
          }
          sx={{ width: "100%" }}
        >
          {snackbarReducer.message}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default CustomizedSnackbars;
