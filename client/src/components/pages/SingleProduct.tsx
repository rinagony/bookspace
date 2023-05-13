import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { type RootState } from "../../redux/store";
import { Layout } from "../organisms";
import { useParams } from "react-router-dom";
import { Alert, ButtonComponent, NoData } from "../atoms";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";
import { Grid } from "@mui/material";
import { IProduct } from "../../interfaces";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  addProductToBasket,
  getProductsFromBasket,
} from "../../redux/products/actions";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";

const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  height: 25rem;
  border-radius: 5px;
  padding-left: 0;

  img {
    width: 100%;
    transition: transform 0.3s;
  }

  img:hover {
    transform: scale(1.2);
  }

  @media screen and (max-width: 600px) {
    height: 300px;
  }
`;

const ProductContainer = styled(Grid)`
  display: flex;
  padding-top: 2rem;
  justify-content: center;
  @media screen and (max-width: 600px) {
    flex-direction: column !important;
    align-items: center;
    width: 100%;
    padding: 0 1rem;
  }
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

const InfoContainer = styled(Grid)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ButtonsContainer = styled(Grid)`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin-top: 1.5rem;
`;

function SingleProduct() {
  const { id } = useParams();
  const products: IProduct[] = useSelector(
    (state: RootState) => state.products.products
  );
  const [productSelected, setProductSelected] = useState<IProduct | undefined>(
    undefined
  );
  const [alert, setAlert] = useState(false);
  const dispatch = useDispatch<ThunkDispatch<RootState, void, AnyAction>>();

  useEffect(() => {
    const productItem: IProduct | undefined = products.find(
      (item: IProduct) => item.id === id
    );

    if (productItem) {
      setProductSelected(productItem);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, products]);

  const handleOnAdd = () => {
    if (productSelected) {
      dispatch(addProductToBasket(productSelected)).then(() => {
        dispatch(getProductsFromBasket());
      });
      setAlert(true);
    }
  };

  return (
    <Layout>
      <Alert alert={alert} setAlert={setAlert} message={<FormattedMessage id="product.added" />} />
      {!productSelected ? (
        <NoData />
      ) : (
        <ProductContainer container item columnSpacing={{ xs: 1, sm: 3 }}>
          <Grid item sm={4}>
            <ImageContainer>
              <img
                src={productSelected.image}
                srcSet={productSelected.image}
                alt={productSelected.title}
              />
            </ImageContainer>
          </Grid>
          <InfoContainer item container sm={4}>
            <Grid>
              <Title>{productSelected.title}</Title>
              <Paragraph>
                <span>
                  <FormattedMessage id="category" />
                </span>
                {productSelected.category}
              </Paragraph>
              <Paragraph>{productSelected.description}</Paragraph>
              <Paragraph>
                <span>
                  <FormattedMessage id="products.in-stock" />
                </span>
                {productSelected.inStock ? "Yes" : "No"}
              </Paragraph>
              <Paragraph>
                <span>
                  <FormattedMessage id="products.price" />
                </span>
                {productSelected.price} €
              </Paragraph>
            </Grid>
            <ButtonsContainer>
              <ButtonComponent
                styles={{
                  borderRadius: "5px",
                  marginRight: "0.5rem",
                  height: "2.8rem",
                }}
                onClick={handleOnAdd}
                typeButton="button"
              >
                <FormattedMessage id="products.add" />
              </ButtonComponent>
              <ButtonComponent
                styles={{
                  background: "pink",
                  borderRadius: "5px",
                  marginLeft: "0.5rem",
                  height: "2.8rem",
                }}
                onClick={() => {}}
                typeButton="button"
              >
                <FormattedMessage id="products.favorites" />
                <FavoriteIcon fontSize="small" />
              </ButtonComponent>
            </ButtonsContainer>
          </InfoContainer>
        </ProductContainer>
      )}
    </Layout>
  );
}

export default SingleProduct;
