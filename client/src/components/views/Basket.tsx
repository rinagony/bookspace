import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { type RootState } from "../../redux/store";
import { Layout, ProductItem } from "../molecules";
import { ButtonComponent, NoData, SkeletonCard } from "../atoms";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";
import { Grid } from "@mui/material";
import { IInitialStateProducts, IProduct } from "../../interfaces";

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
  const productsSelected: IProduct[] = useSelector(
    (state: RootState) => state.products.productsSelected
  );

  const handleOnClick = (item: IProduct) => {
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
                  2
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
