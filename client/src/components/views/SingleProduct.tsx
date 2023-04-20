import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { type RootState } from "../../redux/store";
import { Layout } from "../molecules";
import { useParams } from "react-router-dom";
import { ButtonComponent, NoData } from "../atoms";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";
import { Alert, Grid, Snackbar } from "@mui/material";
import { IProduct } from "../../interfaces";
import { setProductsSelected } from "../../redux/products/slice";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { addProductToBasket } from "../../redux/products/actions";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";

const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  height: 25rem;
  border-radius: 5px;

  img {
    width: 100%;
    transition: transform 0.3s;
  }

  img:hover {
    transform: scale(1.2);
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

function SingleProduct() {
  const { id } = useParams();
  const products: IProduct[] = useSelector(
    (state: RootState) => state.products.products
  );
  const [productSelected, setProductSelected] = useState<IProduct | undefined>(
    undefined
  );
  const [alert, setAlert] = useState(false)
  const dispatch = useDispatch<ThunkDispatch<RootState, void, AnyAction>>();

  useEffect(() => {
    const productItem: IProduct | undefined = products.find(
      (item: IProduct) => item.id === id
    );
    if (productItem) setProductSelected(productItem);
  }, [id, products]);

  const handleOnAdd = () => {
    if(productSelected) {
      dispatch(addProductToBasket(productSelected));
      setAlert(true)
    }
  };

  return (
    <Layout>
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={alert} autoHideDuration={3000} onClose={() => setAlert(false)}>
        <Alert onClose={() => setAlert(false)} severity="success" sx={{ width: '100%' }}>
         <FormattedMessage id="product.added" />
        </Alert>
      </Snackbar>
        {!productSelected ? (
          <NoData />
        ) : (
          <Grid
            container
            display={"flex"}
            justifyContent={"center"}
            columnSpacing={{ xs: 1, sm: 3 }}
          >
            <Grid item xs={4}>
              <ImageContainer>
                <img
                  width={"100%"}
                  src={productSelected.image}
                  srcSet={productSelected.image}
                  alt={productSelected.title}
                />
              </ImageContainer>
            </Grid>
            <Grid
              item
              xs={4}
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"space-between"}
            >
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
              <Grid display={"flex"} justifyContent={"space-between"}>
                <ButtonComponent onClick={handleOnAdd} typeButton="button">
                  <FormattedMessage id="products.add" />
                </ButtonComponent>
                <ButtonComponent
                  styles={{ background: "pink" }}
                  onClick={() => {}}
                  typeButton="button"
                >
                  <FormattedMessage id="products.favorites" />
                  <FavoriteIcon fontSize="small" />
                </ButtonComponent>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Layout>
  );
}

      export default SingleProduct;
