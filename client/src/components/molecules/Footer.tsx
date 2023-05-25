import React from "react";
import styled from "styled-components";
import { Container, Grid } from "@mui/material";
import { Logo } from "../atoms";
import { FormattedMessage } from "react-intl";

const FooterComponent = styled.div`
  padding: 1rem 0 2rem 0;
  background: ${(props) => props.theme.colors.green100};
`;

const PrivacyWrapper = styled(Grid)`
  @media screen and (max-width: 900px) {
    text-align: center;
  }
  text-align: right;
  font-size: 0.7rem;
  letter-spacing: 0.1;
`;

function Footer() {
  return (
    <FooterComponent>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Logo />
          </Grid>
          <PrivacyWrapper item xs={12} md={6}>
            <FormattedMessage id="primary.privacy" />
          </PrivacyWrapper>
        </Grid>
      </Container>
    </FooterComponent>
  );
}

export default Footer;
