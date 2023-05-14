import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import React from "react";

interface ButtonPropsInterface {
  setValue: (value: Dayjs | null) => void;
  value: Dayjs | null;
}

function Calendar({ setValue, value }: ButtonPropsInterface) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        value={value}
        disablePast
        sx={[
          {
            ".Mui-selected": {
              backgroundColor: `#b2dfdb !important`,
            },
          },
        ]}
        onChange={(value: Dayjs | null) => setValue(value)}
      />
    </LocalizationProvider>
  );
}

export default Calendar;
