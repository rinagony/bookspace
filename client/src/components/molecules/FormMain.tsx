import React from "react";
import styled from "styled-components";
import { FormHelperText, Grid, Input, InputLabel } from "@mui/material";
import { FormattedMessage } from "react-intl";
import { useForm } from "react-hook-form";

const FormItem = styled.div`
  padding: 1rem;
`;

interface FormFieldsProps {
  onSubmitForm: (data: any, reset: any) => void;
  children: React.ReactNode;
}

function FormMain({ onSubmitForm, children }: FormFieldsProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onHandle = (data: any) => {
    onSubmitForm(data, reset);
  };
  return (
    <form onSubmit={handleSubmit(onHandle)}>
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
        <Grid item justifyContent={'center'} xs={6}>
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
  );
}

export default FormMain;
