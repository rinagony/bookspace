import React, { useState } from "react";
import styled from "styled-components";
import { ButtonComponent, Rating } from "../atoms";
import { Input, InputLabel, TextField } from "@mui/material";
import { Subtitle } from "../../assets/styled-components";
import { FormattedMessage } from "react-intl";

const ReviewComponent = styled.div`
  -webkit-box-shadow: 0px 1px 8px 0px rgba(0, 193, 196, 0.68);
  -moz-box-shadow: 0px 1px 8px 0px rgba(0, 193, 196, 0.68);
  box-shadow: 0px 1px 8px 0px rgba(0, 193, 196, 0.68);
  padding: 1.5rem;
  border-radius: 0.5rem;
  width: 100%;
`;

const HelperText = styled.p`
  color: ${(props) => props.theme.colors.red};
  font-size: 0.8rem;
  margin: 0;
`;

const TextareaComponent = styled(TextField)`
  margin-top: 1rem;
`;

const FieldItem = styled.div`
  margin: 1.5rem 0;
`;

interface LeaveReviewProps {
  rating: {
    votes: number[];
    value: number;
  };
  productTitle: string;
  onReview: (rating: number, value: string, name: string) => void;
}

function LeaveReview({ rating, onReview, productTitle }: LeaveReviewProps) {
  const [ratingValue, setRatingValue] = useState<{
    value: number;
    triggered: boolean;
  }>({
    value: 0,
    triggered: false,
  });
  const [reviewValue, setReviewValue] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [error, setError] = useState<{
    rate: boolean;
    text: boolean;
    name: boolean;
  }>({
    rate: false,
    name: false,
    text: false,
  });
  const handleOnSubmit = (event: any) => {
    event.preventDefault();
    if (!ratingValue.triggered) {
      setError({ ...error, rate: true });
      return;
    } 
    if (!reviewValue.length) {
      setError({ ...error, text: true });
      return;
    }
    if (!username.length) {
      setError({ ...error, name: true });
    } else {
      setError({ rate: false, text: false, name: false });
      onReview(ratingValue.value, reviewValue, username);
    }
  };
  return (
    <ReviewComponent>
      <Subtitle>
        <FormattedMessage
          values={{ val: productTitle }}
          id="primary.leave-review"
        />
      </Subtitle>
      <form onSubmit={handleOnSubmit}>
        <FieldItem>
          <Rating
            rate={ratingValue.value}
            onRate={(val: number) =>
              setRatingValue({ value: val, triggered: true })
            }
          />
          {error.rate ? (
            <HelperText>
              <FormattedMessage id="product.rating-req" />
            </HelperText>
          ) : null}
        </FieldItem>
        <FieldItem>
          <InputLabel htmlFor="username">
            <FormattedMessage id="form.name" />
          </InputLabel>
          <Input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
            {error.name && (
            <HelperText>
              <FormattedMessage id="product.name-req" />
            </HelperText>
          )}
        </FieldItem>
        <FieldItem>
          <InputLabel htmlFor="description">
            <FormattedMessage id="form.description" />
          </InputLabel>
          <TextareaComponent
            id="description"
            value={reviewValue}
            margin="dense"
            multiline
            fullWidth
            error={error.text}
            rows={4}
            onChange={(event) => setReviewValue(event.target.value)}
          />
          {error.text && (
            <HelperText>
              <FormattedMessage id="product.textarea-req" />
            </HelperText>
          )}
        </FieldItem>
        <ButtonComponent styles={{ marginTop: "1rem" }} typeButton="submit">
          <FormattedMessage id="products.send" />
        </ButtonComponent>
      </form>
    </ReviewComponent>
  );
}

export default LeaveReview;
