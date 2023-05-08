import React from "react";
import { FormHelperText, Grid, Input, InputLabel } from "@mui/material";
import styled from "styled-components";
import { IPackage } from "../../interfaces";
import { useForm } from "react-hook-form";
import { FormattedMessage } from "react-intl";

interface FormReservationProps {
  item: IPackage | null;
  children: React.ReactNode;
}

const Container = styled.div`
  padding-top: 2rem 1rem;
`;

const FormItem = styled.div`
  padding: 1rem;
`;

function FormReservation({ item, children }: FormReservationProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmitReservation = (data: any) => {
    console.log("onSubmitFomr", data);
  };
  return (
    <Container>
      <p>
        <FormattedMessage id="form.date" /> <span>{item?.date}</span>
      </p>
      <p>
        <FormattedMessage id="form.package" />
        <span>
          {item?.title} ({item?.secondaryTitle})
        </span>
      </p>
      <p>
        <FormattedMessage id="form.packacge" />
        <FormattedMessage id="form.price" />
        <span>{item?.price}</span>
      </p>
      <h3>
        <FormattedMessage id="form.reservation-title" />
      </h3>
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
          <Grid xs={6}>
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
                  pattern: /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
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
