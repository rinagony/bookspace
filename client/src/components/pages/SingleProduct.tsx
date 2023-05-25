import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch, type RootState } from "../../redux/store";
import { Layout } from "../organisms";
import { useParams } from "react-router-dom";
import { Alert, ButtonComponent, NoData, Rating } from "../atoms";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";
import { Grid } from "@mui/material";
import { IProduct, IProductRatingPost } from "../../interfaces";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  addProductToBasket,
  getAllProductsAction,
  getProductsFromBasket,
  updateProductRating,
} from "../../redux/products/actions";
import { LeaveReview, ListReview } from "../molecules";
import dayjs from "dayjs";

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
  justify-content: flex-start;
  align-items: flex-end;
  margin-top: 1.5rem;
`;

const ReviewButton = styled.button`
  font-weight: 600;
  font-size: 1.1rem;
  text-decoration: underline;
  cursor: pointer;
  margin-top: 1rem;
  padding: 0;
  background: inherit;
  border: none;
`;

function SingleProduct() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const products: IProduct[] = useSelector(
    (state: RootState) => state.products.products
  );
  const [productSelected, setProductSelected] = useState<IProduct | undefined>(
    undefined
  );
  const [showReview, setShowReview] = useState<boolean>(false);
  const [alert, setAlert] = useState<{show: boolean, type: string}>({show: false, type: ''});
  const productContainerRef = useRef<HTMLDivElement>(null);
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
      setAlert({show: true, type: 'add'});
    }
  };

  const onReview = (vote: number, review: string, name: string) => {
    setShowReview(false);
    if (productSelected) {
      const productNewRating: IProductRatingPost = {
        id: productSelected.id,
        vote: vote,
        review: {
          text: review,
          time: dayjs().toString(),
          username: name,
          vote: vote,
        },
      };
      dispatch(updateProductRating(productNewRating))
        .then(() => dispatch(getAllProductsAction()));
    }
  };

  const HandleonOpenReview = () => {
    setShowReview(true);
    if (productContainerRef.current) {
      productContainerRef.current.scrollIntoView();
    }
  };

  return (
    <Layout>
      <Alert
        alert={alert.show}
        setAlert={setAlert}
        message={<FormattedMessage id={alert.type === 'add' ? "product.added" : 'review.sent'}/>}
      />
      {!productSelected ? (
        <NoData />
      ) : (
        <>
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
                <Rating
                  votes={productSelected.rating.votes}
                  rate={productSelected.rating.value}
                  blockRate
                />
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
                <ReviewButton onClick={HandleonOpenReview}>
                  <FormattedMessage id="product.leave-review" />
                </ReviewButton>
              </Grid>
            </InfoContainer>
          </ProductContainer>
          <ProductContainer container ref={productContainerRef}>
            <Grid item md={8}>
            {showReview ? (
                <LeaveReview
                  productTitle={productSelected.title}
                  rating={productSelected.rating}
                  onReview={onReview}
                />
            ) : null}
              <ListReview data={productSelected.rating.review} />
            </Grid>
          </ProductContainer>
        </>
      )}
    </Layout>
  );
}

export default SingleProduct;
