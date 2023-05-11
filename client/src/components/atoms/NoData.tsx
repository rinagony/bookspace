import React from "react";
import { Container } from "@mui/material";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";

const NoDataComponent = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  h2 {
    text-align: center;
    color: ${(props) => props.theme.colors.darkGreen};
  }
`;

interface NoDataProps {
  message?: string;
  children?: React.ReactNode;
}

function NoData({message, children}: NoDataProps) {
  return (
    <NoDataComponent>
      <h2>
        <FormattedMessage id={message ? message : "primary.no-data"} />
      </h2>
      {children ? children : false}
    </NoDataComponent>
  );
}

export default NoData;
