import React, { useState } from "react";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";
import { useDispatch } from "react-redux";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";
import { Alert, ButtonComponent } from "../atoms";
import { FormMain } from "../molecules";
import { addBarReservation } from "../../redux/bar/actions";
import { IBarResrvationUserInfo } from "../../interfaces";
import { FormTypes } from "../../enums";

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

  const dispatch = useDispatch<ThunkDispatch<RootState, void, AnyAction>>();

  const onSubmitForm = (data: any, reset: any) => {
    if (data.calendar) {
      const info: IBarResrvationUserInfo = {
        email: data.email,
        lastName: data.lastName,
        name: data.name,
        date: data.calendar.format("DD/MM/YYYY HH:MM"),
        people: data.people,
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
      <FormMain formType={FormTypes.bar} onSubmitForm={onSubmitForm}>
        <ButtonComponent styles={{ marginTop: "2rem" }} typeButton="submit">
          <FormattedMessage id="primary.reservation" />
        </ButtonComponent>
      </FormMain>
    </Container>
  );
}

export default FormBar;
