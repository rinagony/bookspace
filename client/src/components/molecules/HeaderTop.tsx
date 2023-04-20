import React, { useEffect } from "react";
import styled, { css } from "styled-components";
import { Container, Grid } from "@mui/material";
import { Logo } from "../atoms";
import { ExitToApp } from "@mui/icons-material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
import { useLocation, useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { IInitialStateProducts } from "../../interfaces";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

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

const IconButtonBasket = styled(IconButton)`
  position: relative;
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

const ProductsAmount = styled.div`
  position: absolute;
  width: 1rem;
  height: 1rem;
  border-radius: 0.5rem;
  right: 0;
  font-size: 0.8rem;
  top: 0;
  color: ${(props) => props.theme.colors.white};
  background: ${(props) => props.theme.colors.darkGreen};
`;

function HeaderTop() {
  const navigate = useNavigate();
  const location = useLocation();
  const productsState: IInitialStateProducts = useSelector(
    (state: RootState) => state.products
  );

  const pagesList = [
    { title: <FormattedMessage id="primary.products" />, link: "/products" },
    { title: "About", link: "/about" },
    { title: "My profile", link: "/my-profile" },
    { title: "Contacts", link: "/contacts" },
  ];
  return (
    <HeaderTopComponent>
      <Container maxWidth="lg">
        <Grid container spacing={12}>
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
              <FormattedMessage id="primary.exit" />
            </ExitButton>
            <IconButton>
              <FavoritesIcon />
            </IconButton>
            <IconButtonBasket onClick={() => navigate("/basket")}>
              <BusketIcon />
              <ProductsAmount>
                {productsState.productsSelected.length
                  ? productsState.productsSelected.length
                  : 0}
              </ProductsAmount>
            </IconButtonBasket>
          </Grid>
        </Grid>
      </Container>
    </HeaderTopComponent>
  );
}

export default HeaderTop;
