import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import React, { useState } from "react";

interface ButtonPropsInterface {
  setValue: (value: Dayjs | null) => void;
  value: Dayjs | null;
}

function DateTimePickerComponent({ setValue, value }: ButtonPropsInterface) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        disablePast
        defaultValue={value}
        onChange={(newValue: any) => setValue(newValue)}
      />
    </LocalizationProvider>
  );
}

export default DateTimePickerComponent;
