import { Alert, Snackbar } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";

interface AlertComponentProps {
  message: string;
  alert: boolean;
  setAlert: Dispatch<SetStateAction<boolean>>;
}

function AlertComponent({ message, alert, setAlert }: AlertComponentProps) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "left" }}
      open={alert}
      autoHideDuration={3000}
      onClose={() => setAlert(false)}
    >
      <Alert
        onClose={() => setAlert(false)}
        severity="success"
        sx={{ width: "100%" }}
      >
        <FormattedMessage id={message} />
      </Alert>
    </Snackbar>
  );
}

export default AlertComponent;
