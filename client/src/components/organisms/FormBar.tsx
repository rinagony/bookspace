import React, { useState } from "react";
import { Grid } from "@mui/material";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";
import { useDispatch } from "react-redux";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";
import { Alert, ButtonComponent, DateTimePicker } from "../atoms";
import { Dayjs } from "dayjs";
import { FormMain } from "../molecules";
import { addBarReservation } from "../../redux/bar/actions";
import { IBarResrvationUserInfo } from "../../interfaces";

const Container = styled.div`
  padding-top: 2rem 1rem;
  display: flex;
  justify-content: center;
`;

function FormBar() {
  const [snackbarStatus, setSnackbarStatus] = useState<{
    show: boolean;
    error: boolean;
    errorMessage: string;
    email?: string;
  }>({
    show: false,
    error: false,
    errorMessage: "",
  });

  const [timePickerValue, setTimePickerValue] = useState<Dayjs | null>(null);

  const dispatch = useDispatch<ThunkDispatch<RootState, void, AnyAction>>();

  const onSubmitForm = (data: any, reset: any) => {
    if (timePickerValue) {
      const info: IBarResrvationUserInfo = {
        email: data.email,
        lastName: data.lastName,
        name: data.name,
        date: timePickerValue.format("DD/MM/YYYY HH:MM"),
        phone: data.phone,
      };
      dispatch(addBarReservation(info))
        .then(() => {
          setSnackbarStatus({
            show: true,
            error: false,
            email: data.email,
            errorMessage: "",
          });
          reset();
        })
        .catch(() =>
          setSnackbarStatus({
            show: true,
            error: true,
            errorMessage: "",
            email: "",
          })
        );
    } else {
      setSnackbarStatus({
        show: true,
        error: true,
        email: "",
        errorMessage: "Please, fill date and time!",
      });
    }
  };
  return (
    <Container>
      <Alert
        alert={snackbarStatus.show}
        error={snackbarStatus.error}
        setAlert={() =>
          setSnackbarStatus({
            show: false,
            error: false,
            email: "",
            errorMessage: "",
          })
        }
        message={
          snackbarStatus.error ? (
            snackbarStatus.errorMessage.length ? (
              snackbarStatus.errorMessage
            ) : (
              <FormattedMessage id="error.occured" />
            )
          ) : (
            <FormattedMessage
              id="bar.sent"
              values={{ val: snackbarStatus.email }}
            />
          )
        }
      />
      <FormMain onSubmitForm={onSubmitForm}>
        <Grid container>
          <DateTimePicker
            value={timePickerValue}
            setValue={setTimePickerValue}
          />
        </Grid>
        <ButtonComponent styles={{ marginTop: "2rem" }} typeButton="submit">
          <FormattedMessage id="primary.reservation" />
        </ButtonComponent>
      </FormMain>
    </Container>
  );
}

export default FormBar;
