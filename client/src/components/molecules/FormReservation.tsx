import React, { useState } from "react";
import { FormHelperText, Grid, Input, InputLabel } from "@mui/material";
import styled from "styled-components";
import { IPackage, IReservationInfo } from "../../interfaces";
import { useForm } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import { useDispatch } from "react-redux";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { addReservation } from "../../redux/about/actions";
import { RootState } from "../../redux/store";
import { Alert } from "../atoms";

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

const FormItem = styled.div`
  padding: 1rem;
`;

function FormReservation({ item, children }: FormReservationProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [snackbarStatus, setSnackbarStatus] = useState<{
    show: boolean;
    error: boolean;
    email?: string;
  }>({ show: false, error: false });

  const dispatch = useDispatch<ThunkDispatch<RootState, void, AnyAction>>();

  const onSubmitReservation = (data: any) => {
    if (item) {
      const reservationInfo: IReservationInfo = {
        packageTitle: item.title,
        email: data.email,
        lastName: data.lastName,
        name: data.name,
        date: item.date,
        phone: data.phone,
      };
      dispatch(addReservation(reservationInfo))
        .then(() => {
          setSnackbarStatus({ show: true, error: false, email: data.email })
          reset();
        }
        )
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
          snackbarStatus.error
            ? <FormattedMessage id="error.occured"/>
            : <FormattedMessage id="form.sent" values={{val: snackbarStatus.email}}/> 
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
      <form onSubmit={handleSubmit(onSubmitReservation)}>
        <Grid container>
          <Grid item xs={6}>
            <FormItem>
              <InputLabel htmlFor="name">
                <FormattedMessage id="form.name" />
              </InputLabel>
              <Input
                type="text"
                {...register("name", {
                  required: true,
                })}
              />
              {errors.name && errors.name.type === "required" && (
                <FormHelperText error>
                  <FormattedMessage id="form.name-validation-req" />
                </FormHelperText>
              )}
            </FormItem>
            <FormItem>
              <InputLabel htmlFor="lastName">
                <FormattedMessage id="form.last-name" />
              </InputLabel>
              <Input
                type="text"
                {...register("lastName", {
                  required: true,
                })}
              />
              {errors.lastName && errors.lastName.type === "required" && (
                <FormHelperText error>
                  <FormattedMessage id="form.last-name-validation-req" />
                </FormHelperText>
              )}
            </FormItem>
          </Grid>
          <Grid item xs={6}>
            <FormItem>
              <InputLabel htmlFor="email">
                <FormattedMessage id="form.email" />
              </InputLabel>
              <Input
                type="email"
                {...register("email", {
                  required: true,
                  pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                })}
              />
              {errors.email && errors.email.type === "required" && (
                <FormHelperText error>
                  <FormattedMessage id="form.email-validation-req" />
                </FormHelperText>
              )}
              {errors.email && errors.email.type === "pattern" && (
                <FormHelperText error>
                  <FormattedMessage id="form.email-validation-pattern" />
                </FormHelperText>
              )}
            </FormItem>
            <FormItem>
              <InputLabel htmlFor="phone">
                <FormattedMessage id="form.phone" />
              </InputLabel>
              <Input
                type="phone"
                {...register("phone", {
                  required: true,
                  pattern: /^\+?[1-9][0-9]{7,14}$/,
                })}
              />
              {errors.phone && errors.phone.type === "required" && (
                <FormHelperText error>
                  <FormattedMessage id="form.phone-validation-req" />
                </FormHelperText>
              )}
              {errors.phone && errors.phone.type === "pattern" && (
                <FormHelperText error>
                  <FormattedMessage id="form.phone-validation-pattern" />
                </FormHelperText>
              )}
            </FormItem>
          </Grid>
        </Grid>
        {children}
      </form>
    </Container>
  );
}

export default FormReservation;
