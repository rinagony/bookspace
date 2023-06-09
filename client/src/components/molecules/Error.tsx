import React from "react";
import Layout from "../organisms/Layout";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";

interface AlertComponentProps {
  errorMessage?: string;
}

const ErrorText = styled.p`
  text-align: center;
`;

function AlertComponent({ errorMessage }: AlertComponentProps) {
  return (
    <Layout>
      <ErrorText>
        <FormattedMessage id="error.reload" />
        {errorMessage ? ": " + errorMessage : "."}
      </ErrorText>
    </Layout>
  );
}

export default AlertComponent;
