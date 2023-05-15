import React, { useState } from "react";
import styled from "styled-components";
import { FormHelperText, Grid, Input, InputLabel } from "@mui/material";
import { FormattedMessage } from "react-intl";
import { useForm } from "react-hook-form";
import { FormTypes } from "../../enums";
import { Dayjs } from "dayjs";
import { DateTimePicker } from "../atoms";

const FormComponent = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormItem = styled(Grid)`
  padding: 1rem;
`;

const InputComponent = styled(Input)`
  width: 100%;
`;

interface FormFieldsProps {
  onSubmitForm: (data: any, reset: any) => void;
  children: React.ReactNode;
  formType: FormTypes;
}

function FormMain({ onSubmitForm, children, formType }: FormFieldsProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [timePickerValue, setTimePickerValue] = useState<Dayjs | null>(null);

  const onHandle = (data: any) => {
    if (formType === FormTypes.bar) {
      data.calendar = timePickerValue;
      onSubmitForm(data, reset);
    }
    if (formType === FormTypes.packages) {
      onSubmitForm(data, reset);
    }
  };
  return (
    <FormComponent onSubmit={handleSubmit(onHandle)}>
      <Grid container>
        <FormItem item xs={6}>
          <InputLabel htmlFor="name">
            <FormattedMessage id="form.name" />
          </InputLabel>
          <InputComponent
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
        <FormItem item xs={6}>
          <InputLabel htmlFor="lastName">
            <FormattedMessage id="form.last-name" />
          </InputLabel>
          <InputComponent
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
        <FormItem item xs={6}>
          <InputLabel htmlFor="email">
            <FormattedMessage id="form.email" />
          </InputLabel>
          <InputComponent
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
        {formType === FormTypes.packages ? (
          <FormItem item xs={6}>
            <InputLabel htmlFor="phone">
              <FormattedMessage id="form.phone" />
            </InputLabel>
            <InputComponent
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
        ) : (
          false
        )}
        {formType === FormTypes.bar ? (
          <>
            <FormItem item xs={6}>
              <DateTimePicker
                value={timePickerValue}
                setValue={setTimePickerValue}
              />
            </FormItem>
            <FormItem item xs={6}>
              <InputLabel htmlFor="people">
                <FormattedMessage id="form.people" />
              </InputLabel>
              <InputComponent
                type="number"
                {...register("people", {
                  required: true,
                  min: 1,
                  max: 12,
                })}
              />
              {errors.people && errors.people.type === "required" && (
                <FormHelperText error>
                  <FormattedMessage id="form.people-validation-req" />
                </FormHelperText>
              )}
              {errors.people && errors.people.type === "min" && (
                <FormHelperText error>
                  <FormattedMessage id="form.people-validation-min" />
                </FormHelperText>
              )}
              {errors.people && errors.people.type === "max" && (
                <FormHelperText error>
                  <FormattedMessage id="form.people-validation-max" />
                </FormHelperText>
              )}
            </FormItem>
          </>
        ) : (
          false
        )}
      </Grid>
      {children}
    </FormComponent>
  );
}

export default FormMain;
