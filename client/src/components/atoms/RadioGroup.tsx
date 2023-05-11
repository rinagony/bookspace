import React from "react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import styled from "styled-components";
import { teal } from "@mui/material/colors";

interface RadioGroupProps {
  type: string;
  options: string[];
  onChange: (option: string) => void;
}

const FormControlLabelComponent = styled(FormControl)`
  span {
    font-size: 0.8rem;
  }
`;

function RadioGroupComponent({ type, options, onChange }: RadioGroupProps) {
  const onChangeRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange((event.target as HTMLInputElement).value);
  };
  return (
    <FormControlLabelComponent>
      <FormLabel id="radio-buttons"></FormLabel>
      <RadioGroup
        aria-labelledby={type}
        name="radio-buttons-group"
        onChange={onChangeRadio}
      >
        {options.map((option, index) => (
          <FormControlLabel
            key={index}
            value={option}
            control={
              <Radio
                sx={{
                  color: teal[900],
                  fontSize: 10,
                  "&.Mui-checked": {
                    color: teal[900],
                  },
                  checkboxLabel: {
                    fontSize: 40,
                  },
                }}
              />
            }
            label={option}
          />
        ))}
      </RadioGroup>
    </FormControlLabelComponent>
  );
}

export default RadioGroupComponent;
