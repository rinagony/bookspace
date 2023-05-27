import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";

const WrapperRating = styled.div`
  display: flex;
  align-items: center;
`;

interface RatingProps {
  rate: number;
  onRate?: (val: number) => void;
  votes?: number[];
  size?: string;
  blockRate?: boolean;
}

function RatingComponent({
  rate,
  onRate,
  votes,
  size,
  blockRate = false,
}: RatingProps) {
  return (
    <Box
      sx={{
        "& > legend": { mt: 2 },
      }}
    >
      {!blockRate ? (
        <Typography component="legend" fontWeight={"600"}>
          {!onRate ? <FormattedMessage id="primary.rating" /> : null}
        </Typography>
      ) : null}
      <WrapperRating>
        <Rating
          size={size === 'small' ? 'small' : 'medium'}
          name="simple-controlled"
          value={rate}
          readOnly={blockRate}
          onChange={(event, newValue) => {
            newValue && onRate && onRate(newValue);
          }}
        />
        {votes ? (
          <span>({votes && votes.length ? votes.length : 0})</span>
        ) : null}
      </WrapperRating>
    </Box>
  );
}

export default RatingComponent;
