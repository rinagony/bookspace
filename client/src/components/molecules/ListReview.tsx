import React from "react";
import styled from "styled-components";
import { Rating } from "../atoms";
import { FormattedMessage } from "react-intl";
import { IReview } from "../../interfaces";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";

const ListReviewComponent = styled.div`
  border: 1px solid ${(props) => props.theme.colors.white};
  padding: 0.5rem;
  border-radius: 0.5rem;
  width: 100%;
  margin-top: 2rem;
`;

const Name = styled.p`
  margin-top: 0;
  margin-left: 1rem;
  margin-bottom: 0.1rem;
  font-size: 1.1rem;
  font-weight: 600;
`;

const Time = styled.p`
  font-size: 0.7rem;
  margin-left: 1rem;
  margin-top: 0.4rem;
  margin-left: 1rem;
  margin-botton: 0.3rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.white};
`;

const ItemReview = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1.5rem;
  width: 100%;
  align-items: flex-start;
`;

const Description = styled.p`
  font-weight: 500;
  margin-top: 1rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.white};
`;

const RatingWrapper = styled.div`
  margin-left: 2.2rem;
`;

const NameWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const HeaderReview = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

interface ListReviewProps {
  data: IReview[];
}

function ListReview({ data }: ListReviewProps) {
  return (
    <ListReviewComponent>
      {data && data.length ? (
        data.map((item, index) => (
          <ItemReview key={index}>
            <HeaderReview>
              <SentimentSatisfiedAltIcon />
              <NameWrapper>
                <Name>{item.username}</Name>
                <Time>{item.time}</Time>
              </NameWrapper>
            </HeaderReview>

            <RatingWrapper>
              <Rating rate={item.vote} blockRate size="small" />
            </RatingWrapper>
            <Description>{item.text}</Description>
          </ItemReview>
        ))
      ) : (
        <FormattedMessage id="primary.no-reviews" />
      )}
    </ListReviewComponent>
  );
}

export default ListReview;
