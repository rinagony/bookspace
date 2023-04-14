import React from "react";
import styled, { css } from "styled-components";
import { Container, Grid } from "@mui/material";
import { Logo } from "../atoms";
import { ExitToApp } from "@mui/icons-material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
import { useLocation, useNavigate } from "react-router-dom";

const HeaderTopComponent = styled.div`
  padding: 1rem 0;
  background: ${(props) => props.theme.colors.green100};
`;

const iconStyles = css`
  color: ${(props) => props.theme.colors.darkGreen};
  font-size: 4rem;
  margin-right: 0.5rem;
`;

const ExitIcon = styled(ExitToApp)`
  ${iconStyles}
`;

const FavoritesIcon = styled(FavoriteBorderOutlinedIcon)`
  ${iconStyles}
`;

const BusketIcon = styled(ShoppingBasketOutlinedIcon)`
  ${iconStyles}
`;

const IconButton = styled.button`
  display: flex;
  flex-direction: row;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  align-items: center;
  background: inherit;
  justify-content: center;
`;

const PageItem = styled.a`
  color: ${(props) => props.theme.colors.black};
  font-weight: 600;
  cursor: pointer;
  font-size: 1.2rem;
  margin-left: 1.2rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.black};
`;

const ExitButton = styled(IconButton)`
  margin-right: 2rem;
`;

function HeaderTop() {
  const navigate = useNavigate();
  const location = useLocation();
  const pagesList = [
    { title: "About", link: "/about" },
    { title: "Products", link: "/products" },
    { title: "My profile", link: "/my-profile" },
    { title: "Contacts", link: "/contacts" },
  ];
  return (
    <HeaderTopComponent>
      <Container maxWidth="lg">
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1 }}>
          <Grid item xs={12} lg={3}>
            <Logo />
          </Grid>
          <Grid item xs={12} lg={5} justifyContent="center" display="flex">
            {pagesList.map((item, index) => (
              <PageItem
                style={
                  item.link === location.pathname
                    ? { color: "#004d40" }
                    : { color: "#212121" }
                }
                key={index}
                onClick={() => navigate(item.link)}
              >
                {item.title}
              </PageItem>
            ))}
          </Grid>
          <Grid item xs={12} lg={4} display="flex" justifyContent="flex-end">
            <ExitButton>
              <ExitIcon />
              Exit
            </ExitButton>
            <IconButton>
              <FavoritesIcon />
            </IconButton>
            <IconButton>
              <BusketIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Container>
    </HeaderTopComponent>
  );
}

export default HeaderTop;
