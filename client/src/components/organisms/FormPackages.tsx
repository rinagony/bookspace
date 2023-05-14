import React, { useState } from "react";
import styled from "styled-components";
import { IPackage, IReservationInfo } from "../../interfaces";
import { FormattedMessage } from "react-intl";
import { useDispatch } from "react-redux";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { addPackReservation } from "../../redux/about/actions";
import { RootState } from "../../redux/store";
import { Alert } from "../atoms";
import { FormMain } from "../molecules";

interface FormReservationProps {
  item: IPackage | null;
  children: React.ReactNode;
}

const Container = styled.div`
  padding-top: 2rem 1rem;
`;

const Info = styled.p`
  span {
    margin-left: 0.5rem;
    font-weight: 600;
  }
`;

function FormReservation({ item, children }: FormReservationProps) {
  const [snackbarStatus, setSnackbarStatus] = useState<{
    show: boolean;
    error: boolean;
    email?: string;
  }>({ show: false, error: false });

  const dispatch = useDispatch<ThunkDispatch<RootState, void, AnyAction>>();

  const onSubmitReservation = (data: any, reset: any) => {
    if (item) {
      const reservationInfo: IReservationInfo = {
        packageTitle: item.title,
        email: data.email,
        lastName: data.lastName,
        name: data.name,
        date: item.date,
        phone: data.phone,
      };
      dispatch(addPackReservation(reservationInfo))
        .then(() => {
          setSnackbarStatus({ show: true, error: false, email: data.email });
          reset();
        })
        .catch(() => setSnackbarStatus({ show: true, error: false }));
    }
  };
  return (
    <Container>
      <Alert
        alert={snackbarStatus.show}
        error={snackbarStatus.error}
        setAlert={() =>
          setSnackbarStatus({ show: false, error: false, email: "" })
        }
        message={
          snackbarStatus.error ? (
            <FormattedMessage id="error.occured" />
          ) : (
            <FormattedMessage
              id="form.sent"
              values={{ val: snackbarStatus.email }}
            />
          )
        }
      />
      <Info>
        <FormattedMessage id="form.date" /> <span>{item?.date}</span>
      </Info>
      <Info>
        <FormattedMessage id="form.package" />
        <span>
          {item?.title} ({item?.secondaryTitle})
        </span>
      </Info>
      <Info>
        <FormattedMessage id="form.price" />
        <span>{item?.price} Є</span>
      </Info>
      <FormMain onSubmitForm={onSubmitReservation}>{children}</FormMain>
    </Container>
  );
}

export default FormReservation;
