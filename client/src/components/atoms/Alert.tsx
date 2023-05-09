import { Alert, Snackbar } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";

interface AlertComponentProps {
  message: React.ReactNode;
  alert: boolean;
  setAlert: Dispatch<SetStateAction<boolean>>;
  error?: boolean;
}

function AlertComponent({ message, alert, setAlert, error }: AlertComponentProps) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "left" }}
      open={alert}
      onClose={() => setAlert(false)}
      sx={{ width: '100%' }}
    >
      <Alert
        onClose={() => setAlert(false)}
        severity={error ? "error" : "success"}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}

export default AlertComponent;
