import React from "react";
import { Grid } from "@mui/material";
import styled from "styled-components";
import { IProduct } from "../../interfaces";
import { ButtonComponent } from "../atoms";
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
  height: 15rem;
  border-bottom": 
  border-radius: 5px;
`;

const Paragraph = styled.p`
  margin-top: 10px;
  margin-bottom: 0;
  margin-left: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
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

const Title = styled(Paragraph)`
  font-size: 1.3rem;
  font-weight: 600;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

function ProductItem({ data }: ProductItemPropsInterface) {
  const navigate = useNavigate();
  const handleOnClick = () => {
    navigate(`/products/${data.id}`);
  };
  return (
    <ProductItemComponent
      margin={2}
      item
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
      <Paragraph>{data.description}</Paragraph>
      <ButtonComponent
        onClick={handleOnClick}
        styles={{ marginTop: "1.5rem" }}
        typeButton="button"
      >
        <FormattedMessage id="primary.learn" />
      </ButtonComponent>
    </ProductItemComponent>
  );
}

export default ProductItem;
