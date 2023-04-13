import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import { Container } from "@mui/material";

const HeaderComponent = styled(Container)`
    padding: 1rem 0;
`;

function Header() {
  return (
    <HeaderComponent>
      <Container maxWidth="sm">
        Header
      </Container>
    </HeaderComponent>
  );
}

export default Header;
