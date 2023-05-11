import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { SelectChangeEvent } from "@mui/material";
import Select from "@mui/material/Select";
import { useState } from "react";

interface FilterFieldProps {
  handleFilterData: (dataToFilter: string) => void;
}

function SelectComponent({ handleFilterData }: FilterFieldProps) {
  const [defaultValue, setDefaultValue] = useState<string>('All')
  const menuItems = ["All", "Self-help", "Fantastique", "Romance", "Science", "Education"];
  const handleSelect = (event: SelectChangeEvent) => {
    setDefaultValue(event.target.value as string);
    handleFilterData(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{defaultValue}</InputLabel>
        <Select
          size="small"
          value={defaultValue}
          label={defaultValue}
          onChange={handleSelect}
        >
          {menuItems.map((item, index) => (
            <MenuItem key={index} value={item}>{item}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

export default SelectComponent;
