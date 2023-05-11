import React from "react";
import styled, { css } from "styled-components";
import { Container, Grid } from "@mui/material";
import { Logo, Navigation } from "../atoms";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
import { useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { IProductSelected } from "../../interfaces";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import LoginIcon from '@mui/icons-material/Login';

const HeaderTopComponent = styled.div`
  padding: 1rem 0;
  background: ${(props) => props.theme.colors.green100};
`;

const iconStyles = css`
  color: ${(props) => props.theme.colors.darkGreen};
  font-size: 4rem;
  margin-right: 0.5rem;
`;

const LoginIconComponent = styled(LoginIcon)`
  ${iconStyles}
`;

const FavoritesIcon = styled(FavoriteBorderOutlinedIcon)`
  ${iconStyles}
`;

const BasketIcon = styled(ShoppingBasketOutlinedIcon)`
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

function HeaderComponent() {
  const navigate = useNavigate();
  const productsSelectedAmount: number = useSelector(
    (state: RootState) => state.products.productsSelected.reduce((acc, item) => item.amount + acc, 0)
  );

  return (
    <HeaderTopComponent>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Logo />
          </Grid>
          <Grid item xs={12} md={5}>
            <Navigation />
          </Grid>
          <HeaderButtonContainer item xs={12} md={4}>
            <ExitButton>
              <LoginIconComponent />
              <FormattedMessage id="primary.login" />
            </ExitButton>
            <IconButton>
              <FavoritesIcon />
            </IconButton>
            <IconButtonBasket onClick={() => navigate("/basket")}>
              <BasketIcon />
              <ProductsAmount>{productsSelectedAmount}</ProductsAmount>
            </IconButtonBasket>
          </HeaderButtonContainer>
        </Grid>
      </Container>
    </HeaderTopComponent>
  );
}

const Header = React.memo(HeaderComponent)

export default Header;
