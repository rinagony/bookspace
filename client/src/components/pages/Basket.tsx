import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch, type RootState } from "../../redux/store";
import { Layout } from "../organisms";
import { ButtonComponent, NoData } from "../atoms";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";
import {
  Alert,
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
  Snackbar,
} from "@mui/material";
import { IProductSelected } from "../../interfaces";
import {
  getProductsFromBasket,
  removeProductFromBasket,
} from "../../redux/products/actions";
import { useNavigate } from "react-router-dom";

const ImageContainer = styled.div`
  width: 6rem;
  height: 100%;
  overflow: hidden;
  height: auto;
  border-radius: 5px;
  img {
    max-height: 200px;
    width: 100%;
  }
`;

const BasketContainer = styled.div`
  margin-top: 2rem;
`;

const Title = styled.h2`
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0;

  @media screen and (max-width: 500px) {
    margin: 0.8rem 0.3rem;
  }
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
  display: flex;
  justify-content: space-around;
  @media screen and (max-width: 500px) {
    text-align: center;
  }
  border-bottom: 1.5px solid ${(props) => props.theme.colors.green100};
`;

const Description = styled.div`
  margin-left: 1rem;
`;

function Basket() {
  const productsSelected: IProductSelected[] = useSelector(
    (state: RootState) => state.products.productsSelected
  );
  const [alert, setAlert] = useState(false);
  const dispatch = useAppDispatch();
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
            <ProductItem key={index} container>
              <ImageContainer>
                <img src={item.image} srcSet={item.image} alt={item.title} />
              </ImageContainer>
              <Description>
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
              </Description>
              <div>
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
              </div>
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
