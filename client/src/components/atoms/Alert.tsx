import { Alert, Snackbar } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";

interface AlertComponentProps {
  message: React.ReactNode;
  alert: boolean;
  setAlert: Dispatch<SetStateAction<{show: boolean, type: string}>>;
  error?: boolean;
}

function AlertComponent({ message, alert, setAlert, error }: AlertComponentProps) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={alert}
      onClose={() => setAlert({show: false, type: ''})}
      sx={{ width: '100%' }}
    >
      <Alert
        onClose={() => setAlert({show: false, type: ''})}
        severity={error ? "error" : "success"}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}

export default AlertComponent;
