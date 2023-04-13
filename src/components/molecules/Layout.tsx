import React from "react";
import styled from "styled-components";
import Header from "./Header";
import { Container } from "@mui/material";

interface ComponentProviderInterface {
  children: React.ReactNode;
}

function Layout({ children }: ComponentProviderInterface) {
  return (
    <>
      <Header />
      <Container maxWidth="lg">{children}</Container>
    </>
  );
}

export default Layout;
