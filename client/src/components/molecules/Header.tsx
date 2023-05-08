import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { Container, Grid } from "@mui/material";
import { Logo } from "../atoms";
import { ExitToApp } from "@mui/icons-material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
import { useLocation, useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { IProductSelected } from "../../interfaces";
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
  font-size: 1rem;
  margin-left: 1.1rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.black};
  white-space: nowrap;
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

const HeaderButtonContainer = styled(Grid)`
  display: flex;
  justify-content: flex-end;

  @media screen and (max-width: 900px) {
    justify-content: center;
  }
`;

const WrapperPageItems = styled.div`
  @media screen and (max-width: 600px) {
    flex-direction: column;
    justify-content: flex-around;
    align-items: center;
  }
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const productsSelected: IProductSelected[] = useSelector(
    (state: RootState) => state.products.productsSelected
  );
  const [productsSelectedAmount, setProductsSelectedAmount] =
    useState<number>(0);

  useEffect(() => {
    let amount: number = 0;
    productsSelected.map((item) => (amount += item.amount));
    setProductsSelectedAmount(amount);
  }, [productsSelected]);

  const pagesList = [
    { title: <FormattedMessage id="primary.products" />, link: "/products" },
    { title: <FormattedMessage id="primary.about" />, link: "/about" },
    {
      title: <FormattedMessage id="primary.my-profile" />,
      link: "/my-profile",
    },
    { title: <FormattedMessage id="primary.contacts" />, link: "/contacts" },
  ];
  return (
    <HeaderTopComponent>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Logo />
          </Grid>
          <Grid item xs={12} md={5}>
            <WrapperPageItems>
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
            </WrapperPageItems>
          </Grid>
          <HeaderButtonContainer item xs={12} md={4}>
            <ExitButton>
              <ExitIcon />
              <FormattedMessage id="primary.exit" />
            </ExitButton>
            <IconButton>
              <FavoritesIcon />
            </IconButton>
            <IconButtonBasket onClick={() => navigate("/basket")}>
              <BusketIcon />
              <ProductsAmount>{productsSelectedAmount}</ProductsAmount>
            </IconButtonBasket>
          </HeaderButtonContainer>
        </Grid>
      </Container>
    </HeaderTopComponent>
  );
}

export default Header;
