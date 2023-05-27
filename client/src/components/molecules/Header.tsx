import React, { useState } from "react";
import styled, { css } from "styled-components";
import { Grid } from "@mui/material";
import { Logo, Navigation } from "../atoms";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
import { useLocation, useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import LoginIcon from "@mui/icons-material/Login";
import HeaderAds from "./HeaderAds";

const HamburgerNav = styled.div`
  height: 0px;
  opacity: 0;
  visibility: hidden;
  transition: all 0.5s;
  transition: height 0.2s;

  &.active {
    height: 10rem;
    opacity: 1;
    visibility: visible;
  }
`;

const WrapperButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const OpenMenu = styled.button`
  background: inherit;
  border: none;
  .bar1,
  .bar2,
  .bar3 {
    width: 21px;
    height: 3px;
    background-color: ${(props) => props.theme.colors.darkGreen};
    margin: 6px 0;
    transition: 0.4s;
  }

  &.open {
    .bar1 {
      transform: translate(0, 9px) rotate(-45deg);
    }
    .bar2 {
      opacity: 0;
    }
    .bar3 {
      transform: translate(0, -9px) rotate(45deg);
    }
  }
`;

const WrapperMobile = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderTopComponent = styled.div`
  padding: 1rem;
  background: ${(props) => props.theme.colors.green100};
  overflow: hidden;
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
  color: ${(props) => props.theme.colors.darkGreen};
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

const HeaderMobile = styled.div`
  position: fixed;
  z-index: 10;
  top: 2.2rem;
  width: 100%;
  display: none;
  @media screen and (max-width: 900px) {
    display: block;
  }
`;

const Header = styled(HeaderTopComponent)`
  padding: 1rem 3.5rem;
  @media screen and (max-width: 900px) {
    display: none;
  }
`;

function HeaderComponent() {
  const navigate = useNavigate();
  const location = useLocation();
  const productsSelectedAmount: number = useSelector((state: RootState) =>
    state.products.productsSelected.reduce((acc, item) => item.amount + acc, 0)
  );
  const [showMobileNav, setShowMobileNav] = useState<boolean>(false);
  const toggleMobileNav = () => {
    setShowMobileNav((prev) => !prev);
  };

  return (
    <>
      {location.pathname === "/products" ? (
        <HeaderAds announce="The last chance to get 2 books and get one more book for free with promocode SUMMER20!!!" />
      ) : null}
      <Header>
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
      </Header>
      <HeaderMobile style={{top: location.pathname === "/products" ? "2.2rem" : "0" }}>
        <HeaderTopComponent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <WrapperMobile>
                <Logo />
                <WrapperButtons>
                  <IconButton>
                    <FavoritesIcon />
                  </IconButton>
                  <IconButtonBasket onClick={() => navigate("/basket")}>
                    <BasketIcon />
                    <ProductsAmount>{productsSelectedAmount}</ProductsAmount>
                  </IconButtonBasket>
                </WrapperButtons>
                <OpenMenu
                  onClick={toggleMobileNav}
                  className={showMobileNav ? "open" : ""}
                >
                  <div className="bar1"></div>
                  <div className="bar2"></div>
                  <div className="bar3"></div>
                </OpenMenu>
              </WrapperMobile>
              <HamburgerNav className={showMobileNav ? "active" : ""}>
                <Navigation />
              </HamburgerNav>
            </Grid>
          </Grid>
        </HeaderTopComponent>
      </HeaderMobile>
    </>
  );
}

export default HeaderComponent;
