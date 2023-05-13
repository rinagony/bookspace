import React from "react";
import { Container } from "@mui/material";
import styled from "styled-components";
import { Footer, Header } from "../molecules";

interface LayoutPropsInterface {
  children: React.ReactNode;
}

const ContainerComponent = styled(Container)`
  padding-top: 2rem;
  padding-bottom: 4rem;
  min-height: 81vh;
`;

function Layout({ children }: LayoutPropsInterface) {
  return (
    <>
      <Header />
      <ContainerComponent maxWidth="lg">{children}</ContainerComponent>
      <Footer />
    </>
  );
}

export default Layout;
