import React from "react";
import styled from "styled-components";
import { Container, Grid } from "@mui/material";
import { SearchField } from "../atoms";
import HeaderTop from "./HeaderTop";

const HeaderComponent = styled.div`
  background: ${(props) => props.theme.colors.lightGreen};
  padding: 1rem 0;
`;

function Header() {
  return (
    <>
      <HeaderTop />
      <HeaderComponent>
        <Container maxWidth="lg">
          <Grid container columnSpacing={{ xs: 1, sm: 2 }}>
            <Grid item xs={4}>
              <SearchField
                searchData={"someText"}
                setSearchData={() => {
                  console.log("search");
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </HeaderComponent>
    </>
  );
}

export default Header;
