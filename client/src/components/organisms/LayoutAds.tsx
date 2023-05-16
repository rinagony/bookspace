import React from "react";
import { Grid } from "@mui/material";
import { Layout } from "../organisms";
import { FormattedMessage } from "react-intl";
import { Title } from "../../assets/styled-components";

interface LayoutAdsProps {
  title: string;
  children: React.ReactNode;
}

function LayoutAds({ title, children }: LayoutAdsProps) {
  return (
    <Layout>
      <Title>
        <FormattedMessage id={title} />
      </Title>
      <Grid container columnSpacing={{ xs: 1, sm: 2 }}>
        <Grid item xs={12} lg={2}>
          Adds content
        </Grid>
        <Grid marginTop={"1rem"} item xs={12} lg={10}>
          {children}
        </Grid>
      </Grid>
    </Layout>
  );
}

export default LayoutAds;
