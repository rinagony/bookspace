import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { type RootState } from "../../redux/store";
import { Layout } from "../molecules";
import { ButtonComponent, NoData } from "../atoms";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";
import {
  Alert,
  Box,
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
  Snackbar,
} from "@mui/material";
import { IProductSelected } from "../../interfaces";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import {
  getProductsFromBasket,
  removeProductFromBasket,
} from "../../redux/products/actions";
import { useNavigate } from "react-router-dom";

const ImageContainer = styled(Grid)`
  width: 6rem;
  height: 100%;
  overflow: hidden;
  height: auto;
  border-radius: 5px;
  img {
    height: 200px;
  }
`;

const BasketContainer = styled.div`
  margin-top: 2rem;
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

const ProductItem = styled(Grid)`
  padding: 1.5rem 0;
  justify-content: center;
  border-bottom: 1.5px solid ${(props) => props.theme.colors.green100};
`;

const BoxComponent = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400;
  bgcolor: background.paper;
  border: 2px solid #000;
  boxshadow: 24;
  p: 4;
`;

function Basket() {
  const productsSelected: IProductSelected[] = useSelector(
    (state: RootState) => state.products.productsSelected
  );
  const [alert, setAlert] = useState(false);
  const dispatch = useDispatch<ThunkDispatch<RootState, void, AnyAction>>();
  const [modal, setModal] = useState<{
    show: boolean;
    item: IProductSelected | null;
  }>({
    show: false,
    item: null,
  });
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProductsFromBasket());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = () => {
    setModal({
      show: false,
      item: null,
    });
  };

  const handleOnRemove = () => {
    if (modal.item) {
      dispatch(removeProductFromBasket(modal.item)).then(() => {
        dispatch(getProductsFromBasket());
        handleClose();
        setAlert(true);
      });
    }
  };

  return (
    <Layout>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        open={alert}
        autoHideDuration={3000}
        onClose={() => setAlert(false)}
      >
        <Alert
          onClose={() => setAlert(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          <FormattedMessage id="product.removed" />
        </Alert>
      </Snackbar>
      {!productsSelected.length ? (
        <NoData message="basket.empty">
          <ButtonComponent
            typeButton="button"
            onClick={() => navigate("/products")}
          >
            <FormattedMessage id="primary.shopping" />
          </ButtonComponent>
        </NoData>
      ) : (
        <BasketContainer>
          {productsSelected.map((item, index) => (
            <ProductItem key={index} margin={2} container>
              <ImageContainer sm={4} container justifyContent={"flex-start"}>
                <img src={item.image} srcSet={item.image} alt={item.title} />
              </ImageContainer>
              <Grid sm={4}>
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
              </Grid>
              <Grid sm={4} container justifyContent={"flex-end"}>
                <ButtonComponent
                  onClick={() => setModal({ show: true, item })}
                  styles={{
                    marginTop: "1.5rem",
                    height: "2rem",
                    background: "#ff8282",
                  }}
                  typeButton="button"
                >
                  <FormattedMessage id="primary.remove" />
                </ButtonComponent>
              </Grid>
            </ProductItem>
          ))}
        </BasketContainer>
      )}

      <Dialog
        open={modal.show}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to remove "{modal.item?.title}" in amount of
          {modal.item?.amount}?
        </DialogTitle>
        <DialogActions>
          <ButtonComponent
            typeButton="button"
            styles={{ background: "#ff8282" }}
            onClick={handleOnRemove}
          >
            <FormattedMessage id="primary.remove" />
          </ButtonComponent>
          <ButtonComponent typeButton="button" onClick={handleClose}>
            <FormattedMessage id="primary.back" />
          </ButtonComponent>
        </DialogActions>
      </Dialog>
    </Layout>
  );
}

export default Basket;
