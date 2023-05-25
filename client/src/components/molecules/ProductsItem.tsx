import React from "react";
import { Grid } from "@mui/material";
import styled from "styled-components";
import { IProduct } from "../../interfaces";
import { ButtonComponent, Rating } from "../atoms";
import { useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";

interface ProductItemPropsInterface {
  data: IProduct;
}

const ProductItemComponent = styled(Grid)`
  padding: 15px;
  min-width: 250px;
  width: 100%;
  background: ${(props) => props.theme.colors.white};
  -webkit-box-shadow: 0px 1px 8px 0px rgba(0, 193, 196, 0.68);
  -moz-box-shadow: 0px 1px 8px 0px rgba(0, 193, 196, 0.68);
  box-shadow: 0px 1px 8px 0px rgba(0, 193, 196, 0.68);
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  max-height: 15rem;
  border-bottom": 
  border-radius: 5px;
`;

const Description = styled.p`
  margin-top: 10px;
  margin-bottom: 0;
  margin-left: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 0;
  color: ${(props) => props.theme.colors.darkGreen};
  font-size: 1rem;
  span {
    color: ${(props) => props.theme.colors.black};
  }
`;

const Title = styled(Description)`
  font-size: 1.3rem;
  font-weight: 600;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Price = styled.p`
  font-weight: 600;
  font-size: 1.1rem;
  color: ${(props) => props.theme.colors.darkGreen};
  margin: 0 ;
`;

const WrapperRating = styled.div`
  display: flex;
  width: 100%;
  margin-top: 0.5rem;
  align-items: center;
  justify-content: space-between;
`

function ProductItem({ data }: ProductItemPropsInterface) {
  const navigate = useNavigate();
  const handleOnClick = () => {
    navigate(`/products/${data.id}`);
  };
  return (
    <ProductItemComponent
      margin={2}
      item
      data-aos="fade-up"
      data-aos-once="true"
      display={"flex"}
      flexDirection={"column"}
      xs={3}
    >
      <ImageContainer>
        <img
          width={"100%"}
          src={data.image}
          srcSet={data.image}
          alt={data.title}
        />
      </ImageContainer>
      <Title>{data.title}</Title>
      <Description>{data.description}</Description>
      <WrapperRating>
        <Rating votes={data.rating.votes} rate={data.rating.value} blockRate />
        <Price>{data.price} Є</Price>
      </WrapperRating>
      <ButtonComponent
        onClick={handleOnClick}
        styles={{ marginTop: "1rem" }}
        typeButton="button"
      >
        <FormattedMessage id="primary.learn" />
      </ButtonComponent>
    </ProductItemComponent>
  );
}

export default ProductItem;
