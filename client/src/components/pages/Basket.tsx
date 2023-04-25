import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { type RootState } from "../../redux/store";
import { Layout } from "../molecules";
import { ButtonComponent, NoData } from "../atoms";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";
import { Grid } from "@mui/material";
import { IProductSelected } from "../../interfaces";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { getProductsFromBasket } from "../../redux/products/actions";

const ProductList = styled(Grid)`
  margin-top: 2rem;
`;

const ImageContainer = styled.div`
  width: 6rem;
  height: 100%;
  overflow: hidden;
  height: auto;
  border-radius: 5px;
`;

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
`;

const Paragraph = styled.p`
  margin-top: 10px;
  margin-bottom: 0;
  margin-left: 0;
  margin-right: 0;
  color: ${(props) => props.theme.colors.darkGreen};
  font-size: 1.1rem;
  span {
    color: ${(props) => props.theme.colors.black};
    font-weight: 600;
  }
`;

function Basket() {
  const productsSelected: IProductSelected[] = useSelector(
    (state: RootState) => state.products.productsSelected
  );
  const dispatch = useDispatch<ThunkDispatch<RootState, void, AnyAction>>();

  useEffect(() => {
    dispatch(getProductsFromBasket())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnClick = (item: IProductSelected) => {
    console.log("remove", item);
  };

  return (
    <Layout>
      {!productsSelected ? (
        <NoData />
      ) : (
        <ProductList marginTop={2} container spacing={2}>
          {productsSelected.map((item, index) => (
            <Grid
              key={index}
              margin={5}
              item
              display={"flex"}
              width={"100%"}
              justifyContent={"space-around"}
            >
              <ImageContainer>
                <img
                  width={"100%"}
                  src={item.image}
                  srcSet={item.image}
                  alt={item.title}
                />
              </ImageContainer>
              <div>
                <Title>{item.title}</Title>
                <Paragraph>
                  <span>
                    <FormattedMessage id="products.price" />
                  </span>
                  {item.price} €
                </Paragraph>
                <Paragraph>
                  <span>
                    <FormattedMessage id="products.amount" />
                  </span>
                  {item.amount}
                </Paragraph>
              </div>
              <ButtonComponent
                onClick={() => handleOnClick(item)}
                styles={{ marginTop: "1.5rem" }}
                typeButton="button"
              >
                Remove
              </ButtonComponent>
            </Grid>
          ))}
        </ProductList>
      )}
    </Layout>
  );
}

export default Basket;
